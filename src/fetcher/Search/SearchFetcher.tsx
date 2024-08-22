import { Fragment, ReactNode, useEffect, useRef } from "react";

import { LoadingSpinner } from "@/components/common/LoadingSpinner";

import { API_PATH, MAX_FETCH_SIZE_GRID, sortOption } from "@/constants";
import { PostListContentType } from "@/types";

import { useInfiniteScoll } from "@/hooks/useInfiniteScoll";
import { useSearchContext } from "@/hooks/useSearchContext";
import { useInfiniteFetchWithQuery } from "@/hooks/useInfiniteFetchWithQuery";

interface Props {
  children: ReactNode;
}

export function SearchFetcher({ children }: Props) {
  const { handleSetData, query } = useSearchContext();

  const lastPostIdRef = useRef<number | null>(null);
  const fetchMoreElement = useRef<HTMLDivElement>(null);
  const intersecting = useInfiniteScoll(fetchMoreElement, true);

  const { data, isLoading, error } =
    useInfiniteFetchWithQuery<PostListContentType>({
      url: API_PATH.searchPosts({
        searchQuery: query,
        sortBy: sortOption.LATEST,
        size: MAX_FETCH_SIZE_GRID,
        lastPostId: lastPostIdRef.current || undefined,
      }),
      lastPostId: lastPostIdRef,
      intersecting,
      query,
    });

  if (error) {
    throw error;
  }

  useEffect(() => {
    handleSetData(null);
  }, [handleSetData]);

  useEffect(() => {
    if (data) {
      handleSetData(data);
    }
  }, [data, handleSetData]);

  return (
    <Fragment>
      {!data && isLoading && <LoadingSpinner color="#B2B2B2" />}
      {data && data.length >= 0 && (
        <Fragment>
          {children}
          {isLoading && <LoadingSpinner color="#B2B2B2" />}
        </Fragment>
      )}
      <div ref={fetchMoreElement}></div>
    </Fragment>
  );
}
