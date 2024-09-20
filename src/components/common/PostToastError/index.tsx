import { AlertIcon } from "@/components/Icons/AlertIcon";
import { RotateIcon } from "@/components/Icons/RotateIcon";

import { ICON_SIZE, TOAST_COLOR } from "@/constants/style";

import * as S from "./style";

interface Props {
  onClick: () => void;
}

export function PostToastError({ onClick }: Props) {
  return (
    <S.Container>
      <S.Wrapper>
        <S.TextBox>
          <AlertIcon
            color={TOAST_COLOR.ERROR.color}
            size={ICON_SIZE.MEDIUM_SMALL}
          />
          <S.Text>이후 게시글을 불러오는데 실패했어요.</S.Text>
        </S.TextBox>
      </S.Wrapper>
      <S.RetryButton onClick={onClick}>
        <RotateIcon color="#FFFFFF" size={ICON_SIZE.MEDIUM_SMALL} />
        다시 시도
      </S.RetryButton>
    </S.Container>
  );
}
