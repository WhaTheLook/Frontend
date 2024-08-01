import { MutableRefObject, useCallback, useEffect, useState } from "react";

import { PostListType } from "@/types";
import { CommoneError } from "@/utils/CommonError";

interface Props {
  url: string;
  currentPage: MutableRefObject<number>;
  intersecting: boolean;
}

export function useInfiniteFetch({ url, currentPage, intersecting }: Props) {
  const [data, setData] = useState<PostListType[]>([]);
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
        throw new CommoneError(status);
      }
      
      const { content, nextPage } = await response.json();
  
      currentPage.current = nextPage;
      if (nextPage === null) {
        setHasNext(false);
      }
  
      setIsLoading(false);
      setData((prev) => [...prev, ...content]);
    } catch (error) {
      if (error instanceof CommoneError) {
        setError(error);
        return;
      }
      setError(new Error());
    }
  }, [currentPage, url, signal])

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