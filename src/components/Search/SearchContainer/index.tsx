import { Fragment } from "react";

import { GridList } from "@/components/common/GridList";
import { NothingInfo } from "@/components/common/NothingInfo";

import { useSearchContext } from "@/hooks/useSearchContext";

import * as S from "./style";

export function SearchContainer() {
  const { data } = useSearchContext();

  return (
    <S.Container>
      {data && (
        <Fragment>
          <S.Text>
            총 <S.Bold>{data.length}</S.Bold>개의 게시물
          </S.Text>
          {data.length === 0 ? (
            <NothingInfo contentType="search" />
          ) : (
            <GridList data={data} />
          )}
        </Fragment>
      )}
    </S.Container>
  );
}
