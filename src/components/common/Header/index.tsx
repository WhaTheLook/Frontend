import { Fragment } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { LogoIcon } from "@/components/Icons/LogoIcon";
import { PopupModal } from "../PopupModal";
import { ModalPortal } from "../ModalPortal";
import { LoginModal } from "../LoginModal";
import { HeaderButton } from "../HeaderButton";

import { ICON_SIZE } from "@/constants/style";
import { UserInfoType } from "@/types";

import { useModalContext } from "@/hooks/useModalContext";
import { useLogout } from "@/hooks/useLogout";

import {
  selectCurrentSignStatus,
  selectCurrentUser,
} from "@/store/slice/authSlice";

import * as S from "./style";

export function Header() {
  const isSignIn = useSelector(selectCurrentSignStatus);
  const user = useSelector(selectCurrentUser) as UserInfoType | null;

  const { handleOpen } = useModalContext();
  const { handleLogout } = useLogout();

  return (
    <Fragment>
      <S.Container>
        <S.Wrapper>
          <Link to="/">
            <S.TitleBox>
              <LogoIcon size={ICON_SIZE.LARGE} />
              <S.Title>WHATHELOOK</S.Title>
            </S.TitleBox>
          </Link>
          <S.InfoBox>
            {isSignIn ? (
              <Fragment>
                <S.LoginMessage>
                  <S.UserName>{user?.name}</S.UserName>님 안녕하세요!
                </S.LoginMessage>
                <HeaderButton onClick={() => handleLogout("login")}>
                  로그아웃
                </HeaderButton>
              </Fragment>
            ) : (
              <HeaderButton onClick={handleOpen}>로그인</HeaderButton>
            )}
          </S.InfoBox>
        </S.Wrapper>
      </S.Container>
      <ModalPortal>
        <PopupModal children={<LoginModal />} />
      </ModalPortal>
    </Fragment>
  );
}
