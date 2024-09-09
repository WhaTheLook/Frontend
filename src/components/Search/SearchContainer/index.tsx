import { Fragment } from "react";

import { GridList } from "@/components/common/GridList";
import { NothingInfo } from "@/components/common/NothingInfo";

import { useSearchContext } from "@/hooks/useSearchContext";

import * as S from "./style";

export function SearchContainer() {
  const { data, totalCount, query } = useSearchContext();

  return (
    <S.Container>
      {data && (
        <Fragment>
          <S.Text>
            <S.Bold>{query}</S.Bold>검색 결과, 총 <S.Bold>{totalCount}</S.Bold>
            개의 게시물을 찾았어요.
          </S.Text>
          {totalCount === 0 ? (
            <NothingInfo contentType="search" />
          ) : (
            <GridList data={data} />
          )}
        </Fragment>
      )}
    </S.Container>
  );
}
