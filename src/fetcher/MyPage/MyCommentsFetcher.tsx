import { Fragment, ReactNode, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { FlatListSkeleton } from "@/components/common/FlatListSkeleton";
import { PostToastError } from "@/components/common/PostToastError";
import { Divider } from "@/components/common/Divider";

import { FLATITEM_SKELETON_COUNT } from "@/constants";

import { useInfiniteScoll } from "@/hooks/useInfiniteScoll";
import { useInfiniteFetchError } from "@/hooks/useInfiniteFetchError";

import {
  MyPageUserInfoType,
  selectUserInfo,
  setCommentData,
} from "@/store/slice/myPageSlice";

import { useMyCommentsQuery } from "@/quires/useMyCommentsQuery";

interface Props {
  children: ReactNode;
}

export function MyCommentsFetcher({ children }: Props) {
  const dispatch = useDispatch();

  const user = useSelector(selectUserInfo) as MyPageUserInfoType;

  const fetchMoreElement = useRef<HTMLDivElement>(null);

  const {
    result: { content, last },
    isLoading,
    isFetchingNextPage,
    isFetchNextPageError,
    isError,
    error,
    fetchNextPage,
  } = useMyCommentsQuery(user?.kakaoId);

  const { shouldHandleError, resetHandleError } = useInfiniteFetchError({
    isFetchingNextPage,
    isFetchNextPageError,
  });
  const intersecting = useInfiniteScoll(fetchMoreElement, !shouldHandleError);

  if (isError && !isFetchNextPageError) {
    throw error;
  }

  useEffect(() => {
    if (!content) return;
    dispatch(setCommentData({ data: content }));
  }, [content, dispatch]);

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
