import { useMemo } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";

import { ListFetchType } from "@/types";

import { CommonError } from "@/utils/CommonError";


interface Props {
  queryKey: string[];
  getUrl: (page: number | undefined) => string;
}

export function useInfiniteFetchQuery<T extends { id: number }>({ getUrl, queryKey }: Props) {
  const queryFn = async (pageParam: unknown) => {
    try {
      const url = getUrl(Number(pageParam) || undefined);

      const response = await fetch(url, { 
        method: "GET"
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

  const { data, isLoading, isError, error, isFetchingNextPage, fetchNextPage, isFetchNextPageError } =
    useInfiniteQuery<ListFetchType<T>>({
      queryKey,
      queryFn: ({ pageParam }) => queryFn(pageParam),
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
