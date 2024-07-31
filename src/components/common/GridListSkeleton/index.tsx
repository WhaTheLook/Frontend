import * as S from "./style";

interface Props {
  count: number;
}

export function GridListSkeleton({ count }: Props) {
  const totalCount = Array.from({ length: count }, (_, idx) => idx);
  return (
    <S.Container>
      {totalCount.map((element) => (
        <S.GridItemSkeleton key={element} />
      ))}
    </S.Container>
  );
}
