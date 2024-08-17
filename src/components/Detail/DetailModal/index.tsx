import { MouseEvent, ReactNode, useRef } from "react";
import { createPortal } from "react-dom";

import * as S from "./style";

interface Props {
  children: ReactNode;
  onOutSideClick: () => void;
  isOpen: boolean;
}
export function DetailModal({ isOpen, children, onOutSideClick }: Props) {
  const modalRef = useRef<HTMLDivElement>(null);
  const element = document.getElementById("detail-modal") as HTMLElement;

  const handleOutsideClick = ({ target }: MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(target as Node)) {
      onOutSideClick();
    }
  };

  return isOpen
    ? createPortal(
        <S.Container onClick={handleOutsideClick}>
          <div ref={modalRef}>{children}</div>
        </S.Container>,
        element
      )
    : null;
}
