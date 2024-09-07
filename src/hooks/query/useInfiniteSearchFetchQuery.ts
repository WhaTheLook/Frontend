import { useEffect, useMemo } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";

import { SearchListFetchType } from "@/types";
import { CommonError } from "@/utils/CommonError";

interface Props {
  rowsPerPage: number;
  queryKey: string[];
  getUrl: (page: number | undefined) => string;
  intersecting: boolean;
}

export function useInfiniteSearchFetchQuery({ rowsPerPage, getUrl, queryKey, intersecting }: Props) {
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

  const { data, isLoading, error, isFetchingNextPage, isError, fetchNextPage } =
    useInfiniteQuery<SearchListFetchType>({
      queryKey,
      queryFn: ({ pageParam }) => queryFn(pageParam),
      getNextPageParam: (lastPage) => {
        const { posts: { content } } = lastPage;
        const lastPostId = content[content.length - 1]?.id;
        
        return content.length === 0 || content.length < rowsPerPage
          ? undefined
          : lastPostId;
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

  useEffect(() => {
    if (intersecting) {
      fetchNextPage();
    }
  }, [intersecting, fetchNextPage])

  return {
    result,
    isLoading,
    isError,
    isFetchingNextPage,
    error,
  };
}
