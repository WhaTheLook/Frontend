import { Fragment, useRef } from "react";

import { FlatList } from "@/components/common/FlatList";

import { API_PATH, MAX_FETCH_LEGNTH, sortOption } from "@/constants";

import { useInfiniteScoll } from "@/hooks/useInfiniteScoll";
import { useInfiniteFetch } from "@/hooks/useInfiniteFetch";

interface Props {
  sortType: number;
}

export function QnaPosts({ sortType }: Props) {
  const currentPage = useRef<number>(0);
  const fetchMoreElement = useRef<HTMLDivElement>(null);

  const sortBy = sortType === 0 ? sortOption.LATEST : sortOption.POPULAR;
  const intersecting = useInfiniteScoll(fetchMoreElement);

  const data = useInfiniteFetch({
    url: API_PATH.postList({
      sortBy,
      page: currentPage.current,
      size: MAX_FETCH_LEGNTH,
    }),
    sortType,
    currentPage,
    intersecting,
  });

  return (
    <Fragment>
      <FlatList data={data} />
      <div ref={fetchMoreElement}></div>
    </Fragment>
  );
}
