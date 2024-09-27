import { WifiOffIcon } from "@/components/Icons/WifiOffIcon";

import { ICON_SIZE } from "@/constants/style";

import { useResizeWindow } from "@/hooks/useResizeWindow";

import * as S from "./style";

interface Props {
  onClickRetry: () => void;
}

export function NetworkError({ onClickRetry }: Props) {
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
      <WifiOffIcon size={getIconSize()} color="#b2b2b2" />
      <S.Title>네트워크 에러</S.Title>
      <S.Text>네트워크 연결 상태를 확인해주세요.</S.Text>
      <S.RetryButton onClick={onClickRetry}>다시 시도</S.RetryButton>
    </S.Container>
  );
}
