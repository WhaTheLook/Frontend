import { ImageIcon } from "@/components/Icons/ImageIcon";
import { HeartIcon } from "@/components/Icons/HeartIcon";

import { calculateDaysAgo } from "@/utils";
import { PostListContentType } from "@/types";
import { ICON_SIZE } from "@/constants/style";

import * as S from "./style";

interface Props {
  data: PostListContentType;
  onItemClick: () => void;
}

export function GridItem({ data, onItemClick }: Props) {
  const { title, photoUrls, author, date, likeCount } = data;
  return (
    <S.Container onClick={onItemClick}>
      <S.PostImage src={photoUrls[0]} alt={`${title}_${author.kakaoId}`} />
      <S.InfoWrapper>
        <S.ImageCount>
          <ImageIcon size={18} color="#FFFFFF" />
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
          <HeartIcon size={ICON_SIZE.SMALL} color="#FFFFFF" />
          <S.HeartCount>{likeCount}</S.HeartCount>
        </S.SubInfoBox>
      </S.InfoWrapper>
    </S.Container>
  );
}
