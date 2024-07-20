import { Link } from "react-router-dom";

import { HomeIcon } from "@/components/Icons/HomeIcon";
import { SearchIcon } from "@/components/Icons/SearchIcon";
import { BookMarkIcon } from "@/components/Icons/BookmarkIcon";
import { UserIcon } from "@/components/Icons/UserIcon";
import { UploadIcon } from "@/components/Icons/UploadIcon";

import * as S from "./style";

const navigationList = [
  {
    icon: <HomeIcon size={22} />,
    text: "홈",
    pathUrl: "/",
  },
  {
    icon: <SearchIcon size={22} color="#000" />,
    text: "검색",
    pathUrl: "/search",
  },
  {
    icon: <BookMarkIcon size={22} />,
    text: "저장한 글",
    pathUrl: "/saved",
  },
  {
    icon: <UserIcon size={22} />,
    text: "마이페이지",
    pathUrl: "/profile",
  },
  {
    icon: <UploadIcon size={22} />,
    text: "글 올리기",
    pathUrl: "/upload",
  },
];

export function Navigation() {
  return (
    <S.Container>
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
    </S.Container>
  );
}
