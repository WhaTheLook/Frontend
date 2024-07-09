import { ReactNode } from "react";

import { useModalContext } from "@/hooks/useModalContext";
import { modalType } from "@/constants";

import * as S from "./style";

interface Props {
  type?: modalType;
  onClick?: () => void;
  children?: ReactNode;
}

export function PopupModal({ type, onClick, children }: Props) {
  const { handleClose } = useModalContext();

  if (children) return children;

  const state = (function () {
    switch (type) {
      case modalType.SIGNOUT:
        return {
          text: "로그아웃",
          content: <SignoutContent />,
        };
      case modalType.DELETE:
        return {
          text: "삭제",
          content: <DeletePostContent />,
        };
    }
  })();

  function handleConfirm() {
    if (onClick) {
      handleClose();
      onClick();
    }
  }

  return (
    <S.Container>
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
        <S.Text>해당 게시물을 삭제할까요?</S.Text>
      </S.TextWrapper>
    );
  }

  function SignoutContent() {
    return (
      <S.TextWrapper>
        <S.Text>로그아웃 할까요?</S.Text>
      </S.TextWrapper>
    );
  }
}
