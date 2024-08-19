import { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { LogoIcon } from "@/components/Icons/LogoIcon";
import { PopupModal } from "../PopupModal";
import { ModalPortal } from "../ModalPortal";
import { HeaderButton } from "../HeaderButton";

import { modalType } from "@/constants";
import { ICON_SIZE } from "@/constants/style";

import { useModalContext } from "@/hooks/useModalContext";
import { useLogout } from "@/hooks/useLogout";

import {
  selectCurrentSignStatus,
  selectCurrentUser,
} from "@/store/slice/authSlice";

import * as S from "./style";

interface ModalInfoType {
  [key: string]: {
    type: modalType;
    onClick?: () => void;
  };
}

export function Header() {
  const [modal, setModal] = useState<modalType | null>(null);
  const isSignIn = useSelector(selectCurrentSignStatus);
  const user = useSelector(selectCurrentUser);

  const { handleOpen } = useModalContext();
  const { handleLogout } = useLogout();

  const openModal = (type: modalType) => {
    setModal(type);
    handleOpen();
  };

  const modalInfo: ModalInfoType = {
    SIGNIN: {
      type: modalType.SIGNIN,
      onClick: undefined,
    },
    SIGNOUT: {
      type: modalType.SIGNOUT,
      onClick: () => handleLogout("login"),
    },
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
                <HeaderButtonContainer
                  onClick={() => openModal(modalType.SIGNOUT)}
                  isSignIn={isSignIn}
                />
              </Fragment>
            ) : (
              <HeaderButtonContainer
                onClick={() => openModal(modalType.SIGNIN)}
                isSignIn={isSignIn}
              />
            )}
          </S.InfoBox>
        </S.Wrapper>
      </S.Container>
      {modal && (
        <ModalPortal>
          <PopupModal
            type={modalInfo[modal].type}
            onClick={modalInfo[modal].onClick}
            handleUnmount={() => setModal(null)}
          />
        </ModalPortal>
      )}
    </Fragment>
  );
}

interface HeaderButtonContainerProps {
  onClick: () => void;
  isSignIn: boolean;
}

function HeaderButtonContainer({
  onClick,
  isSignIn,
}: HeaderButtonContainerProps) {
  return (
    <HeaderButton onClick={onClick} disabled={false}>
      {isSignIn ? "로그아웃" : "로그인"}
    </HeaderButton>
  );
}
