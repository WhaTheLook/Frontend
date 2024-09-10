import { ChatIcon } from "@/components/Icons/ChatIcon";
import { LikeWrapper } from "../LikeWrapper";

import { ICON_SIZE } from "@/constants/style";

import { useDetailContext } from "@/hooks/contexts/useDetailContext";

import * as S from "./style";

export function SubInfoBox() {
  const { data } = useDetailContext();
  const { commentCount } = data;

  return (
    <S.Container>
      <S.IconBox>
        <S.Icons>
          <LikeWrapper />
        </S.Icons>
        <S.Icons>
          <ChatIcon size={ICON_SIZE.MEDIUM_SMALL} color="#000000" />
          <S.IconInfoText>{commentCount}</S.IconInfoText>
        </S.Icons>
      </S.IconBox>
    </S.Container>
  );
}
