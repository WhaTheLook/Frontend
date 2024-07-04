import { Outlet } from "react-router-dom";

import { Header } from "@/components/common/Header";
import { Navigation } from "@/components/common/Navigation";

import * as S from "./style";

export function MainLayout() {
  return (
    <S.Container>
      <Header />
      <S.Wrapper>
        <S.Box>
          <Navigation />
          <S.Main>
            <Outlet />
          </S.Main>
        </S.Box>
      </S.Wrapper>
    </S.Container>
  );
}
