import { Fragment, useState } from "react";
import { Link } from "react-router-dom";

import { LogoIcon } from "@/components/Icons/LogoIcon";
import { PopupModal } from "../PopupModal";
import { ModalPortal } from "../ModalPortal";
import { LoginModal } from "../LoginModal";
import { HeaderButton } from "../HeaderButton";

import { ICON_SIZE } from "@/constants/style";

import { useModalContext } from "@/hooks/useModalContext";

import * as S from "./style";

export function Header() {
  const [isLogin, setIsLogin] = useState(false);
  const [userName, setUserName] = useState("홍길동");

  const { handleOpen } = useModalContext();

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
            {isLogin ? (
              <S.LoginMessage>
                <S.UserName>{userName}</S.UserName>님 안녕하세요!
              </S.LoginMessage>
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
