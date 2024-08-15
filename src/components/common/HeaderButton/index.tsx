import * as S from "./style";

interface Props {
  children: string;
  disabled: boolean;
  onClick: () => void;
}

export function HeaderButton({ children, disabled, onClick }: Props) {
  return (
    <S.Container onClick={onClick} disabled={disabled}>
      {children}
    </S.Container>
  );
}
