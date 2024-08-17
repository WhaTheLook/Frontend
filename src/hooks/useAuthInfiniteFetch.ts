import { MutableRefObject, useCallback, useEffect, useState } from "react";

import { CommonError } from "@/utils/CommonError";
import { getLocalStorageItem } from "@/utils";
import { ACCESS_TOKEN, FETCH_TIME } from "@/constants";

import { useReIssueToken } from "./useReIssueToken";
import { useLogout } from "./useLogout";

interface Props {
  url: string;
  lastPostId: MutableRefObject<number | null>;
  intersecting: boolean;
}

export function useAuthInfiniteFetch<T extends { id: number}>({ url, lastPostId, intersecting }: Props) {
  interface ResponseType {
    content: T[];
    last: boolean;
  }

  const [data, setData] = useState<T[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasNext, setHasNext] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const { reIssueTokenFetcher } = useReIssueToken();
  const { handleLogout } = useLogout();

  const controller = new AbortController();

  const fetcher = useCallback(async function () {
    try {
      const accessToken = getLocalStorageItem(ACCESS_TOKEN);

      const response = await fetch(url, { 
        method: "GET",
        headers: {
            Authorization: `Bearer ${accessToken}`        
        },
        signal: AbortSignal.timeout(FETCH_TIME)
     });

      if (!response.ok) {
        const { status } = response;
        throw new CommonError(status);
      }
      
      const { content, last } = (await response.json()) as ResponseType;
  
      const currentLastPostId = content[content.length - 1].id;
      last 
      ? setHasNext(false)
      : lastPostId.current = currentLastPostId;

      setData((prev) => !prev ? [...content] : [...prev, ...content]);
    } catch (error) {
      if (error instanceof CommonError) {
        const { statusCode } = error;
        switch (statusCode) {
            case 401:
                try {
                    // 토큰 만료된 경우 재발급 후 다시 API 요청
                    await reIssueTokenFetcher();
                    await fetcher();
                } catch(error) {
                    handleLogout("tokenExpired");
                    return;
                }
                break;
            default: 
                setError(error);
                break;
        }
      } else {
        setError(new Error(String(error)));
      }
    } finally{
      setIsLoading(false);
    }
  }, [lastPostId, url, reIssueTokenFetcher, handleLogout])

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