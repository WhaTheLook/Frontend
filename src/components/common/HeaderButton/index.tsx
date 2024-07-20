import * as S from "./style";

interface Props {
  children: string;
  onClick: () => void;
}

export function HeaderButton({ children, onClick }: Props) {
  return <S.Container onClick={onClick}>{children}</S.Container>;
}
