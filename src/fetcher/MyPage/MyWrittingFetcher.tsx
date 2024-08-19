import { Fragment, ReactNode, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { FlatListSkeleton } from "@/components/common/FlatListSkeleton";
import { PostToastError } from "@/components/common/PostToastError";
import { Divider } from "@/components/common/Divider";

import { API_PATH, FLATITEM_SKELETON_COUNT, sortOption } from "@/constants";
import { PostListContentType } from "@/types";

import { useInfiniteScoll } from "@/hooks/useInfiniteScoll";
import { useAuthInfiniteFetch } from "@/hooks/useAuthInfiniteFetch";

import {
  MyPageUserInfoType,
  selectUserInfo,
  setPostData,
} from "@/store/slice/myPageSlice";

interface Props {
  children: ReactNode;
}

export function MyWrittingFetcher({ children }: Props) {
  const dispatch = useDispatch();

  const user = useSelector(selectUserInfo) as MyPageUserInfoType;
  const [shouldHandleError, setShouldHandleError] = useState(false);
  const [shouldThrowError, setShouldThrowError] = useState(true);

  const lastPostIdRef = useRef<number | null>(null);
  const fetchMoreElement = useRef<HTMLDivElement>(null);
  const intersecting = useInfiniteScoll(fetchMoreElement, !shouldHandleError);

  const { data, isLoading, error } = useAuthInfiniteFetch<PostListContentType>({
    url: API_PATH.userPostList({
      userId: user?.kakaoId,
      sortBy: sortOption.LATEST,
      size: 10,
      lastPostId: lastPostIdRef.current || undefined,
    }),
    lastPostId: lastPostIdRef,
    intersecting,
  });

  const isFirstFetchLoading = !data && isLoading;
  const hasData = data && data.length > 0;
  const isLoadingAndNoError = isLoading && !shouldHandleError;
  const hasNoError = !shouldHandleError;

  const handleRetryClick = () => {
    setShouldHandleError(false);
  };

  useEffect(() => {
    function handleDataFetchError(error: Error | null) {
      if (error) {
        if (shouldThrowError) {
          setShouldThrowError(false);
          throw error;
        } else {
          setShouldHandleError(true);
        }
      }
    }

    handleDataFetchError(error);
  }, [error, shouldThrowError]);

  useEffect(() => {
    if (!data) return;

    dispatch(setPostData({ data }));
    setShouldThrowError(false);
  }, [data, dispatch]);

  return (
    <Fragment>
      {isFirstFetchLoading && (
        <FlatListSkeleton count={FLATITEM_SKELETON_COUNT} />
      )}
      {hasData && (
        <Fragment>
          {children}
          {isLoadingAndNoError && (
            <Fragment>
              <Divider />
              <FlatListSkeleton count={FLATITEM_SKELETON_COUNT} />
            </Fragment>
          )}
        </Fragment>
      )}
      {hasNoError ? (
        <div ref={fetchMoreElement}></div>
      ) : (
        <Fragment>
          <Divider />
          <PostToastError onClick={handleRetryClick} />
        </Fragment>
      )}
    </Fragment>
  );
}
