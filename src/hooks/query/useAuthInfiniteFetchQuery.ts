import { useMemo } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";

import { PostListFetchType } from "@/types";
import { ACCESS_TOKEN } from "@/constants";
import { getLocalStorageItem } from "@/utils";
import { CommonError } from "@/utils/CommonError";

import { useReIssueToken } from "../useReIssueToken";
import { useLogout } from "../useLogout";

interface Props {
  queryKey: string[];
  getUrl: (page: number | undefined) => string;
}

export function useAuthInfiniteFetchQuery({ getUrl, queryKey }: Props) {
  const { reIssueTokenFetcher } = useReIssueToken();
  const { handleLogout } = useLogout();

  const authQueryFn = async (pageParam: unknown) => {
    try {
      const accessToken = getLocalStorageItem(ACCESS_TOKEN);
      const url = getUrl(Number(pageParam) || undefined);

      const response = await fetch(url, { 
        method: "GET",
        headers: {
            Authorization: `Bearer ${accessToken}`        
        },
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
        throw error;
      }
    }
  }

  const { data, isLoading, isError, error, isFetchingNextPage, fetchNextPage, isFetchNextPageError } =
    useInfiniteQuery<PostListFetchType>({
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
    return data?.pages.flatMap((page) => page.content) || null;
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
