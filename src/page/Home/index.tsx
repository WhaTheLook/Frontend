import { Menu } from "@/components/common/Menu";
import { PostList } from "@/components/Home/PostList";
import { PostProvider } from "@/components/common/PostProvider";
import { ApiErrorBoundary } from "@/components/common/ApiErrorBoundary";
import { ScrollButton } from "@/components/common/ScrollButton";

import { useMenuType } from "@/hooks/useMenuType";

import { HOME_MENU_LIST } from "@/constants";

import * as S from "./style";

export function Home() {
  const { menuType, handleMenuClick } = useMenuType();

  return (
    <S.Container>
      <Menu
        currentMenu={menuType}
        onMenuClick={handleMenuClick}
        menuList={HOME_MENU_LIST}
      />
      <ApiErrorBoundary>
        <PostProvider>
          <PostList menuType={menuType} />
        </PostProvider>
      </ApiErrorBoundary>
      <ScrollButton />
    </S.Container>
  );
}
