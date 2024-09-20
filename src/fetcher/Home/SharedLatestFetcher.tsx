import { Fragment, ReactNode, useContext, useEffect, useRef } from "react";

import { GridListSkeleton } from "@/components/common/GridListSkeleton";
import { PostContext } from "@/components/common/PostProvider";
import { PostToastError } from "@/components/common/PostToastError";

import { GRIDITEM_SKELETON_COUNT } from "@/constants";

import { useInfiniteScoll } from "@/hooks/useInfiniteScoll";
import { useInfiniteFetchError } from "@/hooks/useInfiniteFetchError";

import { useSharedLatestQuery } from "@/quires/useSharedLatestQuery";

interface Props {
  children: ReactNode;
}

export function SharedLatestFetcher({ children }: Props) {
  const { handleSetData } = useContext(PostContext);

  const fetchMoreElement = useRef<HTMLDivElement>(null);

  const {
    result: { content, last },
    isLoading,
    isFetchingNextPage,
    isFetchNextPageError,
    isError,
    error,
    fetchNextPage,
  } = useSharedLatestQuery();

  const { shouldHandleError, resetHandleError } = useInfiniteFetchError({
    isFetchingNextPage,
    isFetchNextPageError,
  });
  const intersecting = useInfiniteScoll(fetchMoreElement, !shouldHandleError);

  if (isError && !isFetchNextPageError) {
    throw error;
  }

  useEffect(() => {
    handleSetData(null);
  }, [handleSetData]);

  useEffect(() => {
    if (!content) return;
    handleSetData(content);
  }, [content, handleSetData]);

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
