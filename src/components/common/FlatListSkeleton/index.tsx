import { Fragment } from "react";

import { Divider } from "@/components/common/Divider";

import * as S from "./style";

interface Props {
  count: number;
}

export function FlatListSkeleton({ count }: Props) {
  const totalCount = Array.from({ length: count }, (_, idx) => idx);
  return (
    <S.Container>
      {totalCount.map((element, index) => (
        <Fragment key={element}>
          <FlatItemSkeleton />
          {index < totalCount.length - 1 && <Divider />}
        </Fragment>
      ))}
    </S.Container>
  );
}

function FlatItemSkeleton() {
  const tagsCount = Array.from({ length: 3 }, (_, idx) => idx);
  return (
    <S.Wrapper>
      <S.TextWrapper>
        <S.Title />
        <S.Description />
        <S.TagsBox>
          {tagsCount.map((element) => (
            <S.Tag key={element} />
          ))}
        </S.TagsBox>
        <S.InfoBox />
      </S.TextWrapper>
      <S.ImageWrapper />
    </S.Wrapper>
  );
}
