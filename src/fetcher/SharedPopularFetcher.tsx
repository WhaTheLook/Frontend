import { Fragment, ReactNode, useContext, useEffect, useRef } from "react";

import { PostContext } from "@/components/common/PostProvider";
import { GridListSkeleton } from "@/components/common/GridListSkeleton";

import { API_PATH, categoryOption, sortOption } from "@/constants";
import { PostListContentType } from "@/types";

import { useInfiniteScoll } from "@/hooks/useInfiniteScoll";
import { useInfiniteFetch } from "@/hooks/useInfiniteFetch";
import { useSelector } from "react-redux";
import {
  selectCurrentSignStatus,
  selectCurrentUser,
} from "@/store/slice/authSlice";

interface Props {
  children: ReactNode;
}

export function SharedPopularFetcher({ children }: Props) {
  const { handleSetData } = useContext(PostContext);
  const isSignIn = useSelector(selectCurrentSignStatus);
  const userInfo = useSelector(selectCurrentUser);

  const currentPage = useRef<number>(0);
  const fetchMoreElement = useRef<HTMLDivElement>(null);
  const intersecting = useInfiniteScoll(fetchMoreElement);

  const { data, isLoading, error } = useInfiniteFetch<PostListContentType>({
    url: API_PATH.postList({
      category: categoryOption.SHARE,
      sortBy: sortOption.POPULAR,
      page: currentPage.current,
      size: 10,
      userId: isSignIn ? userInfo?.kakaoId : undefined,
    }),
    currentPage,
    intersecting,
  });

  if (error) {
    throw error;
  }

  useEffect(() => {
    handleSetData(data);
  }, [data, handleSetData]);

  return (
    <Fragment>
      {isLoading && <GridListSkeleton count={6} />}
      {data.length >= 0 && (
        <Fragment>
          {children}
          {isLoading && <GridListSkeleton count={6} />}
        </Fragment>
      )}
      <div ref={fetchMoreElement}></div>
    </Fragment>
  );
}
