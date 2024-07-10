import { MouseEvent, ReactNode, useRef } from "react";

import * as S from "./style";

interface Props {
  children: ReactNode;
  onOutSideClick: () => void;
}
export function DetailModal({ children, onOutSideClick }: Props) {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleOutsideClick = ({ target }: MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(target as Node)) {
      onOutSideClick();
    }
  };

  return (
    <S.Container onClick={handleOutsideClick}>
      <div ref={modalRef}>{children}</div>
    </S.Container>
  );
}
