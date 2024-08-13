import { Fragment, ReactNode, useContext, useEffect, useRef } from "react";

import { PostContext } from "@/components/common/PostProvider";
import { FlatListSkeleton } from "@/components/common/FlatListSkeleton";
import { Divider } from "@/components/common/Divider";

import {
  API_PATH,
  categoryOption,
  FLATITEM_SKELETON_COUNT,
  MAX_FETCH_LEGNTH,
  sortOption,
} from "@/constants";
import { PostListContentType } from "@/types";

import { useInfiniteScoll } from "@/hooks/useInfiniteScoll";
import { useInfiniteFetch } from "@/hooks/useInfiniteFetch";

interface Props {
  children: ReactNode;
}

export function QnaPopularFetcher({ children }: Props) {
  const { handleSetData } = useContext(PostContext);

  const lastPostIdRef = useRef<number | null>(null);
  const fetchMoreElement = useRef<HTMLDivElement>(null);
  const intersecting = useInfiniteScoll(fetchMoreElement);

  const { data, isLoading, error } = useInfiniteFetch<PostListContentType>({
    url: API_PATH.postList({
      category: categoryOption.QNA,
      sortBy: sortOption.POPULAR,
      size: MAX_FETCH_LEGNTH,
      lastPostId: lastPostIdRef.current || undefined,
    }),
    lastPostId: lastPostIdRef,
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
      {isLoading && <FlatListSkeleton count={FLATITEM_SKELETON_COUNT} />}
      {data.length >= 0 && (
        <Fragment>
          {children}
          {isLoading && (
            <Fragment>
              <Divider />
              <FlatListSkeleton count={FLATITEM_SKELETON_COUNT} />
            </Fragment>
          )}
        </Fragment>
      )}
      <div ref={fetchMoreElement}></div>
    </Fragment>
  );
}
