import * as S from "./style";

interface Props {
  text: string;
  htmlFor: string;
}

export function Label({ text, htmlFor }: Props) {
  return <S.Label htmlFor={htmlFor}>{text}</S.Label>;
}
