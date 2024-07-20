import { SORT_LIST } from "@/constants";

import * as S from "./style";

interface Props {
  sortType: number;
  onSortTypeClick: (id: number) => void;
}

export function SortTab({ sortType, onSortTypeClick }: Props) {
  return (
    <S.Container>
      <S.Wrapper>
        <S.ButtonBox>
          {SORT_LIST.map(({ id, text }) => {
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
