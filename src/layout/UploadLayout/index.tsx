import { useReducer } from "react";
import { Outlet } from "react-router-dom";

import { UploadHeader } from "@/components/common/UploadHeader";

import { ActionType, UploadDataType } from "@/types";

import * as S from "./style";

const initState: UploadDataType = {
  images: [],
  title: "",
  description: "",
  tags: [],
};

function reducer(state: UploadDataType, action: ActionType): UploadDataType {
  const { type, payload } = action;

  switch (type) {
    case "IMAGES":
      return {
        ...state,
        images: payload,
      };
    case "TITLE":
      return {
        ...state,
        title: payload,
      };
    case "DESCRITPTION":
      return {
        ...state,
        description: payload,
      };
    case "TAGS":
      return {
        ...state,
        tags: payload,
      };
    default:
      return state;
  }
}

export function UploadLayout() {
  const [data, dispatch] = useReducer(reducer, initState);

  return (
    <S.Container>
      <UploadHeader data={data} />
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
