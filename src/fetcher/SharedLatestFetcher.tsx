import { Fragment, ReactNode, useContext, useEffect, useRef } from "react";

import { PostContext } from "@/components/common/PostProvider";

import { API_PATH, menuOption, sortOption } from "@/constants";

import { useInfiniteScoll } from "@/hooks/useInfiniteScoll";
import { useInfiniteFetch } from "@/hooks/useInfiniteFetch";
import { GridListSkeleton } from "@/components/common/GridListSkeleton";

interface Props {
  children: ReactNode;
}

export function SharedLatestFetcher({ children }: Props) {
  const { handleSetData } = useContext(PostContext);

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

  useEffect(() => {
    handleSetData(data);
  }, [data, handleSetData]);

  return (
    <Fragment>
      {data.length === 0 && isLoading && <GridListSkeleton count={6} />}
      {data.length > 0 && (
        <Fragment>
          {children}
          {isLoading && <GridListSkeleton count={6} />}
        </Fragment>
      )}
      <div ref={fetchMoreElement}></div>
    </Fragment>
  );
}
