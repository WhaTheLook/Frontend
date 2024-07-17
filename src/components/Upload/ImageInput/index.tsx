import { ChangeEvent, memo, useRef } from "react";
import { v4 as uuidv4 } from "uuid";

import { XCircleIcon } from "@/components/Icons/XCircleIcon";
import { ErrorMessage } from "@/components/common/ErrorMessage";

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

  const handleDeleteBtnClick = (imageId: string) => {
    const filteredImages = [...images].filter(({ id }) => id !== imageId);
    dispatcher(filteredImages);
  };

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
        {images.map(({ id, file }) => (
          <S.SamleImage key={id} $imageUrl={URL.createObjectURL(file)}>
            <S.DeleteButton onClick={() => handleDeleteBtnClick(id)}>
              <XCircleIcon size={25} color="#FFF" />
            </S.DeleteButton>
          </S.SamleImage>
        ))}
      </S.Wrapper>
      {error && <ErrorMessage message="사진 1개 이상 업로드해주세요." />}
    </S.Container>
  );
});
