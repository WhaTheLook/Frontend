import { useNavigate } from "react-router-dom";

import * as S from "./style";

export function UploadButton() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/upload");
  };

  return (
    <S.Container onClick={handleClick}>
      <S.Text>작성하기</S.Text>
    </S.Container>
  );
}
