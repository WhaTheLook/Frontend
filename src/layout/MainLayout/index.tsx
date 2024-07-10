import { Outlet, useLocation } from "react-router-dom";

import { Header } from "@/components/common/Header";
import { Navigation } from "@/components/common/Navigation";

import * as S from "./style";

export function MainLayout() {
  const location = useLocation();

  const isPostPath = location.pathname.startsWith("/post");

  return (
    <S.Container>
      <Header />
      <S.Wrapper>
        <S.Box>
          {!isPostPath && <Navigation />}
          <S.Main $isCenter={isPostPath}>
            <Outlet />
          </S.Main>
        </S.Box>
      </S.Wrapper>
    </S.Container>
  );
}
