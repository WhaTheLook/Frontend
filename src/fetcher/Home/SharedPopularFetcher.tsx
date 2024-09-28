import { Fragment, ReactNode, useEffect, useRef } from "react";

import { GridListSkeleton } from "@/components/common/GridListSkeleton";
import { PostToastError } from "@/components/common/PostToastError";

import { GRIDITEM_SKELETON_COUNT } from "@/constants";

import { usePostsContext } from "@/hooks/contexts/usePostsContext";
import { useInfiniteScoll } from "@/hooks/useInfiniteScoll";
import { useInfiniteFetchError } from "@/hooks/useInfiniteFetchError";

import { useSharedPopularQuery } from "@/quires/useSharedPopular";

interface Props {
  children: ReactNode;
}

export function SharedPopularFetcher({ children }: Props) {
  const { handleSetPosts } = usePostsContext();
  const fetchMoreElement = useRef<HTMLDivElement>(null);

  const {
    result: { content, last },
    isLoading,
    isFetchingNextPage,
    isFetchNextPageError,
    isError,
    error,
    fetchNextPage,
  } = useSharedPopularQuery();

  const { shouldHandleError, resetHandleError } = useInfiniteFetchError({
    isFetchingNextPage,
    isFetchNextPageError,
  });
  const intersecting = useInfiniteScoll(fetchMoreElement, !shouldHandleError);

  if (isError && !isFetchNextPageError) {
    throw error;
  }

  useEffect(() => {
    handleSetPosts(null);
  }, [handleSetPosts]);

  useEffect(() => {
    if (!content) return;
    handleSetPosts(content);
  }, [content, handleSetPosts]);

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
