import * as S from "./style";

export function KakaoLoginButton() {
  const KAKAO_AUTH_URL = import.meta.env.VITE_KAKAO_AUTH_URL;
  const KAKAO_CLIENT_ID = import.meta.env.VITE_KAKAO_CLIENT_ID;
  const KAKAO_REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URI;

  const kakaoLoginUrl = `${KAKAO_AUTH_URL}?response_type=code&client_id=${KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URI}`;
  return (
    <a href={kakaoLoginUrl}>
      <S.Button />
    </a>
  );
}
