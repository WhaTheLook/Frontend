import { Fragment } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { HeaderButton } from "../HeaderButton";
import { PreviousHeaderButton } from "../PreviousHeaderButton";

import { PathnameType } from "@/constants";

import * as S from "./style";

interface Props {
  onSubmitBtnClick: () => void;
  disabled: boolean;
}

export function UploadHeader({ onSubmitBtnClick, disabled }: Props) {
  const location = useLocation();
  const { pathname } = location;

  const navigate = useNavigate();

  const handlePrevBtnClick = () => {
    navigate("/profile");
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
          <HeaderButton onClick={onSubmitBtnClick} disabled={disabled}>
            {buttonText}
          </HeaderButton>
        </S.Wrapper>
      </S.Container>
    </Fragment>
  );
}
