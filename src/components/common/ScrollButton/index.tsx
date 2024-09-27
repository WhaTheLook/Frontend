import { useEffect, useRef, useState } from "react";

import { UpArrowIcon } from "@/components/Icons/UpArrowIcon";

import { useResizeWindow } from "@/hooks/useResizeWindow";

import { ICON_SIZE } from "@/constants/style";

import * as S from "./style";

export function ScrollButton() {
  const [showButton, setShowButton] = useState(false);
  const lastScrollY = useRef<number>(0);

  const { breakPoint } = useResizeWindow();

  const handleClick = () => {
    const element = document.querySelector("body");
    element?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const getIconSize = () => {
    switch (breakPoint) {
      case "mobile":
        return ICON_SIZE.MEDIUM_LARGE;
      default:
        return ICON_SIZE.LARGE;
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY >= 0 && currentScrollY <= 150) {
        setShowButton(false);
      } else {
        setShowButton(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    showButton && (
      <S.Container onClick={handleClick}>
        <UpArrowIcon size={getIconSize()} color="#FFF" />
      </S.Container>
    )
  );
}
