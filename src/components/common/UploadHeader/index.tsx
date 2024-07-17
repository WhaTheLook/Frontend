import { Dispatch, Fragment } from "react";
import { useNavigate } from "react-router-dom";

import { PrevArrowIcon } from "@/components/Icons/PrevArrowIcon";
import { HeaderButton } from "../HeaderButton";

import { ActionType, UploadDataType, UploadErrorKeys } from "@/types";
import { UploadActionType } from "@/constants";

import * as S from "./style";

interface Props {
  data: UploadDataType;
  dispatch: Dispatch<ActionType>;
}

export function UploadHeader({ data, dispatch }: Props) {
  const { images, title, description, tags } = data;
  const navigate = useNavigate();

  const handlePrevBtnClick = () => {
    navigate(-1);
  };

  const handleSubmitBtnClick = () => {
    const errorKeys = [] as UploadErrorKeys;
    if (images.data.length === 0) {
      errorKeys.push("images");
    }
    if (title.data === "") {
      errorKeys.push("title");
    }
    if (description.data.trim() === "") {
      errorKeys.push("description");
    }
    if (tags.data.length === 0) {
      errorKeys.push("tags");
    }
    dispatch({ type: UploadActionType.VALIDATE, payload: errorKeys });

    // To do
    // description.trim()
  };

  return (
    <Fragment>
      <S.Container>
        <S.Wrapper>
          <HeaderButton onClick={handlePrevBtnClick}>
            <PrevArrowIcon size={30} color="#000000" />
          </HeaderButton>
          <HeaderButton onClick={handleSubmitBtnClick}>
            <S.UploadButton>글 올리기</S.UploadButton>
          </HeaderButton>
        </S.Wrapper>
      </S.Container>
    </Fragment>
  );
}
