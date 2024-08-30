import { Fragment } from "react";

import { InfoWrapper } from "@/components/Detail/InfoWrapper";
import { CommentsWrapper } from "@/components/Detail/CommentsWrapper";
import { ProfileBox } from "@/components/Detail/ProfileBox";

import * as S from "./style";

export function MainWrapper() {
  return (
    <Fragment>
      <ProfileBox />
      <S.Container id="detail-scrollView">
        <InfoWrapper />
        <CommentsWrapper />
      </S.Container>
    </Fragment>
  );
}
