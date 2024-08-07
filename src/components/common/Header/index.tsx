import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { LogoIcon } from "@/components/Icons/LogoIcon";
import { PopupModal } from "../PopupModal";
import { ModalPortal } from "../ModalPortal";
import { LoginModal } from "../LoginModal";
import { HeaderButton } from "../HeaderButton";

import { ICON_SIZE } from "@/constants/style";
import { UserInfoType } from "@/types";
import { removeLocalStorageItem } from "@/utils";

import { useModalContext } from "@/hooks/useModalContext";

import {
  logout,
  selectCurrentSignStatus,
  selectCurrentUser,
} from "@/store/slice/authSlice";

import * as S from "./style";

export function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSignIn = useSelector(selectCurrentSignStatus);
  const user = useSelector(selectCurrentUser) as UserInfoType | null;

  const { handleOpen } = useModalContext();

  const handleLogoutBtnClick = () => {
    dispatch(logout());
    removeLocalStorageItem("accessToken");
    removeLocalStorageItem("refreshToken");
    navigate("/login");
  };

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
                <HeaderButton onClick={handleLogoutBtnClick}>
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
