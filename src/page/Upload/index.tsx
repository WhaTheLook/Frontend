import { useCallback } from "react";
import { useOutletContext } from "react-router-dom";

import { ImageInput } from "@/components/Upload/ImageInput";
import { TitleInput } from "@/components/Upload/TitleInput";
import { TagInput } from "@/components/Upload/TagInput";
import { DescriptionInput } from "@/components/Upload/DescriptionInput";

import { ImageUploadType, UploadLayoutContextProps } from "@/types";

import * as S from "./style";

export function Upload() {
  const { data, dispatch } = useOutletContext<UploadLayoutContextProps>();
  const { images, title, description, tags } = data;

  const handleSetImages = useCallback(
    (newImages: ImageUploadType[]) => {
      dispatch({ type: "IMAGES", payload: newImages });
    },
    [dispatch]
  );

  const handleSetTitle = useCallback(
    (newTitle: string) => {
      dispatch({ type: "TITLE", payload: newTitle });
    },
    [dispatch]
  );

  const handleSetDescription = useCallback(
    (newDescription: string) => {
      dispatch({ type: "DESCRITPTION", payload: newDescription });
    },
    [dispatch]
  );

  const handleSetTags = useCallback(
    (newTags: string[]) => {
      dispatch({ type: "TAGS", payload: newTags });
    },
    [dispatch]
  );

  return (
    <S.Container>
      <ImageInput images={images} dispatcher={handleSetImages} />
      <TitleInput title={title} dispatcher={handleSetTitle} />
      <DescriptionInput
        description={description}
        dispatcher={handleSetDescription}
      />
      <TagInput tags={tags} dispatcher={handleSetTags} />
    </S.Container>
  );
}
