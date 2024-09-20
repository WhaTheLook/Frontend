import { useLocation } from "react-router-dom";

import { KakaoLoginButton } from "@/components/common/KakaoLoginButton";
import { BookMarkIcon } from "@/components/Icons/BookmarkIcon";
import { UserIcon } from "@/components/Icons/UserIcon";
import { UploadIcon } from "@/components/Icons/UploadIcon";
import { LogoIcon } from "@/components/Icons/LogoIcon";
import { LogoutIcon } from "@/components/Icons/LogoutIcon";

import { ICON_SIZE } from "@/constants/style";
import { ProtectedPathname } from "@/types";

import { useResizeWindow } from "@/hooks/useResizeWindow";

import * as S from "./style";

const protectedRoutes = (iconSize: number) => ({
  saved: {
    icon: <BookMarkIcon size={iconSize} color="#525252" />,
    title: "북마크",
    text: "저장한 게시글을 보려면 로그인하세요.",
  },
  upload: {
    icon: <UploadIcon size={iconSize} color="#525252" />,
    title: "글 작성하기",
    text: "글을 작성하려면 로그인하세요.",
  },
  profile: {
    icon: <UserIcon size={iconSize} color="#525252" />,
    title: "마이페이지",
    text: "저장한 글과 댓글을 보려면 로그인하세요.",
  },
  login: {
    icon: <LogoIcon size={iconSize} color="#525252" />,
    title: "WHATHELOOK",
    text: "로그인하기",
  },
  tokenExpired: {
    icon: <LogoutIcon size={iconSize} color="#525252" />,
    title: "로그인 세션 만료",
    text: "보안을 위해 다시 로그인해주세요",
  },
});

const LoginMessage = ({ pathname }: { pathname: ProtectedPathname }) => {
  const { breakPoint } = useResizeWindow();

  const getIconSize = () => {
    switch (breakPoint) {
      case "mobile":
        return ICON_SIZE.LARGE;
      default:
        return ICON_SIZE.HUGE;
    }
  };

  const routeInfo = protectedRoutes(getIconSize())[pathname || "login"];

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
