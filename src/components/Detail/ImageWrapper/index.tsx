import { useEffect, useRef, useState } from "react";

import { NextArrowIcon } from "@/components/Icons/NextArrowIcon";
import { PrevArrowIcon } from "@/components/Icons/PrevArrowIcon";

import * as S from "./style";

interface Props {
  images: string[];
}

export function ImageWrapper({ images }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slideRef = useRef<HTMLDivElement | null>(null);

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

  return (
    <S.Container>
      <S.Wrapper ref={slideRef}>
        {images.map((imageUrl) => (
          <S.ItemImage key={imageUrl} src={imageUrl} />
        ))}
      </S.Wrapper>
      {images.length !== 1 && currentIndex !== images.length - 1 && (
        <S.NextButton onClick={goNextImage}>
          <NextArrowIcon size={20} color="#000000" />
        </S.NextButton>
      )}
      {images.length !== 1 && currentIndex !== 0 && (
        <S.PrevButton onClick={goPriviousImage}>
          <PrevArrowIcon size={20} color="#000000" />
        </S.PrevButton>
      )}
      <S.OrderBox>
        {imagesOrderArray.map((value, index) => (
          <S.Order
            key={value}
            $isCurrent={value === currentIndex}
            onClick={() => goSpecificImage(index)}
          />
        ))}
      </S.OrderBox>
    </S.Container>
  );
}
