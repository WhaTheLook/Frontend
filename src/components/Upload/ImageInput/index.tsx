import { ChangeEvent, memo, useRef } from "react";
import { v4 as uuidv4 } from "uuid";

import { XCircleIcon } from "@/components/Icons/XCircleIcon";

import { ImageUploadType } from "@/types";

import * as S from "./style";

interface Props {
  images: ImageUploadType[];
  dispatcher: (args: ImageUploadType[]) => void;
}

export const ImageInput = memo(function ImageInput({
  images,
  dispatcher,
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

    if (totalFiles > 5) {
      alert("이미지 최대 5개까지 업로드 가능해요.");
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
    </S.Container>
  );
});
