import { MutableRefObject, useCallback, useEffect, useState } from "react";

import { CommonError } from "@/utils/CommonError";

interface Props {
  url: string;
  lastPostId: MutableRefObject<number | null>;
  intersecting: boolean;
}


export function useInfiniteFetch<T extends { id: number}>({ url, lastPostId, intersecting }: Props) {
  interface ResponseType {
    content: T[];
    last: boolean;
  }

  const [data, setData] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasNext, setHasNext] = useState(true);
  const [error, setError] = useState<Error | null>(null)

  const controller = new AbortController();
  const signal = controller.signal;

  const fetcher = useCallback(async function () {
    try {
      const response = await fetch(url, { signal });

      if (!response.ok) {
        const { status } = response;
        throw new CommonError(status);
      }
      
      const { content, last } = (await response.json()) as ResponseType;
  
      const currentLastPostId = content[content.length - 1].id;
      last 
      ? setHasNext(false)
      : lastPostId.current = currentLastPostId;

      setIsLoading(false);
      setData((prev) => [...prev, ...content]);
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
    fetcher();

    return () => controller.abort();
  }, []);

  return { data, isLoading, error };
}