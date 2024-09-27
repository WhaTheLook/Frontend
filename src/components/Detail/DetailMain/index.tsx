import { useParams } from "react-router-dom";

import { MainWrapper } from "../MainWrapper";
import { SubMainWrapper } from "../SubMainWrapper";

import * as S from "./style";

export function DetailMain() {
  const { postId } = useParams(); // URL를 통한 렌더링 시

  return (
    <S.Container $isModal={Boolean(postId)}>
      <MainWrapper />
      <SubMainWrapper />
    </S.Container>
  );
}
