import { useNavigate } from "react-router-dom";

import { HeartIcon } from "@/components/Icons/HeartIcon";
import { ChatIcon } from "@/components/Icons/ChatIcon";

import { calculateDaysAgo } from "@/utils";
import { PostListContentType } from "@/types";
import { ICON_SIZE } from "@/constants/style";

import * as S from "./style";

interface Props {
  data: PostListContentType;
  onItemClick: () => void;
}

export function FlatItem({ data, onItemClick }: Props) {
  const {
    title,
    content,
    hashtags,
    author,
    date,
    likeCount,
    commentCount,
    photoUrls,
  } = data;
  const navigate = useNavigate();

  const handleUserInfoClick = () => {
    navigate(`/profile/${author.kakaoId}`);
  };

  return (
    <S.Container>
      <S.TextWrapper>
        <S.TitleBox onClick={onItemClick}>
          <S.Title>{title}</S.Title>
          <S.Description>{content}</S.Description>
        </S.TitleBox>
        <S.TagsBox>
          {hashtags.map((tag) => (
            <S.Tag key={tag}>{tag}</S.Tag>
          ))}
        </S.TagsBox>
        <S.InfoBox>
          <S.UserInfoBox onClick={handleUserInfoClick}>
            <S.UserProfile>
              <S.ProfileImage src={author.profileImage} alt="작성자 썸네일" />
            </S.UserProfile>
            <S.UserName>{author.name}</S.UserName>
          </S.UserInfoBox>
          · <S.DateText>{calculateDaysAgo(date)}</S.DateText>
        </S.InfoBox>
        <S.SubInfoBox>
          <S.SubInfoDiv>
            <HeartIcon size={ICON_SIZE.TINY} color="rgba(0, 0, 0, 0.5)" />
            <S.SubInfoText>{likeCount}</S.SubInfoText>
          </S.SubInfoDiv>
          <S.SubInfoDiv>
            <ChatIcon size={ICON_SIZE.TINY} color="rgba(0, 0, 0, 0.5)" />
            <S.SubInfoText>{commentCount}</S.SubInfoText>
          </S.SubInfoDiv>
        </S.SubInfoBox>
      </S.TextWrapper>
      <S.ImageWrapper $imageUrl={photoUrls[0]}>
        {photoUrls.length > 1 && (
          <S.ImageCount>{photoUrls.length}</S.ImageCount>
        )}
      </S.ImageWrapper>
    </S.Container>
  );
}
