import { Fragment, ReactNode, useEffect, useRef } from "react";

import { GridListSkeleton } from "@/components/common/GridListSkeleton";

import {
  API_PATH,
  GRIDITEM_SKELETON_COUNT,
  MAX_FETCH_SIZE_GRID,
  sortOption,
} from "@/constants";

import { useInfiniteScoll } from "@/hooks/useInfiniteScoll";
import { useSearchContext } from "@/hooks/useSearchContext";
import { useInfiniteSearchFetchQuery } from "@/hooks/query/useInfiniteSearchFetchQuery";

interface Props {
  children: ReactNode;
}

export function SearchFetcher({ children }: Props) {
  const { handleSetData, query } = useSearchContext();

  const fetchMoreElement = useRef<HTMLDivElement>(null);
  const intersecting = useInfiniteScoll(fetchMoreElement, true);

  const { result, isLoading, isError, error, isFetchingNextPage } =
    useInfiniteSearchFetchQuery({
      rowsPerPage: MAX_FETCH_SIZE_GRID,
      queryKey: ["search", query],
      getUrl: (page) =>
        API_PATH.searchPosts({
          searchQuery: query,
          sortBy: sortOption.LATEST,
          size: MAX_FETCH_SIZE_GRID,
          lastPostId: page,
        }),
      intersecting,
    });

  if (isError) {
    throw error;
  }

  const { posts, totalCount } = result;

  useEffect(() => {
    handleSetData(posts, totalCount);
  }, [posts, totalCount, handleSetData]);

  return (
    <Fragment>
      {!posts && isLoading && (
        <GridListSkeleton count={GRIDITEM_SKELETON_COUNT} />
      )}
      {posts && children}
      {isFetchingNextPage ? (
        <GridListSkeleton count={GRIDITEM_SKELETON_COUNT} />
      ) : (
        <div ref={fetchMoreElement}></div>
      )}
    </Fragment>
  );
}
