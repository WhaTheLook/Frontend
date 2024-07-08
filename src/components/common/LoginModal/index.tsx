import { LogoIcon } from "@/components/Icons/LogoIcon";

import * as S from "./style";

export function LoginModal() {
  return (
    <S.Container>
      <S.LogoWrapper>
        <LogoIcon size={60} />
        <S.LogoText>WHATHELOOK</S.LogoText>
      </S.LogoWrapper>
      <S.Text>로그인</S.Text>
      <S.KakaoLoginButton />
    </S.Container>
  );
}
