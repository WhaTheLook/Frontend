import { FileIcon } from "@/components/Icons/FileIcon";

import { ICON_SIZE } from "@/constants/style";

import { useResizeWindow } from "@/hooks/useResizeWindow";

import * as S from "./style";

interface Props {
  onClickRetry: () => void;
}

export function UnknownError({ onClickRetry }: Props) {
  const { breakPoint } = useResizeWindow();

  const getIconSize = () => {
    switch (breakPoint) {
      case "mobile":
        return ICON_SIZE.LARGE;
        break;
      default:
        return ICON_SIZE.LARGER;
    }
  };

  return (
    <S.Container>
      <FileIcon size={getIconSize()} color="#b2b2b2" />
      <S.Title>다시 시도해 주세요</S.Title>
      <S.Text>데이터를 불러오는데 실패했어요.</S.Text>
      <S.RetryButton onClick={onClickRetry}>다시 시도</S.RetryButton>
    </S.Container>
  );
}
