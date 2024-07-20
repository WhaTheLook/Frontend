import { useEffect, useState, Fragment } from "react";

import { GridList } from "@/components/common/GridList";

import { PostListType } from "@/types";

import mock from "@/mock";

interface Props {
  sortType: number;
}

export function SharedPosts({ sortType }: Props) {
  const [data, setData] = useState<PostListType[]>([]);

  useEffect(() => {
    // Todo: sortType에 따른 fetch 요청 구분
    if (sortType === 0) {
      setData(mock.HomeShareLatestData);
    }
    if (sortType === 1) {
      setData(mock.HomeSharePopularData);
    }
  }, [sortType]);

  return (
    <Fragment>
      <GridList data={data} />
    </Fragment>
  );
}
