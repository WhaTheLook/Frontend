import { useMemo } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";

import { SearchListFetchType } from "@/types";
import { CommonError } from "@/utils/CommonError";

interface Props {
  queryKey: string[];
  getUrl: (page: number | undefined) => string;
}

export function useInfiniteSearchFetchQuery({ getUrl, queryKey }: Props) {
  const queryFn = async (pageParam: unknown) => {
    try {
      const url = getUrl(Number(pageParam) || undefined);

      const response = await fetch(url, { 
        method: "GET",
      });

      if (!response.ok) {
        const { status } = response;
        throw new CommonError(status);
      }
    
      const result = await response.json();

      return result;
    } catch(error) {
      if (error instanceof CommonError) {
        throw error;
      } else {
        throw new Error(String(error));
      }
    }
  }

  const { data, isLoading, error, isFetchingNextPage, isError, fetchNextPage, isFetchNextPageError } =
    useInfiniteQuery<SearchListFetchType>({
      queryKey,
      queryFn: ({ pageParam }) => queryFn(pageParam),
      getNextPageParam: (lastPage) => {
        const { posts: { content, last } } = lastPage;
        const lastPostId = content[content.length - 1]?.id;
        
        return last ? undefined : lastPostId;
      },
      initialPageParam: undefined,
      retry: false,
      refetchOnWindowFocus: false,
    });

  const result = useMemo(() => {
    const posts = data?.pages.flatMap((page) => page.posts.content) || null;
    const totalCount = data?.pages[0].total || 0;
    return { posts, totalCount };
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
