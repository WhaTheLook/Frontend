import { useEffect, useState } from "react";

import { GridList } from "@/components/common/GridList";

import { PostListType } from "@/types";

import mock from "@/mock";

import * as S from "./style";

export function Bookmark() {
  const [data, setData] = useState<PostListType[]>([]);

  useEffect(() => {
    // Todo: 북마크 데이터 요청
    setData(mock.BookMarkData);
  }, []);

  return (
    <S.Container>
      <S.Title>북마크</S.Title>
      <GridList data={data} />
    </S.Container>
  );
}
