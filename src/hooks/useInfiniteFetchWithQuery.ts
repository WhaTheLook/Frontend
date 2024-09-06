import { MutableRefObject, useCallback, useEffect, useMemo, useState } from "react";

import { CommonError } from "@/utils/CommonError";

interface Props {
  url: string;
  lastPostId: MutableRefObject<number | null>;
  intersecting: boolean;
  query: string;
}

export function useInfiniteFetchWithQuery<T extends { id: number}>({
   url, lastPostId, intersecting, query }: Props) {
  interface ResponseType {
    posts: { content: T[], last: boolean };
    total: number;
  }

  const [data, setData] = useState<T[] | null>(null);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [hasNext, setHasNext] = useState(true);
  const [error, setError] = useState<Error | null>(null)

  const controller = useMemo(() => new AbortController(), []);
  const signal = controller.signal;

  const fetcher = useCallback(async function () {
    try {
      const response = await fetch(url, { signal });

      if (!response.ok) {
        const { status } = response;
        throw new CommonError(status);
      }
      
      const { total, posts: { content, last } } = (await response.json()) as ResponseType;

      const currentLastPostId = content.length > 1 ? content[content.length - 1].id : null;
      last 
      ? setHasNext(false)
      : lastPostId.current = currentLastPostId;

      setIsLoading(false);
      setTotalCount(total);
      setData((prev) => !prev ? [...content] : [...prev, ...content]);
    } catch (error) {
      if (error instanceof CommonError) {
        setError(error);
        return;
      }
      setError(new Error());
    }
  }, [lastPostId, url, signal])

  useEffect(() => {
    if (intersecting && hasNext && !isLoading) {
      setIsLoading(true);
      fetcher();
    }
  }, [hasNext, intersecting, fetcher, isLoading]);

  useEffect(() => {
    setIsLoading(true);
    setHasNext(true);
    lastPostId.current = null;
    setData(null);
    fetcher();
  }, [query, url, lastPostId, fetcher]);

  useEffect(() => {
    return () => controller.abort();
  }, [controller])

  return { data, totalCount, isLoading, error };
}