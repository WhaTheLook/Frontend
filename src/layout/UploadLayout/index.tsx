import { Fragment, useEffect, useReducer } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

import { ToastContainer } from "@/components/common/ToastContainer";
import { ToastMessage } from "@/components/common/ToastMessage";
import { UploadHeader } from "@/components/common/UploadHeader";

import { getLocalStorageItem } from "@/utils";
import { CommonError } from "@/utils/CommonError";
import { ActionType, UploadDataType, UploadErrorKeys } from "@/types";
import {
  ACCESS_TOKEN,
  API_PATH,
  toastType,
  UploadActionType,
} from "@/constants";

import { useToastContext } from "@/hooks/useToastContex";

import { selectCurrentUser } from "@/store/slice/authSlice";

import * as S from "./style";

const initState: UploadDataType = {
  postType: { data: null, validation: false },
  images: { data: [], validation: false },
  title: { data: "", validation: false },
  description: { data: "", validation: false },
  tags: { data: [], validation: false },
};

function reducer(state: UploadDataType, action: ActionType): UploadDataType {
  const { type, payload } = action;

  switch (type) {
    case "POSTTYPE":
      return {
        ...state,
        postType: { data: payload, validation: false },
      };
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
  const user = useSelector(selectCurrentUser);

  const { handleToastOpen } = useToastContext();

  const navigate = useNavigate();
  const { postType, images, title, description, tags } = data;

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

    checkAndAddError(postType.data === null, "postType", errorKeys);
    checkAndAddError(images.data.length === 0, "images", errorKeys);
    checkAndAddError(title.data === "", "title", errorKeys);
    checkAndAddError(description.data.trim() === "", "description", errorKeys);
    checkAndAddError(tags.data.length === 0, "tags", errorKeys);

    return errorKeys;
  };

  const handleSubmitBtnClick = async () => {
    const errorKeys = validateForm();
    if (errorKeys.length !== 0) {
      dispatch({ type: UploadActionType.VALIDATE, payload: errorKeys });
      return;
    }

    try {
      const accessToken = getLocalStorageItem(ACCESS_TOKEN);

      const formData = new FormData();
      const postRequestData = new Blob(
        [
          JSON.stringify({
            kakaoId: user?.kakaoId,
            title: title.data.trim(),
            content: description.data.trim(),
            category: postType.data,
            hashtags: tags.data.map((tag) => `#${tag}`),
          }),
        ],
        { type: "application/json" }
      );
      formData.append("postRequest", postRequestData);
      images.data
        .map((image) => image.file)
        .forEach((image) => formData.append("photos", image as File));

      const response = await fetch(API_PATH.createPost(), {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const { status } = response;
        throw new CommonError(status);
      }

      navigate("/");
    } catch (error) {
      if (error instanceof CommonError) {
        handleToastOpen();
      }
    }
  };

  useEffect(() => {
    dispatch({ type: UploadActionType.RESET, payload: null });
  }, []);

  return (
    <Fragment>
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
      <ToastContainer>
        <ToastMessage
          type={toastType.WARNING}
          text="네트워크 에러가 발생했어요. 다시 시도해주세요."
        ></ToastMessage>
      </ToastContainer>
    </Fragment>
  );
}
