import { useMemo } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";

import { ACCESS_TOKEN } from "@/constants";
import { getLocalStorageItem } from "@/utils";
import { CommonError } from "@/utils/CommonError";
import { ListFetchType } from "@/types";

import { useReIssueToken } from "../useReIssueToken";
import { useLogout } from "../useLogout";

interface Props {
  queryKey: string[];
  getUrl: (page: number | undefined) => string;
  shouldTokenCheck: boolean;
}

export function useAuthInfiniteFetchQuery<T extends { id: number }>({ getUrl, queryKey, shouldTokenCheck }: Props) {
  const { reIssueTokenFetcher } = useReIssueToken();
  const { handleLogout } = useLogout();

  const authQueryFn = async (pageParam: unknown) => {
    try {
      const accessToken = getLocalStorageItem(ACCESS_TOKEN);
      const url = getUrl(Number(pageParam) || undefined);
      
      const headers = {} as { Authorization?: string };

      if (shouldTokenCheck) {
        headers.Authorization = `Bearer ${accessToken}`;
      } else if (accessToken) {
        headers.Authorization = `Bearer ${accessToken}`;
      }

      const response = await fetch(url, { 
        method: "GET",
        headers,
      });

      if (!response.ok) {
        const { status } = response;
        throw new CommonError(status);
      }
    
      const result = await response.json();

      return result;
    } catch(error) {
      if (error instanceof CommonError) {
        const { statusCode } = error;
        switch (statusCode) {
          case 401:
              try {
                // 토큰 만료된 경우 재발급 후 다시 API 요청
                await reIssueTokenFetcher();
                return await authQueryFn(pageParam);
              } catch(error) {
                handleLogout("tokenExpired");
                return;
              }
          default: 
            throw error;
        }
      } else {
        throw new Error(String(error));
      }
    }
  }

  const { data, isLoading, isError, error, isFetchingNextPage, fetchNextPage, isFetchNextPageError } =
    useInfiniteQuery<ListFetchType<T>>({
      queryKey,
      queryFn: ({ pageParam }) => authQueryFn(pageParam),
      getNextPageParam: (lastPage) => {
        const { content, last } = lastPage;
        const lastPostId = content[content.length - 1]?.id;

        return last ? undefined : lastPostId;
      },
      initialPageParam: undefined,
      retry: false,
      refetchOnWindowFocus: false,
    });

  const result = useMemo(() => {
    return { 
      content: data?.pages.flatMap((page) => page.content) || null,
      last: data?.pages[data.pages.length - 1].last
    };
  }, [data]);

  return {
    result,
    isLoading,
    isFetchingNextPage,
    isFetchNextPageError,
    error,
    isError,
    fetchNextPage
  };
}
