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

  const checkAndAddError = (
    condition: boolean,
    errorKey: UploadErrorKeys,
    errorKeys: UploadErrorKeys[]
  ) => {
    if (condition) {
      errorKeys.push(errorKey);
    }
  };

  const validateForm = () => {
    const errorKeys: UploadErrorKeys[] = [];

    checkAndAddError(images.data.length === 0, "images", errorKeys);
    checkAndAddError(title.data === "", "title", errorKeys);
    checkAndAddError(description.data.trim() === "", "description", errorKeys);
    checkAndAddError(tags.data.length === 0, "tags", errorKeys);

    return errorKeys;
  };

  const handleSubmitBtnClick = () => {
    const errorKeys = validateForm();
    dispatch({ type: UploadActionType.VALIDATE, payload: errorKeys });
    // To do: description.trim()
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
