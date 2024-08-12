import { ChangeEvent, memo, useCallback, useRef } from "react";
import { v4 as uuidv4 } from "uuid";

import { ErrorMessage } from "@/components/common/ErrorMessage";
import { ImageDragDrop } from "../ImageDragDrop";

import { ALERT_MESSAGE, IMAGE_UPLOAD_MAX_COUNT } from "@/constants";
import { ImageUploadType } from "@/types";

import * as S from "./style";

interface Props {
  images: ImageUploadType[];
  dispatcher: (args: ImageUploadType[]) => void;
  error: boolean;
}

export const ImageInput = memo(function ImageInput({
  images,
  dispatcher,
  error,
}: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleDeleteBtnClick = useCallback(
    (imageId: string) => {
      const filteredImages = [...images].filter(({ id }) => id !== imageId);
      dispatcher(filteredImages);
    },
    [dispatcher, images]
  );

  const handleUploadImages = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { files } = target;
    if (!files) return;

    const fileArray = Array.from(files).map((file) => ({ id: uuidv4(), file }));
    const totalFiles = images.length + fileArray.length;

    if (totalFiles > IMAGE_UPLOAD_MAX_COUNT) {
      alert(ALERT_MESSAGE.IMAGE_UPLOAD_COUNT_OVER);
      return;
    }

    const copyedImages = [...images, ...fileArray];
    dispatcher(copyedImages);

    target.value = ""; // 동일한 파일을 다시 선택 허용
  };

  const handleUploadBtnClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  return (
    <S.Container>
      <S.Wrapper>
        <S.UploadInput
          type="file"
          accept="image/*"
          multiple
          ref={inputRef}
          onChange={handleUploadImages}
        />
        <S.UploadButton onClick={handleUploadBtnClick}>
          <S.ButtonText>사진추가</S.ButtonText>
          <S.ButtonText>{images.length}/5</S.ButtonText>
        </S.UploadButton>
        <ImageDragDrop
          images={images}
          dispatcher={dispatcher}
          handleDeleteBtnClick={handleDeleteBtnClick}
        />
      </S.Wrapper>
      {error && <ErrorMessage message="사진 1개 이상 업로드해주세요." />}
    </S.Container>
  );
});
