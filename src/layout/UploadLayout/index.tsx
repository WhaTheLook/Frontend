import { Fragment, useEffect, useReducer } from "react";
import { useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import { ToastContainer } from "@/components/common/ToastContainer";
import { UploadHeader } from "@/components/common/UploadHeader";

import {
  PostDetailInfoType,
  postTypeType,
  UploadAction,
  UploadDataType,
  UploadErrorKeys,
} from "@/types";
import {
  PathnameType,
  TOAST_MESSAGE,
  toastType,
  UploadActionType,
} from "@/constants";
import { urlToFile } from "@/utils";

import { useToastContext } from "@/hooks/contexts/useToastContex";

import { selectCurrentUser } from "@/store/slice/authSlice";

import { useCreatePostMutation } from "@/mutations/useCreatePostMutation";
import { useUpdatePostMutation } from "@/mutations/useUpdatePostMutation";

import * as S from "./style";

const initState: UploadDataType = {
  postType: { data: null, validation: false },
  images: { data: [], validation: false },
  title: { data: "", validation: false },
  description: { data: "", validation: false },
  tags: { data: [], validation: false },
};

function reducer(state: UploadDataType, action: UploadAction): UploadDataType {
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
    case "EDIT": {
      return {
        ...state,
        postType: { data: payload.postType, validation: false },
        images: { data: payload.images, validation: false },
        title: { data: payload.title, validation: false },
        description: { data: payload.description, validation: false },
        tags: { data: payload.tags, validation: false },
      };
    }
    default:
      return state;
  }
}

export function UploadLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;
  const postEditData = location.state as PostDetailInfoType | null;

  const user = useSelector(selectCurrentUser);
  const [data, dispatch] = useReducer(reducer, initState);
  const { postType, images, title, description, tags } = data;

  const { handleToastOpen } = useToastContext();

  const { isPending: createIsPending, mutate: createMutate } =
    useCreatePostMutation();
  const { isPending: updateIsPending, mutate: updateMutate } =
    useUpdatePostMutation();

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

  function createPostBlob(postData: object) {
    return new Blob([JSON.stringify(postData)], { type: "application/json" });
  }

  function getPostData(isEdit: boolean) {
    const baseData = {
      title: title.data.trim(),
      content: description.data.trim(),
      category: postType.data,
      hashtags: tags.data.map((tag) => `#${tag}`),
    };

    if (isEdit) {
      return {
        id: postEditData?.id,
        author: user?.kakaoId,
        ...baseData,
      };
    }

    return {
      kakaoId: user?.kakaoId,
      ...baseData,
    };
  }

  function getFormData() {
    const formData = new FormData();
    const isEdit = pathname === PathnameType.POST_EDIT;
    const postBlob = createPostBlob(getPostData(isEdit));

    formData.append(isEdit ? "postUpdateRequest" : "postRequest", postBlob);

    images.data
      .map((image) => image.file)
      .forEach((image) => formData.append("photos", image as File));

    return formData;
  }

  const hasError = (errorKeys: (keyof UploadDataType)[]) => {
    return errorKeys.length !== 0;
  };

  const showErrorToast = (message: string) => {
    handleToastOpen({
      type: toastType.ERROR,
      content: message,
    });
  };

  const handleSubmitBtnClick = async () => {
    const errorKeys = validateForm();
    if (hasError(errorKeys)) {
      dispatch({ type: UploadActionType.VALIDATE, payload: errorKeys });
      return;
    }

    switch (pathname) {
      case PathnameType.CREATE:
        createMutate(getFormData(), {
          onSuccess: () => {
            navigate("/profile");
          },
          onError: () => {
            showErrorToast(TOAST_MESSAGE.failCreatePost());
          },
        });
        break;
      case PathnameType.POST_EDIT:
        updateMutate(getFormData(), {
          onSuccess: () => {
            navigate("/profile");
          },
          onError: () => {
            showErrorToast(TOAST_MESSAGE.failUpdatePost());
          },
        });
        break;
    }
  };

  useEffect(() => {
    async function getImagesFormat(photoUrls: string[]) {
      const imageFilesPromises = photoUrls.map((url, index) =>
        urlToFile(url, String(index))
      );
      const imagesFiles = await Promise.all(imageFilesPromises).then(
        (values) => values
      );

      return imagesFiles.map((file) => {
        return { id: uuidv4(), file };
      });
    }

    async function processEditData() {
      if (pathname === PathnameType.CREATE) {
        dispatch({ type: UploadActionType.RESET, payload: null });
      } else if (pathname === PathnameType.POST_EDIT && postEditData) {
        const images = await getImagesFormat(postEditData.photoUrls);
        const editData = {
          postType: postEditData.category as postTypeType,
          images,
          title: postEditData.title,
          description: postEditData.content,
          tags: postEditData.hashtags.map((tag) => tag.slice(1)),
        };
        dispatch({ type: UploadActionType.EDIT, payload: editData });
      }
    }

    processEditData();
  }, [pathname, postEditData]);

  return (
    <Fragment>
      <S.Container>
        <UploadHeader
          onSubmitBtnClick={handleSubmitBtnClick}
          disabled={createIsPending || updateIsPending}
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
