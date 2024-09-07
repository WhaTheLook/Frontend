import { Fragment, useRef } from "react";
import { useSelector } from "react-redux";

import { GridListSkeleton } from "@/components/common/GridListSkeleton";
import { NothingInfo } from "@/components/common/NothingInfo";
import { GridList } from "@/components/common/GridList";

import {
  API_PATH,
  GRIDITEM_SKELETON_COUNT,
  MAX_FETCH_SIZE_GRID,
  sortOption,
} from "@/constants";
import { UserInfoType } from "@/types";

import { useInfiniteScoll } from "@/hooks/useInfiniteScoll";
import { useAuthInfiniteFetchQuery } from "@/hooks/query/useAuthInfiniteFetchQuery";

import { selectCurrentUser } from "@/store/slice/authSlice";

export function BookmarkList() {
  const user = useSelector(selectCurrentUser) as UserInfoType;

  const fetchMoreElement = useRef<HTMLDivElement>(null);
  const intersecting = useInfiniteScoll(fetchMoreElement, true);

  const { result, isLoading, isError, error, isFetchingNextPage } =
    useAuthInfiniteFetchQuery({
      rowsPerPage: MAX_FETCH_SIZE_GRID,
      queryKey: ["bookmark"],
      getUrl: (page) =>
        API_PATH.bookmarkList({
          userId: user.kakaoId,
          sortBy: sortOption.LATEST,
          size: MAX_FETCH_SIZE_GRID,
          lastPostId: page,
        }),
      intersecting,
    });

  if (isError) {
    throw error;
  }

  return (
    <Fragment>
      {!result && isLoading && (
        <GridListSkeleton count={GRIDITEM_SKELETON_COUNT} />
      )}
      {result && (
        <Fragment>
          {result.length === 0 ? (
            <NothingInfo contentType="bookmark" />
          ) : (
            <GridList data={result} />
          )}
        </Fragment>
      )}
      {isFetchingNextPage ? (
        <GridListSkeleton count={GRIDITEM_SKELETON_COUNT} />
      ) : (
        <div ref={fetchMoreElement}></div>
      )}
    </Fragment>
  );
}
