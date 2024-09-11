import { Fragment, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";

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

import { useModalContext } from "@/hooks/contexts/useModalContext";
import { useToastContext } from "@/hooks/contexts/useToastContex";
import { useAuthMutation } from "@/hooks/mutation/useAuthMutation";

import { selectCurrentUser, updateAuthInfo } from "@/store/slice/authSlice";

import * as S from "./style";

export function ProfileEdit() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const inputSubmitRef = useRef<HTMLInputElement | null>(null);
  const userInfo = useSelector(selectCurrentUser) as UserInfoType;

  const { register, handleSubmit, setValue, control, watch } =
    useForm<ProfileFormValues>();
  const [newName, newProfileImage] = [
    watch("profileName"),
    watch("profileImageFile"),
  ];

  const { handleOpen, modalLocation } = useModalContext();
  const { handleToastOpen } = useToastContext();

  const { isPending, mutate } = useAuthMutation<UserInfoType>({
    url: API_PATH.updateUserInfo(),
    method: "PUT",
    isFormData: true,
    hasReturnType: true,
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
      [JSON.stringify({ kakaoId: userInfo.kakaoId, name })],
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
    mutate(getFormData(newName, newProfileImage), {
      onSuccess: (result) => {
        dispatch(updateAuthInfo({ user: result! }));
        navigate("/profile");
      },
      onError: () => {
        showErrorToast(TOAST_MESSAGE.failUpdateUserInfo());
      },
    });
  };

  return (
    <Fragment>
      <S.Container>
        <UploadHeader
          onSubmitBtnClick={handleHeaderBtnClick}
          disabled={isPending}
        />
        <S.Wrapper>
          <S.Box>
            <S.Main>
              <S.Form onSubmit={handleSubmit(onSubmit)}>
                <ImageInput
                  profileImageURL={userInfo.profileImage}
                  type="file"
                  accept="image/*"
                  setValue={setValue}
                  {...register("profileImageFile")}
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
