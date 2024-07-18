import { useEffect, useState, Fragment } from "react";

import { FlatList } from "@/components/common/FlatList";

import { PostListType } from "@/types";

import mock from "@/mock";

interface Props {
  sortType: number;
}

export function QnaPosts({ sortType }: Props) {
  const [data, setData] = useState<PostListType[]>([]);

  useEffect(() => {
    // Todo: sortType에 따른 fetch 요청 구분
    if (sortType === 0) {
      setData(mock.HomeQNALatestData);
    }
    if (sortType === 1) {
      setData(mock.HomeQNAPopularData);
    }
  }, [sortType]);

  return (
    <Fragment>
      <FlatList data={data} />
    </Fragment>
  );
}
