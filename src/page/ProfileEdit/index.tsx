import { Fragment, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSelector } from "react-redux";

import { ImageInput } from "@/components/ProfileEdit/ImageInput";
import { UploadHeader } from "@/components/common/UploadHeader";
import { InputLabel } from "@/components/ProfileEdit/InputLabel";
import { ModalPortal } from "@/components/common/ModalPortal";
import { PopupModal } from "@/components/common/PopupModal";
import { ToastContainer } from "@/components/common/ToastContainer";

import { ProfileFormValues, UserInfoType } from "@/types";
import {
  API_PATH,
  MAX_LENGTH_USER_NAME,
  modalLocationType,
  modalType,
  TOAST_MESSAGE,
  toastType,
} from "@/constants";

import { useModalContext } from "@/hooks/useModalContext";
import { useAuthMutation } from "@/hooks/useAuthMutation";
import { useToastContext } from "@/hooks/useToastContex";

import { selectCurrentUser } from "@/store/slice/authSlice";

import * as S from "./style";

export function ProfileEdit() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const inputSubmitRef = useRef<HTMLInputElement | null>(null);
  const userInfo = useSelector(selectCurrentUser) as UserInfoType;

  const { register, handleSubmit, setValue, control, watch } =
    useForm<ProfileFormValues>();
  const [newName, newProfileImage] = [
    watch("profileName"),
    watch("profileImage"),
  ];

  const { handleOpen, modalLocation } = useModalContext();
  const { handleToastOpen } = useToastContext();
  const { fetcher } = useAuthMutation({
    url: API_PATH.updateUserInfo(),
    method: "PUT",
    body: getFormData(newName, newProfileImage),
    isFormData: true,
  });

  const isProfileEditModalOpen = () => {
    return modalLocation === modalLocationType.PROFILE_EDIT;
  };

  const handleAccountDelete = () => {
    handleOpen(modalLocationType.PROFILE_EDIT);
  };

  const handleHeaderBtnClick = () => {
    if (inputSubmitRef.current) {
      inputSubmitRef.current.click();
    }
  };

  function getFormData(name: string, image: File) {
    const formData = new FormData();
    const userRequestData = new Blob(
      [
        JSON.stringify({
          kakaoId: userInfo.kakaoId,
          name,
        }),
      ],
      { type: "application/json" }
    );
    formData.append("userRequest", userRequestData);
    formData.append("profileImage", image);

    return formData;
  }

  const showErrorToast = (message: string) => {
    handleToastOpen({
      type: toastType.ERROR,
      content: message,
    });
  };

  const onSubmit: SubmitHandler<ProfileFormValues> = async () => {
    try {
      setIsLoading(true);
      await fetcher();

      // TO DO: 회원 정보 수정 후 회원 정보 상태 수정
      // TO DO: 기존이미지 파일 변환 과정에서 CORS에러 발생
      navigate("/profile");
    } catch (error) {
      showErrorToast(TOAST_MESSAGE.failUpdateUserInfo());
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // fetch된 데이터 가져오기 (이미지 URL, 이름)
    // setValue("profileImage", fetchedImage)
    setValue("profileName", userInfo.name);
  }, [setValue, userInfo]);

  return (
    <Fragment>
      <S.Container>
        <UploadHeader
          onSubmitBtnClick={handleHeaderBtnClick}
          disabled={isLoading}
        />
        <S.Wrapper>
          <S.Box>
            <S.Main>
              <S.Form onSubmit={handleSubmit(onSubmit)}>
                <ImageInput
                  profileImage={userInfo.profileImage}
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
              <S.AccountDeleteDiv onClick={handleAccountDelete}>
                <S.AccountDeleteText>계정 삭제</S.AccountDeleteText>
              </S.AccountDeleteDiv>
            </S.Main>
          </S.Box>
        </S.Wrapper>
      </S.Container>
      {isProfileEditModalOpen() && (
        <ModalPortal>
          <PopupModal type={modalType.DELETE_ACCOUNT} />
        </ModalPortal>
      )}
      <ToastContainer />
    </Fragment>
  );
}
