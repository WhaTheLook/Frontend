import { useState } from "react";

import { Menu } from "@/components/common/Menu";
import { MyPosts } from "@/components/Mypage/MyPosts";
import { MyChats } from "@/components/Mypage/MyChats";

import { MYPAGE_MENU_LIST } from "@/constants";

import * as S from "./style";

export function MyWritting() {
  const [currentMenu, setCurrentMenu] = useState(0);

  function handleMenuClick(id: number) {
    setCurrentMenu(id);
  }

  return (
    <S.Container>
      <Menu
        currentMenu={currentMenu}
        onMenuClick={handleMenuClick}
        menuList={MYPAGE_MENU_LIST}
      />
      {currentMenu === 0 ? <MyPosts /> : <MyChats />}
    </S.Container>
  );
}
