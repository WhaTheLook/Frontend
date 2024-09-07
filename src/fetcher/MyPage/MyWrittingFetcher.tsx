import { Fragment, ReactNode, useEffect, useRef, useState } from "react";
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
import { useAuthInfiniteFetchQuery } from "@/hooks/query/useAuthInfiniteFetchQuery";

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

  const fetchMoreElement = useRef<HTMLDivElement>(null);
  const intersecting = useInfiniteScoll(fetchMoreElement, !shouldHandleError);

  const { result, isLoading, isError, error, isFetchingNextPage } =
    useAuthInfiniteFetchQuery({
      rowsPerPage: MAX_FETCH_SIZE_FLAT,
      queryKey: ["myPost"],
      intersecting,
      getUrl: (page) =>
        API_PATH.userPostList({
          userId: user?.kakaoId,
          sortBy: sortOption.LATEST,
          size: MAX_FETCH_SIZE_FLAT,
          lastPostId: page,
        }),
    });

  if (isError) {
    throw error;
  }

  const isFirstFetchLoading = !result && isLoading;
  const hasData = result && result.length >= 0;
  const isFetchingAndNoError = isFetchingNextPage && !shouldHandleError;

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
    if (!result) return;

    dispatch(setPostData({ data: result }));
    setShouldThrowError(false);
  }, [result, dispatch]);

  return (
    <Fragment>
      {isFirstFetchLoading && (
        <FlatListSkeleton count={FLATITEM_SKELETON_COUNT} />
      )}
      {hasData && children}
      {isFetchingAndNoError ? (
        <Fragment>
          <Divider />
          <FlatListSkeleton count={FLATITEM_SKELETON_COUNT} />
        </Fragment>
      ) : (
        <div ref={fetchMoreElement}></div>
      )}
      {shouldHandleError && (
        <Fragment>
          <Divider />
          <PostToastError onClick={handleRetryClick} />
        </Fragment>
      )}
    </Fragment>
  );
}
