import { Fragment } from "react";
import { useNavigate } from "react-router-dom";

import { PrevArrowIcon } from "@/components/Icons/PrevArrowIcon";
import { HeaderButton } from "../HeaderButton";

import * as S from "./style";

interface Props {
  onSubmitBtnClick: () => void;
}

export function UploadHeader({ onSubmitBtnClick }: Props) {
  const navigate = useNavigate();

  const handlePrevBtnClick = () => {
    navigate(-1);
  };

  return (
    <Fragment>
      <S.Container>
        <S.Wrapper>
          <HeaderButton onClick={handlePrevBtnClick}>
            <PrevArrowIcon size={30} color="#000000" />
          </HeaderButton>
          <HeaderButton onClick={onSubmitBtnClick}>
            <S.UploadButton>글 올리기</S.UploadButton>
          </HeaderButton>
        </S.Wrapper>
      </S.Container>
    </Fragment>
  );
}
