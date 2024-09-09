import { Menu } from "@/components/common/Menu";
import { MyPosts } from "@/components/Mypage/MyPosts";
import { MyChats } from "@/components/Mypage/MyChats";
import { ApiErrorBoundary } from "@/components/common/ApiErrorBoundary";

import { useMenuType } from "@/hooks/useMenuType";

import { MYPAGE_MENU_LIST } from "@/constants";

import { MyCommentsFetcher } from "@/fetcher/MyPage/MyCommentsFetcher";
import { MyPostsFetcher } from "@/fetcher/MyPage/MyPostsFetcher";

import * as S from "./style";

export function MyWrittingContainer() {
  const { menuType, handleMenuClick } = useMenuType();

  return (
    <S.Container>
      <Menu
        currentMenu={menuType}
        onMenuClick={handleMenuClick}
        menuList={MYPAGE_MENU_LIST}
      />
      {menuType === 0 ? (
        <ApiErrorBoundary>
          <MyPostsFetcher>
            <MyPosts />
          </MyPostsFetcher>
        </ApiErrorBoundary>
      ) : (
        <ApiErrorBoundary>
          <MyCommentsFetcher>
            <MyChats />
          </MyCommentsFetcher>
        </ApiErrorBoundary>
      )}
    </S.Container>
  );
}
