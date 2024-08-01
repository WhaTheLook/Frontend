import { Outlet, useLocation } from "react-router-dom";

import { Header } from "@/components/common/Header";
import { Navigation } from "@/components/common/Navigation";
import { GlobalErrorBoundary } from "@/components/common/GlobalErrorBoundary";

import * as S from "./style";

export function MainLayout() {
  const location = useLocation();

  const isPostPath = location.pathname.startsWith("/post");

  return (
    <S.Container>
      <Header />
      <S.Wrapper>
        <GlobalErrorBoundary>
          <S.Box>
            {!isPostPath && <Navigation />}
            <S.Main $isCenter={isPostPath}>
              <Outlet />
            </S.Main>
          </S.Box>
        </GlobalErrorBoundary>
      </S.Wrapper>
    </S.Container>
  );
}
