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
import { PostListContentType, UserInfoType } from "@/types";

import { useAuthInfiniteFetch } from "@/hooks/useAuthInfiniteFetch";
import { useInfiniteScoll } from "@/hooks/useInfiniteScoll";

import { selectCurrentUser } from "@/store/slice/authSlice";

export function BookmarkList() {
  const user = useSelector(selectCurrentUser) as UserInfoType;

  const lastPostIdRef = useRef<number | null>(null);
  const fetchMoreElement = useRef<HTMLDivElement>(null);
  const intersecting = useInfiniteScoll(fetchMoreElement, true);

  const { data, isLoading, error } = useAuthInfiniteFetch<PostListContentType>({
    url: API_PATH.bookmarkList({
      userId: user.kakaoId,
      sortBy: sortOption.LATEST,
      size: MAX_FETCH_SIZE_GRID,
      lastPostId: lastPostIdRef.current || undefined,
    }),
    lastPostId: lastPostIdRef,
    intersecting,
  });

  if (error) {
    throw error;
  }

  return (
    <Fragment>
      {!data && isLoading && (
        <GridListSkeleton count={GRIDITEM_SKELETON_COUNT} />
      )}
      {data && data.length >= 0 && (
        <Fragment>
          {data &&
            (data.length === 0 ? (
              <NothingInfo contentType="home" />
            ) : (
              <GridList data={data} />
            ))}
          {isLoading && <GridListSkeleton count={GRIDITEM_SKELETON_COUNT} />}
        </Fragment>
      )}
      <div ref={fetchMoreElement}></div>
    </Fragment>
  );
}
