import { useState } from "react";

import { Menu } from "@/components/Home/Menu";
import { MyPosts } from "@/components/Mypage/MyPosts";
import { MyChats } from "@/components/Mypage/MyChats";

import { MYPAGE_MENU_LIST } from "@/constants";

import * as S from "./style";

export function MyPage() {
  const [currentMenu, setCurrentMenu] = useState(0);

  function handleMenuClick(id: number) {
    setCurrentMenu(id);
  }

  return (
    <S.Container>
      <S.ProfileWrapper>
        <S.ProfileImageBox>
          <S.ProfileInfoDiv>
            <S.ProfileImage src="https://images.unsplash.com/photo-1721205834757-c69d5def190a?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
            <S.ProfileTextBox>
              <S.UserName>홍길동</S.UserName>
              <S.InfoTextDiv>
                <S.InfoText>
                  게시글 <S.Bold>1</S.Bold>
                </S.InfoText>
                <S.InfoText>
                  댓글 <S.Bold>4</S.Bold>
                </S.InfoText>
              </S.InfoTextDiv>
            </S.ProfileTextBox>
          </S.ProfileInfoDiv>
          <S.EditButton>프로필 수정</S.EditButton>
        </S.ProfileImageBox>
      </S.ProfileWrapper>
      <S.PostWrapper>
        <Menu
          currentMenu={currentMenu}
          onMenuClick={handleMenuClick}
          menuList={MYPAGE_MENU_LIST}
        />
        {currentMenu === 0 ? <MyPosts /> : <MyChats />}
      </S.PostWrapper>
    </S.Container>
  );
}
