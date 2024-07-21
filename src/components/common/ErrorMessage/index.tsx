import { AlertIcon } from "@/components/Icons/AlertIcon";

import { ICON_SIZE } from "@/constants/style";

import * as S from "./style";

interface Props {
  message: string;
}

export function ErrorMessage({ message }: Props) {
  return (
    <S.Container>
      <AlertIcon size={ICON_SIZE.TINY} color="#d11f1f" />{" "}
      <S.Text>{message}</S.Text>
    </S.Container>
  );
}
