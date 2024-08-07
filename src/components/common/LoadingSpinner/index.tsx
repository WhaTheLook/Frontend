import * as S from "./style";

interface Props {
  color: string;
}

export function LoadingSpinner({ color }: Props) {
  return (
    <S.Container>
      <S.Box color={color} />
    </S.Container>
  );
}
