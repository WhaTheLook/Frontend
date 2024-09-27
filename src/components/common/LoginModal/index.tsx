import { LogoIcon } from "@/components/Icons/LogoIcon";
import { KakaoLoginButton } from "../KakaoLoginButton";

import { ICON_SIZE } from "@/constants/style";

import * as S from "./style";

export function LoginModal() {
  return (
    <S.Container>
      <S.LogoWrapper>
        <LogoIcon size={ICON_SIZE.HUGE} color="#000" />
        <S.LogoText>e:oat</S.LogoText>
      </S.LogoWrapper>
      <S.Text>로그인</S.Text>
      <KakaoLoginButton />
    </S.Container>
  );
}
