import { Fragment, useEffect, useReducer, useState } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

import { ToastContainer } from "@/components/common/ToastContainer";
import { UploadHeader } from "@/components/common/UploadHeader";

import { CommonError } from "@/utils/CommonError";
import { ActionType, UploadDataType, UploadErrorKeys } from "@/types";
import {
  API_PATH,
  TOAST_MESSAGE,
  toastType,
  UploadActionType,
} from "@/constants";

import { useToastContext } from "@/hooks/useToastContex";
import { useAuthMutation } from "@/hooks/useAuthMutation";
import { useReIssueToken } from "@/hooks/useReIssueToken";

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
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector(selectCurrentUser);
  const [data, dispatch] = useReducer(reducer, initState);
  const { postType, images, title, description, tags } = data;

  const { reIssueTokenFetcher } = useReIssueToken();
  const { handleToastOpen } = useToastContext();
  const { fetcher } = useAuthMutation({
    url: API_PATH.createPost(),
    method: "POST",
    body: getFormData(),
    isFormData: true,
  });

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

  function getFormData() {
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

    return formData;
  }

  const hasError = (errorKeys: (keyof UploadDataType)[]) => {
    return errorKeys.length !== 0;
  };

  const handleSubmitBtnClick = async () => {
    const errorKeys = validateForm();
    if (hasError(errorKeys)) {
      dispatch({ type: UploadActionType.VALIDATE, payload: errorKeys });
      return;
    }

    try {
      setIsLoading(true);
      await fetcher();

      navigate("/profile");
    } catch (error) {
      if (error instanceof CommonError) {
        const { statusCode } = error;
        switch (statusCode) {
          case 401:
            try {
              await reIssueTokenFetcher();
              await fetcher();
            } catch (error) {
              handleToastOpen({
                type: toastType.ERROR,
                content: TOAST_MESSAGE.tokenExpired(),
              });
            }
            break;
          default:
            handleToastOpen({
              type: toastType.ERROR,
              content: TOAST_MESSAGE.createPostError(),
            });
            break;
        }
      } else {
        handleToastOpen({
          type: toastType.ERROR,
          content: TOAST_MESSAGE.createPostError(),
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    dispatch({ type: UploadActionType.RESET, payload: null });
  }, []);

  return (
    <Fragment>
      <S.Container>
        <UploadHeader
          onSubmitBtnClick={handleSubmitBtnClick}
          disabled={isLoading}
        />
        <S.Wrapper>
          <S.Box>
            <S.Main>
              <Outlet context={{ data, dispatch }} />
            </S.Main>
          </S.Box>
        </S.Wrapper>
      </S.Container>
      <ToastContainer />
    </Fragment>
  );
}
