import { Outlet } from "react-router-dom";

import { UploadHeader } from "@/components/common/UploadHeader";

import * as S from "./style";

export function UploadLayout() {
  return (
    <S.Container>
      <UploadHeader />
      <S.Wrapper>
        <S.Box>
          <S.Main>
            <Outlet />
          </S.Main>
        </S.Box>
      </S.Wrapper>
    </S.Container>
  );
}
