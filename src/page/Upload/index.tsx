import { useCallback } from "react";
import { useOutletContext } from "react-router-dom";

import { PostTypeInput } from "@/components/Upload/PostTypeInput";
import { ImageInput } from "@/components/Upload/ImageInput";
import { TitleInput } from "@/components/Upload/TitleInput";
import { TagInput } from "@/components/Upload/TagInput";
import { DescriptionInput } from "@/components/Upload/DescriptionInput";

import {
  ImageUploadType,
  postTypeType,
  UploadLayoutContextProps,
} from "@/types";
import { UploadActionType } from "@/constants";

import * as S from "./style";

export function Upload() {
  const { data, dispatch } = useOutletContext<UploadLayoutContextProps>();
  const { postType, images, title, description, tags } = data;

  const handleSetPostType = useCallback(
    (newPostType: postTypeType) => {
      dispatch({ type: UploadActionType.POSTTYPE, payload: newPostType });
    },
    [dispatch]
  );

  const handleSetImages = useCallback(
    (newImages: ImageUploadType[]) => {
      dispatch({ type: UploadActionType.IMAGES, payload: newImages });
    },
    [dispatch]
  );

  const handleSetTitle = useCallback(
    (newTitle: string) => {
      dispatch({ type: UploadActionType.TITLE, payload: newTitle });
    },
    [dispatch]
  );

  const handleSetDescription = useCallback(
    (newDescription: string) => {
      dispatch({
        type: UploadActionType.DESCRITPTION,
        payload: newDescription,
      });
    },
    [dispatch]
  );

  const handleSetTags = useCallback(
    (newTags: string[]) => {
      dispatch({ type: UploadActionType.TAGS, payload: newTags });
    },
    [dispatch]
  );

  return (
    <S.Container>
      <PostTypeInput
        postType={postType.data}
        dispatcher={handleSetPostType}
        error={postType.validation}
      />
      <ImageInput
        images={images.data}
        dispatcher={handleSetImages}
        error={images.validation}
      />
      <TitleInput
        title={title.data}
        dispatcher={handleSetTitle}
        error={title.validation}
      />
      <DescriptionInput
        description={description.data}
        dispatcher={handleSetDescription}
        error={description.validation}
      />
      <TagInput
        tags={tags.data}
        dispatcher={handleSetTags}
        error={tags.validation}
      />
    </S.Container>
  );
}
