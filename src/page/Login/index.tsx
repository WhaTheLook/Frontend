import { useLocation } from "react-router-dom";

import { KakaoLoginButton } from "@/components/common/KakaoLoginButton";
import { BookMarkIcon } from "@/components/Icons/BookmarkIcon";
import { UserIcon } from "@/components/Icons/UserIcon";
import { UploadIcon } from "@/components/Icons/UploadIcon";
import { LogoIcon } from "@/components/Icons/LogoIcon";

import { ICON_SIZE } from "@/constants/style";

import * as S from "./style";

type ProtectedPathname = "saved" | "upload" | "profile";

const iconProps = { size: ICON_SIZE.HUGE, color: "#525252" };

const protectedRoutes = {
  saved: {
    icon: <BookMarkIcon {...iconProps} />,
    title: "북마크",
    text: "저장한 게시글을 보려면 로그인하세요.",
  },
  upload: {
    icon: <UploadIcon {...iconProps} />,
    title: "글 작성하기",
    text: "글을 작성하려면 로그인하세요.",
  },
  profile: {
    icon: <UserIcon {...iconProps} />,
    title: "마이페이지",
    text: "저장한 게시글이나 작성한 댓글을 보려면 로그인하세요.",
  },
  login: {
    icon: <LogoIcon {...iconProps} />,
    title: "WHATHELOOK",
    text: "로그인하기",
  },
};

const LoginMessage = ({ pathname }: { pathname: ProtectedPathname }) => {
  const routeInfo = protectedRoutes[pathname || "login"];

  return (
    <S.TextBox>
      {routeInfo.icon}
      <S.Title>{routeInfo.title}</S.Title>
      <S.InfoText>{routeInfo.text}</S.InfoText>
    </S.TextBox>
  );
};

export function Login() {
  const location = useLocation();
  const pathname = location.state as ProtectedPathname;

  return (
    <S.Container>
      <S.Wrapper>
        <LoginMessage pathname={pathname} />
        <KakaoLoginButton />
      </S.Wrapper>
    </S.Container>
  );
}
