import { Menu } from "@/components/common/Menu";
import { MyPosts } from "@/components/Mypage/MyPosts";
import { MyChats } from "@/components/Mypage/MyChats";

import { useMenuType } from "@/hooks/useMenuType";

import { MYPAGE_MENU_LIST } from "@/constants";

import * as S from "./style";

export function MyWritting() {
  const { menuType, handleMenuClick } = useMenuType();

  return (
    <S.Container>
      <Menu
        currentMenu={menuType}
        onMenuClick={handleMenuClick}
        menuList={MYPAGE_MENU_LIST}
      />
      {menuType === 0 ? <MyPosts /> : <MyChats />}
    </S.Container>
  );
}
