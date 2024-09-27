import { ImageIcon } from "@/components/Icons/ImageIcon";
import { HeartIcon } from "@/components/Icons/HeartIcon";

import { calculateDaysAgo } from "@/utils";
import { PostListContentType } from "@/types";
import { ICON_SIZE } from "@/constants/style";

import * as S from "./style";
import { useResizeWindow } from "@/hooks/useResizeWindow";
import { Breakpoints } from "@/styles/media";

interface Props {
  data: PostListContentType;
  onItemClick: () => void;
}

export function GridItem({ data, onItemClick }: Props) {
  const { title, photoUrls, author, date, likeCount } = data;
  const { breakPoint } = useResizeWindow();

  const IconSize = (breakPoint: Breakpoints) => {
    switch (breakPoint) {
      case "small":
        return ICON_SIZE.TINY;
      default:
        return ICON_SIZE.SMALL;
    }
  };

  return (
    <S.Container onClick={onItemClick}>
      <S.PostImage src={photoUrls[0]} alt={`${title}_${author.kakaoId}`} />
      <S.InfoWrapper>
        <S.ImageCount>
          <ImageIcon size={IconSize(breakPoint)} color="#FFFFFF" />
          <S.ImageCountSpan>{photoUrls.length}</S.ImageCountSpan>
        </S.ImageCount>
        <S.InfoBox>
          <S.Title>{title}</S.Title>
          <S.InfoTextBox>
            <S.Writter>{author.name}</S.Writter> ·{" "}
            <S.Date>{calculateDaysAgo(date)}</S.Date>
          </S.InfoTextBox>
        </S.InfoBox>
        <S.SubInfoBox>
          <HeartIcon size={IconSize(breakPoint)} color="#FFFFFF" />
          <S.HeartCount>{likeCount}</S.HeartCount>
        </S.SubInfoBox>
      </S.InfoWrapper>
    </S.Container>
  );
}
