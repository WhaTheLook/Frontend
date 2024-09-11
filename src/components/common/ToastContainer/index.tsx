import { createPortal } from "react-dom";

import { ToastMessage } from "../ToastMessage";

import { useToastContext } from "@/hooks/contexts/useToastContex";

import * as S from "./style";

export function ToastContainer() {
  const { isOpen, handleToastClose, type, content } = useToastContext();

  const element = document.getElementById("modal") as HTMLElement;

  const handleAnimationEnd = () => {
    handleToastClose();
  };

  return createPortal(
    isOpen && (
      <S.Container onAnimationEnd={handleAnimationEnd}>
        <ToastMessage type={type} text={content} />
      </S.Container>
    ),
    element
  );
}
