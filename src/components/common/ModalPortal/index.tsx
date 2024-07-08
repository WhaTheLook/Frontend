import { MouseEvent, ReactNode, useContext, useRef } from "react";
import { createPortal } from "react-dom";

import { ModalContext } from "../ModalProvider";

import * as S from "./style";

interface ModalPortalProps {
  children: ReactNode;
}

export function ModalPortal({ children }: ModalPortalProps) {
  const { isOpen, handleClose } = useContext(ModalContext);

  const modalRef = useRef<HTMLDivElement>(null);
  const element = document.getElementById("modal") as HTMLElement;

  function handleOutsideClick({ target }: MouseEvent<HTMLDivElement>) {
    if (modalRef.current && !modalRef.current.contains(target as Node)) {
      handleClose();
    }
  }

  return isOpen
    ? createPortal(
        <S.Container onClick={handleOutsideClick}>
          <div ref={modalRef}>{children}</div>
        </S.Container>,
        element
      )
    : null;
}
