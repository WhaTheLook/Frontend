import { useEffect, useRef, useState } from "react";

import { NextArrowIcon } from "@/components/Icons/NextArrowIcon";
import { PrevArrowIcon } from "@/components/Icons/PrevArrowIcon";

import { ICON_SIZE } from "@/constants/style";

import { useDetailContext } from "@/hooks/useDetailContext";

import * as S from "./style";

export function ImageWrapper() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slideRef = useRef<HTMLDivElement | null>(null);

  const { data } = useDetailContext();
  const { photoUrls: images } = data;

  const goNextImage = () => {
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goPriviousImage = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goSpecificImage = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (slideRef.current) {
      slideRef.current.style.transition = "all 0.4s ease-in-out";
      slideRef.current.style.transform = `translateX(-${currentIndex * 100}%)`;
    }
  }, [currentIndex]);

  const imagesOrderArray = Array.from(
    { length: images.length },
    (_, idx) => idx
  );

  const isNotLastImage = (images: string[], currentIndex: number) => {
    return images.length > 1 && currentIndex !== images.length - 1;
  };

  const isNotFirstImage = (images: string[], currentIndex: number) => {
    return images.length > 1 && currentIndex !== 0;
  };

  const hasOnlyOneImage = (images: string[]) => {
    return images.length === 1;
  };

  return (
    <S.Container>
      <S.Wrapper ref={slideRef}>
        {images.map((imageUrl) => (
          <S.ItemImage key={imageUrl} src={imageUrl} />
        ))}
      </S.Wrapper>
      {isNotLastImage(images, currentIndex) && (
        <S.NextButton onClick={goNextImage}>
          <NextArrowIcon size={ICON_SIZE.SMALL} color="#000000" />
        </S.NextButton>
      )}
      {isNotFirstImage(images, currentIndex) && (
        <S.PrevButton onClick={goPriviousImage}>
          <PrevArrowIcon size={ICON_SIZE.SMALL} color="#000000" />
        </S.PrevButton>
      )}
      {!hasOnlyOneImage(images) && (
        <S.OrderBox>
          {imagesOrderArray.map((value, index) => (
            <S.Order
              key={value}
              $isCurrent={value === currentIndex}
              onClick={() => goSpecificImage(index)}
            />
          ))}
        </S.OrderBox>
      )}
    </S.Container>
  );
}
