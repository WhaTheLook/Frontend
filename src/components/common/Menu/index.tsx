import { useEffect, useRef, useState } from "react";

import { MenuListType } from "@/types";

import * as S from "./style";

interface Props {
  currentMenu: number;
  onMenuClick: (id: number) => void;
  menuList: MenuListType[];
}

export function Menu({ currentMenu, onMenuClick, menuList }: Props) {
  const textRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [tabLineStyles, setTabLineStyles] = useState({
    width: 0,
    translateX: 0,
  });

  const updateTabLineStyles = () => {
    if (textRefs.current[currentMenu]) {
      const paddingOffset = 30;
      const selectedText = textRefs.current[currentMenu];
      const width = (selectedText?.offsetWidth || 0) + paddingOffset;
      const translateX = Array.from(textRefs.current)
        .slice(0, currentMenu)
        .reduce((acc, el) => acc + ((el?.offsetWidth || 0) + paddingOffset), 0);
      setTabLineStyles({ width, translateX });
    }
  };

  useEffect(updateTabLineStyles, [currentMenu]);

  return (
    <S.Container>
      <S.Wrapper>
        {menuList.map(({ id, text }) => {
          const isSelected = id === currentMenu;
          return (
            <S.Box
              key={id}
              $isSelected={isSelected}
              onClick={() => onMenuClick(id)}
            >
              <S.Text
                ref={(el) => (textRefs.current[id] = el)}
                $isSelected={isSelected}
              >
                {text}
              </S.Text>
            </S.Box>
          );
        })}
        <S.TabLine
          width={tabLineStyles.width}
          offset={tabLineStyles.translateX}
        />
      </S.Wrapper>
    </S.Container>
  );
}
