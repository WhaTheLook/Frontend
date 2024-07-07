import * as S from "./style";

const SORT_TABS = [
  { id: 1, text: "최신순" },
  { id: 2, text: "인기순" },
];

interface Props {
  sortType: number;
  onSortTypeClick: (id: number) => void;
}

export function SortTab({ sortType, onSortTypeClick }: Props) {
  return (
    <S.Container>
      <S.Wrapper>
        <S.ButtonBox>
          {SORT_TABS.map(({ id, text }) => {
            const isSelected = id === sortType;
            return (
              <S.Button
                key={id}
                $isSelected={isSelected}
                onClick={() => onSortTypeClick(id)}
              >
                {text}
              </S.Button>
            );
          })}
        </S.ButtonBox>
      </S.Wrapper>
    </S.Container>
  );
}
