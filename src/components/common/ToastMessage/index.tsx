import { CheckIcon } from "@/components/Icons/CheckIcon";
import { XIcon } from "@/components/Icons/XIcon";
import { ExclamationIcon } from "@/components/Icons/ExclamationIcon";

import { toastType } from "@/constants";
import { ICON_SIZE, TOAST_COLOR } from "@/constants/style";

import * as S from "./style";

interface Props {
  type: toastType;
  text: string;
}

export function ToastMessage({ type, text }: Props) {
  const iconProps = { size: ICON_SIZE.MEDIUM_TINY, color: "#FFF" };

  const state = (function () {
    switch (type) {
      case toastType.SUCCESS:
        return {
          color: TOAST_COLOR.SUCCESS.color,
          bgColor: TOAST_COLOR.SUCCESS.bgColor,
          icon: <CheckIcon {...iconProps} />,
        };
      case toastType.ERROR:
        return {
          color: TOAST_COLOR.ERROR.color,
          bgColor: TOAST_COLOR.ERROR.bgColor,
          icon: <XIcon {...iconProps} />,
        };
      case toastType.WARNING:
        return {
          color: TOAST_COLOR.WARNING.color,
          bgColor: TOAST_COLOR.WARNING.bgColor,
          icon: <ExclamationIcon {...iconProps} />,
        };
    }
  })();

  return (
    <S.Container $color={state.color} $bgColor={state.bgColor}>
      <S.IconBox $color={state.color}>{state.icon}</S.IconBox>
      <S.Text>{text}</S.Text>
    </S.Container>
  );
}
