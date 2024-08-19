import { MouseEvent, ReactNode, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

import { useDetailModalContext } from "@/hooks/useDetailModalContext";

import * as S from "./style";

interface Props {
  children: ReactNode;
}

export function DetailModal({ children }: Props) {
  const { isDetailOpen, handleDetailClose } = useDetailModalContext();

  const modalRef = useRef<HTMLDivElement>(null);
  const element = document.getElementById("detail-modal") as HTMLElement;

  const handleOutsideClick = (event: MouseEvent<HTMLDivElement>) => {
    const { target } = event;
    event.stopPropagation();
    if (modalRef.current && !modalRef.current.contains(target as Node)) {
      handleDetailClose("/");
    }
  };

  useEffect(() => {
    return () => {
      handleDetailClose("/");
    };
  }, []);

  return isDetailOpen
    ? createPortal(
        <S.Container onClick={handleOutsideClick}>
          <div ref={modalRef}>{children}</div>
        </S.Container>,
        element
      )
    : null;
}
