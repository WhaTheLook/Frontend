import { Fragment, ReactNode, useEffect, useRef } from "react";

import { GridListSkeleton } from "@/components/common/GridListSkeleton";
import { PostToastError } from "@/components/common/PostToastError";

import { GRIDITEM_SKELETON_COUNT } from "@/constants";

import { useInfiniteScoll } from "@/hooks/useInfiniteScoll";
import { useSearchContext } from "@/hooks/contexts/useSearchContext";
import { useInfiniteFetchError } from "@/hooks/useInfiniteFetchError";

import { useSearchQuery } from "@/quires/useSearchQuery";

interface Props {
  children: ReactNode;
}

export function SearchFetcher({ children }: Props) {
  const { handleSetData, query } = useSearchContext();

  const fetchMoreElement = useRef<HTMLDivElement>(null);

  const {
    result: { content, last, totalCount },
    isLoading,
    isError,
    error,
    isFetchingNextPage,
    isFetchNextPageError,
    fetchNextPage,
  } = useSearchQuery(query);

  const { shouldHandleError, resetHandleError } = useInfiniteFetchError({
    isFetchingNextPage,
    isFetchNextPageError,
  });
  const intersecting = useInfiniteScoll(fetchMoreElement, !shouldHandleError);

  if (isError && !isFetchNextPageError) {
    throw error;
  }

  useEffect(() => {
    handleSetData(content, totalCount);
  }, [content, totalCount, handleSetData]);

  useEffect(() => {
    if (intersecting && !last) {
      fetchNextPage();
    }
  }, [intersecting, fetchNextPage, last]);

  return (
    <Fragment>
      {isLoading && <GridListSkeleton count={GRIDITEM_SKELETON_COUNT} />}
      {content && children}
      {isFetchingNextPage && (
        <GridListSkeleton count={GRIDITEM_SKELETON_COUNT} />
      )}
      <div ref={fetchMoreElement}></div>
      {shouldHandleError && <PostToastError onClick={resetHandleError} />}
    </Fragment>
  );
}
