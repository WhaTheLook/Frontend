import { forwardRef, HTMLProps, useEffect } from "react";
import { useSelector } from "react-redux";
import { Control, UseFormSetValue, useWatch } from "react-hook-form";

import { MAX_LENGTH_USER_NAME } from "@/constants";
import { ProfileFormValues, UserInfoType } from "@/types";

import { selectCurrentUser } from "@/store/slice/authSlice";

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

    const userInfo = useSelector(selectCurrentUser) as UserInfoType;

    useEffect(() => {
      setValue("profileName", inputValue?.slice(0, MAX_LENGTH_USER_NAME));
    }, [setValue, inputValue]);

    useEffect(() => {
      setValue("profileName", userInfo.name);
    }, [setValue, userInfo]);

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
