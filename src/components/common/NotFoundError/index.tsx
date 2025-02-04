import { useNavigate } from "react-router-dom";

import { FileIcon } from "@/components/Icons/FileIcon";

import { ICON_SIZE } from "@/constants/style";

import { useResizeWindow } from "@/hooks/useResizeWindow";

import * as S from "./style";

export function NotFoundError() {
  const navigate = useNavigate();

  const { breakPoint } = useResizeWindow();

  const handleButtonClick = () => {
    navigate("/");
  };

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
      <S.Title>404 페이지 없음</S.Title>
      <S.Text>해당 데이터를 찾을 수 없어요.</S.Text>
      <S.Button onClick={handleButtonClick}>홈으로 이동</S.Button>
    </S.Container>
  );
}
