import { useEffect, useState } from "react";

import { CommonError } from "@/utils/CommonError";

interface Props {
  url: string;
  body?: XMLHttpRequestBodyInit;
}

export function useFetchSuspense<T>({ url, body }: Props) {
  const [data, setData] = useState<T>();
  const [error, setError] = useState<Error | null>(null);
  const [status, setStatus] = useState<"pending" | "fulfilled" | "error">("pending");
  const [promise, setPromise] = useState<Promise<void>>();

  const abortController = new AbortController();

  async function fetcher() {
    try {
      const response = await fetch(url, {
        method: "GET",
        body,
        signal: abortController.signal
      });

      if (!response.ok) {
        const { status } = response;
        throw new CommonError(status);
      }

      const result = await response.json();
      setData(result);
      setStatus("fulfilled");
    } catch (error) {
      setStatus("error");
      if (error instanceof CommonError) {
        setError(error);
        return;
      } 
      setError(new Error(String(error)));
    }
  }

  useEffect(() => {
    setStatus("pending");
    setPromise(fetcher());

    return () => {
      abortController.abort();
    }
  }, []);

  if (status === "pending" && promise) {
    throw promise;
  }

  return { data, error };
}
