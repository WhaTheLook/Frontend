import { PrevArrowIcon } from "@/components/Icons/PrevArrowIcon";

import * as S from "./style";

interface Props {
  onClick: () => void;
}

export function PreviousHeaderButton({ onClick }: Props) {
  return (
    <S.Container onClick={onClick}>
      <PrevArrowIcon size={30} color="#000000" />
    </S.Container>
  );
}
