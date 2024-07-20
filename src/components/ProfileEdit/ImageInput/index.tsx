import {
  ChangeEvent,
  forwardRef,
  HTMLProps,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { UseFormSetValue } from "react-hook-form";

import UserIcon from "@/assets/imgs/user-icon.png";
import { PlusIcon } from "@/components/Icons/PlusIcon";

import { useConvertImgToFile } from "@/hooks/useConvertImgToFile";

import { getImageURL } from "@/utils";
import { ProfileFormValues } from "@/types";

import * as S from "./style";

interface Props extends HTMLProps<HTMLInputElement> {
  profileImage: string;
  setValue: UseFormSetValue<ProfileFormValues>;
}

export const ImageInput = forwardRef<HTMLInputElement, Props>(
  ({ profileImage, setValue, ...rest }, ref) => {
    const [imageFile, setImageFile] = useState(profileImage);
    const [menuVisible, setMenuVisible] = useState(false);

    const uploadBoxRef = useRef<HTMLDivElement | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const menuRef = useRef<HTMLDivElement | null>(null);

    const defaultProfileImgFile = useConvertImgToFile(
      UserIcon,
      "user-icon.png"
    );
    const initProfileImgFile = useConvertImgToFile(
      profileImage,
      "initProfile.png"
    );

    const handleToggle = () => setMenuVisible(!menuVisible);

    const handleImageUpdate = (imageFile: File) => {
      setImageFile(getImageURL(imageFile));
      setValue("profileImage", imageFile);
      setMenuVisible(false);
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

    const isClickOutside = (target: EventTarget | null) => {
      return (
        !menuRef.current?.contains(target as Node) &&
        !uploadBoxRef.current?.contains(target as Node)
      );
    };

    const handleClickOutside = useCallback(({ target }: MouseEvent) => {
      if (isClickOutside(target)) {
        setMenuVisible(false);
      }
    }, []);

    useImperativeHandle(ref, () => inputRef.current!);

    useEffect(() => {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [handleClickOutside]);

    useEffect(() => {
      setValue("profileImage", initProfileImgFile!);
    }, [initProfileImgFile, setValue]);

    return (
      <S.Container>
        <S.UploadInput ref={inputRef} {...rest} onChange={handleUploadImage} />
        <S.UploadBox
          ref={uploadBoxRef}
          $previewImage={imageFile}
          onClick={handleToggle}
        >
          <S.Icon>
            <PlusIcon size={20} color="#FFFFFF" />
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
