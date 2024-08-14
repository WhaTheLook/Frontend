import { memo, useCallback, useEffect, useState } from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";

import { XCircleIcon } from "@/components/Icons/XCircleIcon";

import { ICON_SIZE } from "@/constants/style";
import { ImageUploadType } from "@/types";

import * as S from "./style";

interface Props {
  images: ImageUploadType[];
  dispatcher: (args: ImageUploadType[]) => void;
  handleDeleteBtnClick: (imageId: string) => void;
}

export const ImageDragDrop = memo(function ImageDragDrop({
  images,
  dispatcher,
  handleDeleteBtnClick,
}: Props) {
  const [imageUrls, setImageUrls] = useState<{ [key: string]: string }>({});

  const moveImages = (
    arr: ImageUploadType[],
    fromIndex: number,
    toIndex: number
  ) => {
    const newArr = [...arr];
    const [movedItem] = newArr.splice(fromIndex, 1);
    newArr.splice(toIndex, 0, movedItem);

    return newArr;
  };

  const handleDragEnd = useCallback(
    (result: DropResult) => {
      const { destination, source } = result;
      const destIndex = destination?.index;
      const startIndex = source.index;

      if (destIndex === undefined) return;
      dispatcher(moveImages(images, startIndex, destIndex));
    },
    [dispatcher, images]
  );

  useEffect(() => {
    const newUrls = images.reduce((acc, { id, file }) => {
      if (!imageUrls[id]) {
        // 새 이미지에 대해서만 URL 생성
        acc[id] = URL.createObjectURL(file);
      } else {
        // 이미 생성된 URL 재사용
        acc[id] = imageUrls[id];
      }
      return acc;
    }, {} as { [key: string]: string });

    setImageUrls(newUrls);

    return () => {
      const removedImages = Object.keys(imageUrls).filter((id) => !newUrls[id]);
      removedImages.forEach((id) => URL.revokeObjectURL(imageUrls[id])); // 사용하지 않는 URL 해제
    };
  }, [images]);

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="images" type="images" direction="horizontal">
        {(provided) => (
          <S.DragBox ref={provided.innerRef}>
            {images.map(({ id }, index) => {
              return (
                <Draggable key={id} draggableId={id} index={index}>
                  {(provided) => (
                    <S.SampleImage
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      $imageUrl={imageUrls[id]}
                    >
                      <S.DeleteButton onClick={() => handleDeleteBtnClick(id)}>
                        <XCircleIcon size={ICON_SIZE.MEDIUM} color="#FFF" />
                      </S.DeleteButton>
                      {index === 0 && (
                        <S.ThumnailBox>
                          <S.ThumnailText>대표 사진</S.ThumnailText>
                        </S.ThumnailBox>
                      )}
                    </S.SampleImage>
                  )}
                </Draggable>
              );
            })}
            {provided.placeholder}
          </S.DragBox>
        )}
      </Droppable>
    </DragDropContext>
  );
});
