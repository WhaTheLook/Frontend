import { useEffect, useState } from "react";

import { GridList } from "@/components/common/GridList";
import { NothingInfo } from "@/components/common/NothingInfo";
import { ScrollButton } from "@/components/common/ScrollButton";

import { PostListType } from "@/types";

import * as S from "./style";

export function Bookmark() {
  const [data, setData] = useState<PostListType[]>([]);

  useEffect(() => {
    // Todo: 북마크 데이터 요청
    setData([]);
  }, []);

  return (
    <S.Container>
      <S.Title>북마크</S.Title>
      {data.length === 0 ? (
        <NothingInfo contentType="bookmark" />
      ) : (
        <GridList data={data} />
      )}
      <ScrollButton />
    </S.Container>
  );
}
