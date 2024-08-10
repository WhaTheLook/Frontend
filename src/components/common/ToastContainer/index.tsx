import { ReactNode } from "react";
import { createPortal } from "react-dom";

import { useToastContext } from "@/hooks/useToastContex";

import * as S from "./style";

interface Props {
  children: ReactNode;
}

export function ToastContainer({ children }: Props) {
  const { isOpen, handleToastClose } = useToastContext();

  const element = document.getElementById("modal") as HTMLElement;

  const handleAnimationEnd = () => {
    handleToastClose();
  };

  return createPortal(
    isOpen && (
      <S.Container onAnimationEnd={handleAnimationEnd}>{children}</S.Container>
    ),
    element
  );
}
