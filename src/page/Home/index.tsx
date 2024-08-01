import { useState } from "react";

import { Menu } from "@/components/common/Menu";
import { SortTab } from "@/components/Home/SortTab";
import { PostList } from "@/components/Home/PostList";
import { PostProvider } from "@/components/common/PostProvider";
import { ApiErrorBoundary } from "@/components/common/ApiErrorBoundary";

import { useMenuType } from "@/hooks/useMenuType";

import { HOME_MENU_LIST } from "@/constants";

import * as S from "./style";

export function Home() {
  const [sortType, setSortType] = useState(0);

  const { menuType, handleMenuClick } = useMenuType();

  function handleSortTypeClick(id: number) {
    setSortType(id);
  }

  return (
    <S.Container>
      <Menu
        currentMenu={menuType}
        onMenuClick={handleMenuClick}
        menuList={HOME_MENU_LIST}
      />
      <SortTab sortType={sortType} onSortTypeClick={handleSortTypeClick} />
      <ApiErrorBoundary>
        <PostProvider>
          <PostList menuType={menuType} sortType={sortType} />
        </PostProvider>
      </ApiErrorBoundary>
    </S.Container>
  );
}
