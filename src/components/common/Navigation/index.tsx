import { Link, useLocation } from "react-router-dom";

import { HomeIcon } from "@/components/Icons/HomeIcon";
import { SearchIcon } from "@/components/Icons/SearchIcon";
import { BookMarkIcon } from "@/components/Icons/BookmarkIcon";
import { UserIcon } from "@/components/Icons/UserIcon";
import { CreateButton } from "@/components/common/CreateButton";

import { ICON_SIZE } from "@/constants/style";

import { useResizeWindow } from "@/hooks/useResizeWindow";

import * as S from "./style";

export function Navigation() {
  const { breakPoint } = useResizeWindow();
  const location = useLocation();
  const { pathname } = location;

  const getIconSize = () => {
    switch (breakPoint) {
      case "mobile":
        return ICON_SIZE.MEDIUM_TINY;
      default:
        return ICON_SIZE.MEDIUM_SMALL;
    }
  };

  const isExistUploadButton = () =>
    breakPoint !== "large" && !(pathname === "/" || pathname === "/profile");

  const iconProps = { size: getIconSize(), color: "#000" };

  const navigationList = [
    {
      icon: <HomeIcon {...iconProps} />,
      text: "홈",
      pathUrl: "/",
    },
    {
      icon: <SearchIcon {...iconProps} />,
      text: "검색",
      pathUrl: "/search",
    },
    {
      icon: <BookMarkIcon {...iconProps} />,
      text: "저장한 글",
      pathUrl: "/saved",
    },
    {
      icon: <UserIcon {...iconProps} />,
      text: "마이페이지",
      pathUrl: "/profile",
    },
  ];

  return (
    <S.Container>
      <S.Wrapper>
        <S.List>
          {navigationList.map(({ icon, text, pathUrl }) => (
            <Link to={pathUrl} key={text}>
              <S.Item>
                <S.Icon>{icon}</S.Icon>
                <S.Text>{text}</S.Text>
              </S.Item>
            </Link>
          ))}
        </S.List>
      </S.Wrapper>
      {!isExistUploadButton() && <CreateButton />}
    </S.Container>
  );
}
