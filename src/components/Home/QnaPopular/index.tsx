import { Fragment, useRef } from "react";

import { Divider } from "@/components/common/Divider";
import { FlatList } from "@/components/common/FlatList";
import { FlatListSkeleton } from "@/components/common/FlatListSkeleton";

import {
  API_PATH,
  FLATITEM_SKELETON_COUNT,
  MAX_FETCH_LEGNTH,
  menuOption,
  sortOption,
} from "@/constants";

import { useInfiniteFetch } from "@/hooks/useInfiniteFetch";
import { useInfiniteScoll } from "@/hooks/useInfiniteScoll";

export function QnaPopular() {
  const currentPage = useRef<number>(0);
  const fetchMoreElement = useRef<HTMLDivElement>(null);

  const intersecting = useInfiniteScoll(fetchMoreElement);
  const { data, isLoading } = useInfiniteFetch({
    url: API_PATH.postList({
      menu: menuOption.QNA,
      sortBy: sortOption.POPULAR,
      page: currentPage.current,
      size: MAX_FETCH_LEGNTH,
    }),
    currentPage,
    intersecting,
  });

  return (
    <Fragment>
      {data && data.length === 0 ? (
        isLoading ? (
          <FlatListSkeleton count={FLATITEM_SKELETON_COUNT} />
        ) : null
      ) : (
        <Fragment>
          <FlatList data={data} />
          {isLoading && <Divider />}
          {isLoading && <FlatListSkeleton count={FLATITEM_SKELETON_COUNT} />}
        </Fragment>
      )}
      <div ref={fetchMoreElement}></div>
    </Fragment>
  );
}
