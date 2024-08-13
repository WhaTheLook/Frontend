import { Fragment, ReactNode, useContext, useEffect, useRef } from "react";

import { GridListSkeleton } from "@/components/common/GridListSkeleton";
import { PostContext } from "@/components/common/PostProvider";

import { API_PATH, categoryOption, sortOption } from "@/constants";
import { PostListContentType } from "@/types";

import { useInfiniteScoll } from "@/hooks/useInfiniteScoll";
import { useInfiniteFetch } from "@/hooks/useInfiniteFetch";

interface Props {
  children: ReactNode;
}

export function SharedLatestFetcher({ children }: Props) {
  const { handleSetData } = useContext(PostContext);

  const lastPostIdRef = useRef<number | null>(null);
  const fetchMoreElement = useRef<HTMLDivElement>(null);
  const intersecting = useInfiniteScoll(fetchMoreElement);

  const { data, isLoading, error } = useInfiniteFetch<PostListContentType>({
    url: API_PATH.postList({
      category: categoryOption.SHARE,
      sortBy: sortOption.LATEST,
      size: 10,
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
