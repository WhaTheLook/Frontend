import { LogoIcon } from "@/components/Icons/LogoIcon";

import { ICON_SIZE } from "@/constants/style";

import * as S from "./style";

export function LoginModal() {
  const KAKAO_AUTH_URL = import.meta.env.VITE_KAKAO_AUTH_URL;
  const KAKAO_CLIENT_ID = import.meta.env.VITE_KAKAO_CLIENT_ID;
  const KAKAO_REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URI;

  const kakaoLoginUrl = `${KAKAO_AUTH_URL}?response_type=code&client_id=${KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URI}`;
  return (
    <S.Container>
      <S.LogoWrapper>
        <LogoIcon size={ICON_SIZE.HUGE} />
        <S.LogoText>WHATHELOOK</S.LogoText>
      </S.LogoWrapper>
      <S.Text>로그인</S.Text>
      <a href={kakaoLoginUrl}>
        <S.KakaoLoginButton />
      </a>
    </S.Container>
  );
}
