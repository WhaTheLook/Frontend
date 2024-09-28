import { Fragment, ReactNode, useEffect, useRef } from "react";

import { FlatListSkeleton } from "@/components/common/FlatListSkeleton";
import { Divider } from "@/components/common/Divider";
import { PostToastError } from "@/components/common/PostToastError";

import { FLATITEM_SKELETON_COUNT } from "@/constants";

import { usePostsContext } from "@/hooks/contexts/usePostsContext";
import { useInfiniteScoll } from "@/hooks/useInfiniteScoll";
import { useInfiniteFetchError } from "@/hooks/useInfiniteFetchError";

import { useQnaPopularQuery } from "@/quires/useQnaPopularQuery";

interface Props {
  children: ReactNode;
}

export function QnaPopularFetcher({ children }: Props) {
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
  } = useQnaPopularQuery();

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
      {isLoading && <FlatListSkeleton count={FLATITEM_SKELETON_COUNT} />}
      {content && children}
      {isFetchingNextPage && (
        <Fragment>
          <Divider />
          <FlatListSkeleton count={FLATITEM_SKELETON_COUNT} />
        </Fragment>
      )}
      <div ref={fetchMoreElement}></div>
      {shouldHandleError && (
        <Fragment>
          <Divider />
          <PostToastError onClick={resetHandleError} />
        </Fragment>
      )}
    </Fragment>
  );
}
