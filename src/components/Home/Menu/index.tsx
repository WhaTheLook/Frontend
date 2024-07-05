import * as S from "./style";

const menuList = [
  { id: 1, text: "알려주세요" },
  { id: 2, text: "알려줄게요" },
];

interface Props {
  currentMenu: number;
  onMenuClick: (id: number) => void;
}

export function Menu({ currentMenu, onMenuClick }: Props) {
  return (
    <S.Container>
      {menuList.map(({ id, text }) => {
        const isSelected = id === currentMenu;
        return (
          <S.Box
            key={id}
            $isSelected={isSelected}
            onClick={() => onMenuClick(id)}
          >
            <S.Text $isSelected={isSelected}>{text}</S.Text>
          </S.Box>
        );
      })}
    </S.Container>
  );
}
