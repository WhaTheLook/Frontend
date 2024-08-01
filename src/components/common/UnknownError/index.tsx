import { FileIcon } from "@/components/Icons/FileIcon";

import { ICON_SIZE } from "@/constants/style";

import * as S from "./style";

interface Props {
  onClickRetry: () => void;
}

export function UnknownError({ onClickRetry }: Props) {
  return (
    <S.Container>
      <FileIcon size={ICON_SIZE.LARGER} color="#b2b2b2" />
      <S.Title>다시 시도해 주세요</S.Title>
      <S.Text>데이터를 불러오는데 실패했어요.</S.Text>
      <S.RetryButton onClick={onClickRetry}>다시 시도</S.RetryButton>
    </S.Container>
  );
}
