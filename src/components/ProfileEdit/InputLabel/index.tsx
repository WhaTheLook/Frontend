import { forwardRef, HTMLProps, useEffect } from "react";
import { Control, UseFormSetValue, useWatch } from "react-hook-form";

import { MAX_LENGTH_USER_NAME } from "@/constants";
import { ProfileFormValues } from "@/types";

import * as S from "./style";

interface Props extends HTMLProps<HTMLInputElement> {
  label: string;
  control: Control<ProfileFormValues>;
  setValue: UseFormSetValue<ProfileFormValues>;
}

export const InputLabel = forwardRef<HTMLInputElement, Props>(
  ({ label, control, setValue, ...rest }, ref) => {
    const inputValue = useWatch({
      control,
      name: "profileName",
    });

    useEffect(() => {
      setValue("profileName", inputValue?.slice(0, MAX_LENGTH_USER_NAME));
    }, [setValue, inputValue]);

    return (
      <S.Container>
        <S.LabelBox>
          <S.Label htmlFor={label}>{label}</S.Label>
          <S.InfoText>
            {inputValue?.length}/{MAX_LENGTH_USER_NAME} (필수)
          </S.InfoText>
        </S.LabelBox>
        <S.Input id={label} ref={ref} {...rest} />
      </S.Container>
    );
  }
);
