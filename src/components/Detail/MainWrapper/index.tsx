import { Fragment } from "react";
import { useParams } from "react-router-dom";

import { InfoWrapper } from "@/components/Detail/InfoWrapper";
import { CommentsWrapper } from "@/components/Detail/CommentsWrapper";
import { ProfileBox } from "@/components/Detail/ProfileBox";

import { useResizeWindow } from "@/hooks/useResizeWindow";

import * as S from "./style";

export function MainWrapper() {
  const { postId } = useParams();

  const { breakPoint } = useResizeWindow();

  const isShow = () => !!postId || breakPoint !== "mobile";

  return (
    <Fragment>
      <ProfileBox />
      <S.Container id="detail-scrollView">
        <InfoWrapper />
        {isShow() && <CommentsWrapper />}
      </S.Container>
    </Fragment>
  );
}
