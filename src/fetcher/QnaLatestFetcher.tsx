import { Fragment, ReactNode, useContext, useEffect, useRef } from "react";

import { PostContext } from "@/components/common/PostProvider";
import { FlatListSkeleton } from "@/components/common/FlatListSkeleton";
import { Divider } from "@/components/common/Divider";

import {
  API_PATH,
  FLATITEM_SKELETON_COUNT,
  MAX_FETCH_LEGNTH,
  menuOption,
  sortOption,
} from "@/constants";

import { useInfiniteScoll } from "@/hooks/useInfiniteScoll";
import { useInfiniteFetch } from "@/hooks/useInfiniteFetch";

interface Props {
  children: ReactNode;
}

export function QnaLatestFetcher({ children }: Props) {
  const { handleSetData } = useContext(PostContext);

  const currentPage = useRef<number>(0);
  const fetchMoreElement = useRef<HTMLDivElement>(null);
  const intersecting = useInfiniteScoll(fetchMoreElement);

  const { data, isLoading } = useInfiniteFetch({
    url: API_PATH.postList({
      menu: menuOption.QNA,
      sortBy: sortOption.LATEST,
      page: currentPage.current,
      size: MAX_FETCH_LEGNTH,
    }),
    currentPage,
    intersecting,
  });

  useEffect(() => {
    handleSetData(data);
  }, [data, handleSetData]);

  return (
    <Fragment>
      {data.length === 0 && isLoading && (
        <FlatListSkeleton count={FLATITEM_SKELETON_COUNT} />
      )}
      {data.length > 0 && (
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
