import { useEffect, useRef, useState } from "react";

import * as S from "./style";

const menuList = [
  { id: 0, text: "알려주세요" },
  { id: 1, text: "알려줄게요" },
];

interface Props {
  currentMenu: number;
  onMenuClick: (id: number) => void;
}

export function Menu({ currentMenu, onMenuClick }: Props) {
  const textRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [tabLineStyles, setTabLineStyles] = useState({
    width: 0,
    translateX: 0,
  });

  useEffect(() => {
    if (textRefs.current[currentMenu]) {
      const paddingOffset = 30;
      const selectedText = textRefs.current[currentMenu];
      const width = (selectedText?.offsetWidth || 0) + paddingOffset;
      const translateX = Array.from(textRefs.current)
        .slice(0, currentMenu)
        .reduce((acc, el) => acc + ((el?.offsetWidth || 0) + paddingOffset), 0);
      setTabLineStyles({ width, translateX });
    }
  }, [currentMenu]);

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
