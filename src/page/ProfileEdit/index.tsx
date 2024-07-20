import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";

import { ImageInput } from "@/components/ProfileEdit/ImageInput";
import { UploadHeader } from "@/components/common/UploadHeader";
import { InputLabel } from "@/components/ProfileEdit/InputLabel";

import { ProfileEditType, ProfileFormValues } from "@/types";

import * as S from "./style";

export function ProfileEdit() {
  const { register, handleSubmit, setValue } = useForm<ProfileFormValues>();
  const inputSubmitRef = useRef<HTMLInputElement | null>(null);

  const location = useLocation();

  const {
    user: { name, profile_image },
  } = location.state as ProfileEditType;

  const handleHeaderBtnClick = () => {
    if (inputSubmitRef.current) {
      inputSubmitRef.current.click();
    }
  };

  const onSubmit: SubmitHandler<ProfileFormValues> = (data) => {
    // Todo: POST 요청
  };

  useEffect(() => {
    setValue("profileName", name);
  }, [name, setValue]);

  return (
    <S.Container>
      <UploadHeader onSubmitBtnClick={handleHeaderBtnClick} />
      <S.Wrapper>
        <S.Box>
          <S.Main>
            <S.Form onSubmit={handleSubmit(onSubmit)}>
              <ImageInput
                profileImage={profile_image}
                type="file"
                accept="image/*"
                setValue={setValue}
                {...register("profileImage")}
              />
              <InputLabel
                label="이름"
                type="text"
                placeholder="이름을 입력해주세요"
                maxLength={20}
                {...register("profileName", {
                  required: true,
                  maxLength: 20,
                })}
              />
              <S.SubmitButton type="submit" ref={inputSubmitRef} />
            </S.Form>
          </S.Main>
        </S.Box>
      </S.Wrapper>
    </S.Container>
  );
}
