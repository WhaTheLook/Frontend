import { Fragment, ReactNode, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { FlatListSkeleton } from "@/components/common/FlatListSkeleton";
import { PostToastError } from "@/components/common/PostToastError";
import { Divider } from "@/components/common/Divider";

import {
  API_PATH,
  FLATITEM_SKELETON_COUNT,
  MAX_FETCH_SIZE_FLAT,
  sortOption,
} from "@/constants";

import { useInfiniteScoll } from "@/hooks/useInfiniteScoll";
import { useInfiniteFetchError } from "@/hooks/useInfiniteFetchError";
import { useAuthInfiniteFetchQuery } from "@/hooks/query/useAuthInfiniteFetchQuery";

import {
  MyPageUserInfoType,
  selectUserInfo,
  setPostData,
} from "@/store/slice/myPageSlice";

interface Props {
  children: ReactNode;
}

export function MyPostsFetcher({ children }: Props) {
  const dispatch = useDispatch();

  const user = useSelector(selectUserInfo) as MyPageUserInfoType;

  const fetchMoreElement = useRef<HTMLDivElement>(null);

  const {
    result,
    isLoading,
    isFetchingNextPage,
    isFetchNextPageError,
    isError,
    error,
    fetchNextPage,
  } = useAuthInfiniteFetchQuery({
    queryKey: ["myPost"],
    getUrl: (page) =>
      API_PATH.userPostList({
        userId: user?.kakaoId,
        sortBy: sortOption.LATEST,
        size: MAX_FETCH_SIZE_FLAT,
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

  useEffect(() => {
    if (!result) return;

    dispatch(setPostData({ data: result }));
  }, [result, dispatch]);

  useEffect(() => {
    if (intersecting) {
      fetchNextPage();
    }
  }, [intersecting, fetchNextPage]);

  return (
    <Fragment>
      {isLoading && <FlatListSkeleton count={FLATITEM_SKELETON_COUNT} />}
      {result && children}
      {isFetchingNextPage && (
        <Fragment>
          <Divider />
          <FlatListSkeleton count={FLATITEM_SKELETON_COUNT} />
        </Fragment>
      )}
      {!isFetchingNextPage && !shouldHandleError && (
        <div ref={fetchMoreElement}></div>
      )}
      {shouldHandleError && (
        <Fragment>
          <Divider />
          <PostToastError onClick={resetHandleError} />
        </Fragment>
      )}
    </Fragment>
  );
}
