import { Link } from "react-router-dom";

import { HomeIcon } from "@/components/Icons/HomeIcon";
import { SearchIcon } from "@/components/Icons/SearchIcon";
import { BookMarkIcon } from "@/components/Icons/BookmarkIcon";
import { UserIcon } from "@/components/Icons/UserIcon";
import { UploadButton } from "../UploadButton";

import { ICON_SIZE } from "@/constants/style";

import * as S from "./style";

const navigationList = [
  {
    icon: <HomeIcon size={ICON_SIZE.MEDIUM_SMALL} />,
    text: "홈",
    pathUrl: "/",
  },
  {
    icon: <SearchIcon size={ICON_SIZE.MEDIUM_SMALL} color="#000" />,
    text: "검색",
    pathUrl: "/search",
  },
  {
    icon: <BookMarkIcon size={ICON_SIZE.MEDIUM_SMALL} />,
    text: "저장한 글",
    pathUrl: "/saved",
  },
  {
    icon: <UserIcon size={ICON_SIZE.MEDIUM_SMALL} />,
    text: "마이페이지",
    pathUrl: "/profile",
  },
];

export function Navigation() {
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
      <UploadButton />
    </S.Container>
  );
}
