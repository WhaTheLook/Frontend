import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";

import { ImageInput } from "@/components/ProfileEdit/ImageInput";
import { UploadHeader } from "@/components/common/UploadHeader";
import { InputLabel } from "@/components/ProfileEdit/InputLabel";

import { ProfileEditType, ProfileFormValues } from "@/types";
import { MAX_LENGTH_USER_NAME } from "@/constants";

import * as S from "./style";

export function ProfileEdit() {
  const location = useLocation();
  const {
    user: { name, profile_image },
  } = location.state as ProfileEditType;

  const { register, handleSubmit, setValue, control } =
    useForm<ProfileFormValues>();
  const inputSubmitRef = useRef<HTMLInputElement | null>(null);

  const handleHeaderBtnClick = () => {
    if (inputSubmitRef.current) {
      inputSubmitRef.current.click();
    }
  };

  const onSubmit: SubmitHandler<ProfileFormValues> = (data) => {
    // Todo: POST 요청
  };

  useEffect(() => {
    // fetch된 데이터 가져오기 (이미지 URL, 이름)
    // setValue("profileImage", fetchedImage)
    setValue("profileName", name);
  }, [setValue, name]);

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
                maxLength={MAX_LENGTH_USER_NAME}
                {...register("profileName", {
                  required: true,
                  maxLength: MAX_LENGTH_USER_NAME,
                })}
                control={control}
                setValue={setValue}
              />
              <S.SubmitButton type="submit" ref={inputSubmitRef} />
            </S.Form>
          </S.Main>
        </S.Box>
      </S.Wrapper>
    </S.Container>
  );
}
