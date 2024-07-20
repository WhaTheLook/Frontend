import { Fragment } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { HeaderButton } from "../HeaderButton";
import { PreviousHeaderButton } from "../PreviousHeaderButton";

import { PathnameType } from "@/constants";

import * as S from "./style";

interface Props {
  onSubmitBtnClick: () => void;
}

export function UploadHeader({ onSubmitBtnClick }: Props) {
  const location = useLocation();
  const { pathname } = location;

  const navigate = useNavigate();

  const handlePrevBtnClick = () => {
    navigate(-1);
  };

  const buttonText =
    {
      [PathnameType.PROFILE]: "수정하기",
      [PathnameType.UPLOAD]: "작성하기",
    }[pathname] || "";

  return (
    <Fragment>
      <S.Container>
        <S.Wrapper>
          <PreviousHeaderButton onClick={handlePrevBtnClick} />
          <HeaderButton onClick={onSubmitBtnClick}>{buttonText}</HeaderButton>
        </S.Wrapper>
      </S.Container>
    </Fragment>
  );
}
