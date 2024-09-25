import { Fragment } from "react";
import { useParams } from "react-router-dom";

import { InfoWrapper } from "@/components/Detail/InfoWrapper";
import { CommentsWrapper } from "@/components/Detail/CommentsWrapper";
import { ProfileBox } from "@/components/Detail/ProfileBox";

import * as S from "./style";

export function MainWrapper() {
  const { postId } = useParams();

  return (
    <Fragment>
      <ProfileBox />
      <S.Container id="detail-scrollView">
        <InfoWrapper />
        {postId && <CommentsWrapper />}
      </S.Container>
    </Fragment>
  );
}
