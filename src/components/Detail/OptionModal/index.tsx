import { MouseEvent } from "react";

import * as S from "./style";

interface Props {
  onEditClick: () => void;
  onDeleteClick: () => void;
}

export function OptionModal({ onDeleteClick, onEditClick }: Props) {
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    const { target } = event;

    if (!(target instanceof HTMLElement) || !target.matches("button")) return;
    switch (target.textContent) {
      case "수정":
        onEditClick();
        break;
      case "삭제":
        onDeleteClick();
        break;
    }
  };

  return (
    <S.Container onClick={handleClick}>
      <S.EditButton>수정</S.EditButton>
      <S.Divider></S.Divider>
      <S.DeleteButton>삭제</S.DeleteButton>
    </S.Container>
  );
}
