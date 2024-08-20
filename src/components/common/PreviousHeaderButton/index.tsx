import { PrevArrowIcon } from "@/components/Icons/PrevArrowIcon";

import { ICON_SIZE } from "@/constants/style";

import * as S from "./style";

interface Props {
  onClick: () => void;
  disabled: boolean;
}

export function PreviousHeaderButton({ onClick, disabled }: Props) {
  return (
    <S.Container onClick={onClick} disabled={disabled}>
      <PrevArrowIcon size={ICON_SIZE.MEDIUM_LARGE} color="#000000" />
    </S.Container>
  );
}
