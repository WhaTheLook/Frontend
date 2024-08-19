import { useEffect, useState } from "react";

import { CommonError } from "@/utils/CommonError";

interface Props {
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  body?: XMLHttpRequestBodyInit;
}

export function useFetch<T>({ url, method, body }: Props) {
  const [data, setData] = useState<T>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  useEffect(() => {
    const abortController = new AbortController();

    async function fetcher() {
      try {
        setIsLoading(true);

        const response = await fetch(url, {
          method,
          body,
          signal: abortController.signal,
        });

        if (!response.ok) {
          const { status } = response;
          throw new CommonError(status);
        }

        const result = await response.json();
        setData(result);
      } catch (error) {
        if (error instanceof CommonError) {
          setError(error);
          return;
        }
        setError(new Error());
      } finally {
        setIsLoading(false);
      }
    }

    fetcher();

    return () => {
      abortController.abort();
    };
  }, [url, body, method]);

  return { data, isLoading, error };
}
