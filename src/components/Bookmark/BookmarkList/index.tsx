import { Fragment, useEffect, useRef } from "react";
import { useSelector } from "react-redux";

import { GridListSkeleton } from "@/components/common/GridListSkeleton";
import { NothingInfo } from "@/components/common/NothingInfo";
import { GridList } from "@/components/common/GridList";
import { PostToastError } from "@/components/common/PostToastError";

import { GRIDITEM_SKELETON_COUNT } from "@/constants";
import { UserInfoType } from "@/types";

import { useInfiniteScoll } from "@/hooks/useInfiniteScoll";
import { useInfiniteFetchError } from "@/hooks/useInfiniteFetchError";

import { selectCurrentUser } from "@/store/slice/authSlice";

import { useBookmarkQuery } from "@/quires/useBookmarkQuery";

export function BookmarkList() {
  const user = useSelector(selectCurrentUser) as UserInfoType;

  const fetchMoreElement = useRef<HTMLDivElement>(null);

  const {
    result,
    isLoading,
    isFetchingNextPage,
    isFetchNextPageError,
    isError,
    error,
    fetchNextPage,
  } = useBookmarkQuery(user?.kakaoId);

  const { shouldHandleError, resetHandleError } = useInfiniteFetchError({
    isFetchingNextPage,
    isFetchNextPageError,
  });
  const intersecting = useInfiniteScoll(fetchMoreElement, !shouldHandleError);

  if (isError && !isFetchNextPageError) {
    throw error;
  }

  useEffect(() => {
    if (intersecting) {
      fetchNextPage();
    }
  }, [intersecting, fetchNextPage]);

  return (
    <Fragment>
      {isLoading && <GridListSkeleton count={GRIDITEM_SKELETON_COUNT} />}
      {result && (
        <Fragment>
          {result.length === 0 ? (
            <NothingInfo contentType="bookmark" />
          ) : (
            <GridList data={result} />
          )}
        </Fragment>
      )}
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
