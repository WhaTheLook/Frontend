import { MouseEvent, useEffect } from "react";

import { AlertIcon } from "@/components/Icons/AlertIcon";
import { LoginModal } from "@/components/common/LoginModal";

import { modalType } from "@/constants";
import { ICON_SIZE } from "@/constants/style";

import { useModalContext } from "@/hooks/contexts/useModalContext";

import * as S from "./style";

interface Props {
  type: modalType;
  onClick?: () => void;
  handleUnmount?: () => void;
}

export function PopupModal({ type, onClick, handleUnmount }: Props) {
  const { handleClose } = useModalContext();

  const state = (function () {
    switch (type) {
      case modalType.SIGNOUT:
        return {
          text: "로그아웃",
          content: <SignoutContent />,
        };
      case modalType.DELETE_POST:
        return {
          text: "삭제",
          content: <DeletePostContent />,
        };
      case modalType.DELETE_ACCOUNT:
        return {
          text: "삭제",
          content: <DeleteAccountContent />,
        };
    }
  })();

  function handleConfirm() {
    if (onClick) {
      handleClose();
      onClick();
    }
  }

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation();
  };

  useEffect(() => {
    return () => {
      if (handleUnmount) {
        handleUnmount();
      }
    };
  }, [handleUnmount]);

  if (type === modalType.SIGNIN) {
    return <LoginModal />;
  }

  return (
    <S.Container onClick={handleClick}>
      {state?.content}
      <S.ButtonWrapper>
        <S.CancleButton onClick={handleClose}>취소</S.CancleButton>
        <S.ConfirmButton onClick={handleConfirm}>{state?.text}</S.ConfirmButton>
      </S.ButtonWrapper>
    </S.Container>
  );

  function DeletePostContent() {
    return (
      <S.TextWrapper>
        <S.Title>게시글 삭제</S.Title>
        <S.Text>해당 게시글을 삭제할까요?</S.Text>
      </S.TextWrapper>
    );
  }

  function DeleteAccountContent() {
    return (
      <S.TextWrapper>
        <AlertIcon size={ICON_SIZE.LARGE} color="#e72c2c" />
        <S.Title>계정 삭제</S.Title>
        <S.Text>정말로 계정을 삭제할까요?</S.Text>
      </S.TextWrapper>
    );
  }

  function SignoutContent() {
    return (
      <S.TextWrapper>
        <S.Title>로그아웃</S.Title>
        <S.Text>로그아웃 할까요?</S.Text>
      </S.TextWrapper>
    );
  }
}
