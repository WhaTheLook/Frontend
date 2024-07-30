import { Fragment, useRef } from "react";

import { GridList } from "@/components/common/GridList";
import { GridListSkeleton } from "@/components/common/GridListSkeleton";

import { API_PATH, menuOption, sortOption } from "@/constants";

import { useInfiniteFetch } from "@/hooks/useInfiniteFetch";
import { useInfiniteScoll } from "@/hooks/useInfiniteScoll";

export function SharedLatest() {
  const currentPage = useRef<number>(0);
  const fetchMoreElement = useRef<HTMLDivElement>(null);

  const intersecting = useInfiniteScoll(fetchMoreElement);
  const { data, isLoading } = useInfiniteFetch({
    url: API_PATH.postList({
      menu: menuOption.SHARE,
      sortBy: sortOption.LATEST,
      page: currentPage.current,
      size: 9,
    }),
    currentPage,
    intersecting,
  });

  return (
    <Fragment>
      {data && data.length === 0 ? (
        isLoading ? (
          <GridListSkeleton count={6} />
        ) : null
      ) : (
        <Fragment>
          <GridList data={data} />
          {isLoading && <GridListSkeleton count={6} />}
        </Fragment>
      )}
      <div ref={fetchMoreElement}></div>
    </Fragment>
  );
}
