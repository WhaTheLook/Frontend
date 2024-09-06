import {
  ChangeEvent,
  forwardRef,
  HTMLProps,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { UseFormSetValue } from "react-hook-form";

import UserIcon from "@/assets/imgs/user-icon.png";
import { PlusIcon } from "@/components/Icons/PlusIcon";

import { getImageURL } from "@/utils";
import { ProfileFormValues } from "@/types";
import { ICON_SIZE } from "@/constants/style";

import { useConvertImgToFile } from "@/hooks/useConvertImgToFile";
import { useMenuToggle } from "@/hooks/useMenuToggle";

import * as S from "./style";

interface Props extends HTMLProps<HTMLInputElement> {
  profileImageURL: string;
  setValue: UseFormSetValue<ProfileFormValues>;
}

export const ImageInput = forwardRef<HTMLInputElement, Props>(
  ({ profileImageURL, setValue, ...rest }, ref) => {
    const [imageURL, setImageURL] = useState(profileImageURL);

    const inputRef = useRef<HTMLInputElement | null>(null);

    const { menuVisible, handleToggle, menuRef, triggerRef, hideMenu } =
      useMenuToggle<HTMLDivElement>();

    const defaultProfileImgFile = useConvertImgToFile(
      UserIcon,
      "user-icon.png"
    );
    const initProfileImgFile = useConvertImgToFile(
      profileImageURL,
      "initProfile.png"
    );

    const handleImageUpdate = (imageFile: File) => {
      setImageURL(getImageURL(imageFile));
      setValue("profileImageFile", imageFile);
      hideMenu();
    };

    const handleUploadImage = ({ target }: ChangeEvent<HTMLInputElement>) => {
      const { files } = target;
      if (!files) return;

      handleImageUpdate(files[0]);
    };

    const handleDefaultImageBtnClick = () => {
      if (defaultProfileImgFile) {
        handleImageUpdate(defaultProfileImgFile);
      }
    };

    const handleUploadBtnClick = () => {
      if (inputRef.current) {
        inputRef.current.click();
      }
      handleToggle();
    };

    useImperativeHandle(ref, () => inputRef.current!);

    useEffect(() => {
      setValue("profileImageFile", initProfileImgFile!);
    }, [initProfileImgFile, setValue]);

    return (
      <S.Container>
        <S.UploadInput ref={inputRef} {...rest} onChange={handleUploadImage} />
        <S.UploadBox ref={triggerRef} onClick={handleToggle}>
          <S.ProfileImage src={imageURL} />
          <S.Icon>
            <PlusIcon size={ICON_SIZE.SMALL} color="#FFFFFF" />
          </S.Icon>
        </S.UploadBox>
        {menuVisible && (
          <S.Menu ref={menuRef}>
            <S.MenuButton onClick={handleDefaultImageBtnClick}>
              기본 프로필 사용
            </S.MenuButton>
            <S.MenuButton onClick={handleUploadBtnClick}>
              이미지 업로드하기
            </S.MenuButton>
          </S.Menu>
        )}
      </S.Container>
    );
  }
);
