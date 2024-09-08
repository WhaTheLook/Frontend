import { Fragment, ReactNode, useEffect, useRef } from "react";

import { GridListSkeleton } from "@/components/common/GridListSkeleton";
import { PostToastError } from "@/components/common/PostToastError";

import {
  API_PATH,
  GRIDITEM_SKELETON_COUNT,
  MAX_FETCH_SIZE_GRID,
  sortOption,
} from "@/constants";

import { useInfiniteScoll } from "@/hooks/useInfiniteScoll";
import { useSearchContext } from "@/hooks/useSearchContext";
import { useInfiniteSearchFetchQuery } from "@/hooks/query/useInfiniteSearchFetchQuery";
import { useInfiniteFetchError } from "@/hooks/useInfiniteFetchError";

interface Props {
  children: ReactNode;
}

export function SearchFetcher({ children }: Props) {
  const { handleSetData, query } = useSearchContext();

  const fetchMoreElement = useRef<HTMLDivElement>(null);

  const {
    result,
    isLoading,
    isError,
    error,
    isFetchingNextPage,
    isFetchNextPageError,
    fetchNextPage,
  } = useInfiniteSearchFetchQuery({
    queryKey: ["search", query],
    getUrl: (page) =>
      API_PATH.searchPosts({
        searchQuery: query,
        sortBy: sortOption.LATEST,
        size: MAX_FETCH_SIZE_GRID,
        lastPostId: page,
      }),
  });

  const { shouldHandleError, resetHandleError } = useInfiniteFetchError({
    isFetchingNextPage,
    isFetchNextPageError,
  });
  const intersecting = useInfiniteScoll(fetchMoreElement, !shouldHandleError);

  if (isError && !isFetchNextPageError) {
    throw error;
  }

  const { posts, totalCount } = result;

  useEffect(() => {
    handleSetData(posts, totalCount);
  }, [posts, totalCount, handleSetData]);

  useEffect(() => {
    if (intersecting) {
      fetchNextPage();
    }
  }, [intersecting, fetchNextPage]);

  return (
    <Fragment>
      {isLoading && <GridListSkeleton count={GRIDITEM_SKELETON_COUNT} />}
      {posts && children}
      {isFetchingNextPage && (
        <GridListSkeleton count={GRIDITEM_SKELETON_COUNT} />
      )}
      {!isFetchingNextPage && !shouldHandleError && (
        <div ref={fetchMoreElement}></div>
      )}
      {shouldHandleError && <PostToastError onClick={resetHandleError} />}
    </Fragment>
  );
}
