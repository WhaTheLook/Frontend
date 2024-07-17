import { AlertIcon } from "@/components/Icons/AlertIcon";

import * as S from "./style";

interface Props {
  message: string;
}

export function ErrorMessage({ message }: Props) {
  return (
    <S.Container>
      <AlertIcon size={14} color="#d11f1f" /> <S.Text>{message}</S.Text>
    </S.Container>
  );
}
