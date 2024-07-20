import { useEffect, useReducer } from "react";
import { Outlet } from "react-router-dom";

import { UploadHeader } from "@/components/common/UploadHeader";

import { ActionType, UploadDataType, UploadErrorKeys } from "@/types";
import { UploadActionType } from "@/constants";

import * as S from "./style";

const initState: UploadDataType = {
  images: { data: [], validation: false },
  title: { data: "", validation: false },
  description: { data: "", validation: false },
  tags: { data: [], validation: false },
};

function reducer(state: UploadDataType, action: ActionType): UploadDataType {
  const { type, payload } = action;

  switch (type) {
    case "IMAGES":
      return {
        ...state,
        images: { data: payload, validation: false },
      };
    case "TITLE":
      return {
        ...state,
        title: { data: payload, validation: false },
      };
    case "DESCRITPTION":
      return {
        ...state,
        description: { data: payload, validation: false },
      };
    case "TAGS":
      return {
        ...state,
        tags: { data: payload, validation: false },
      };
    case "VALIDATE": {
      const updatedState = { ...state };
      payload.forEach((key) => (updatedState[key].validation = true));
      return updatedState;
    }
    case "RESET":
      return JSON.parse(JSON.stringify(initState));
    default:
      return state;
  }
}

export function UploadLayout() {
  const [data, dispatch] = useReducer(reducer, initState);

  const { images, title, description, tags } = data;

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

  useEffect(() => {
    dispatch({ type: UploadActionType.RESET, payload: null });
  }, []);

  return (
    <S.Container>
      <UploadHeader onSubmitBtnClick={handleSubmitBtnClick} />
      <S.Wrapper>
        <S.Box>
          <S.Main>
            <Outlet context={{ data, dispatch }} />
          </S.Main>
        </S.Box>
      </S.Wrapper>
    </S.Container>
  );
}
