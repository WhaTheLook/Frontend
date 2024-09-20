import { Fragment, ReactNode, useContext, useEffect, useRef } from "react";

import { PostContext } from "@/components/common/PostProvider";
import { FlatListSkeleton } from "@/components/common/FlatListSkeleton";
import { Divider } from "@/components/common/Divider";
import { PostToastError } from "@/components/common/PostToastError";

import { FLATITEM_SKELETON_COUNT } from "@/constants";

import { useInfiniteScoll } from "@/hooks/useInfiniteScoll";
import { useInfiniteFetchError } from "@/hooks/useInfiniteFetchError";

import { useQnaLatestQuery } from "@/quires/useQnaLatestQuery";

interface Props {
  children: ReactNode;
}

export function QnaLatestFetcher({ children }: Props) {
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
  } = useQnaLatestQuery();

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
