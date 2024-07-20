import { forwardRef, HTMLProps } from "react";

import * as S from "./style";

interface Props extends HTMLProps<HTMLInputElement> {
  label: string;
}

export const InputLabel = forwardRef<HTMLInputElement, Props>(
  ({ label, ...rest }, ref) => {
    return (
      <S.Container>
        <S.Label htmlFor={label}>{label}</S.Label>
        <S.Input id={label} ref={ref} {...rest} />
      </S.Container>
    );
  }
);
