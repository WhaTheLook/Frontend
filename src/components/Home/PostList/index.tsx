import { useEffect, useState, Fragment } from "react";

import { AskList } from "@/components/common/AskList";
import { SharedList } from "../SharedList";

import { PostListType } from "@/types";

import mock from "@/mock";

interface Props {
  menuType: number;
  sortType: number;
}

// menuType 0: 정보질문 1: 정보 공유
// sortType 0: 최신순 1: 인기순
export function PostList({ menuType, sortType }: Props) {
  const [data, setData] = useState<PostListType[]>([]);

  useEffect(() => {
    if (menuType === 0 && sortType === 0) {
      setData(mock.HomeQNALatestData);
      return;
    }
    if (menuType === 0 && sortType === 1) {
      setData(mock.HomeQNAPopularData);
      return;
    }
    if (menuType === 1 && sortType === 0) {
      setData(mock.HomeShareLatestData);
      return;
    }
    if (menuType === 1 && sortType === 1) {
      setData(mock.HomeSharePopularData);
      return;
    }
  }, [menuType, sortType]);

  return (
    <Fragment>
      {menuType === 0 ? <AskList data={data} /> : <SharedList data={data} />}
    </Fragment>
  );
}
