import { PrevArrowIcon } from "@/components/Icons/PrevArrowIcon";

import { ICON_SIZE } from "@/constants/style";

import * as S from "./style";

interface Props {
  onClick: () => void;
}

export function PreviousHeaderButton({ onClick }: Props) {
  return (
    <S.Container onClick={onClick}>
      <PrevArrowIcon size={ICON_SIZE.MEDIUM_LARGE} color="#000000" />
    </S.Container>
  );
}
