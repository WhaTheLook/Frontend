import * as S from "./style";

interface Props {
  color: string;
  isNoPadding: boolean;
}

export function LoadingSpinner({ color, isNoPadding = false }: Props) {
  return (
    <S.Container $isNoPadding={isNoPadding}>
      <S.Box color={color} />
    </S.Container>
  );
}
