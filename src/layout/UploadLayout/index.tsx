import { useReducer } from "react";
import { Outlet } from "react-router-dom";

import { UploadHeader } from "@/components/common/UploadHeader";

import { ActionType, UploadDataType } from "@/types";

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
    default:
      return state;
  }
}

export function UploadLayout() {
  const [data, dispatch] = useReducer(reducer, initState);

  return (
    <S.Container>
      <UploadHeader data={data} dispatch={dispatch} />
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
