import { MainWrapper } from "../MainWrapper";
import { SubMainWrapper } from "../SubMainWrapper";

import * as S from "./style";

export function DetailMain() {
  return (
    <S.Container>
      <MainWrapper />
      <SubMainWrapper />
    </S.Container>
  );
}
