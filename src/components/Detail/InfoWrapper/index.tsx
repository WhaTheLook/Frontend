import { Fragment } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { ChatIcon } from "@/components/Icons/ChatIcon";
import { OptionButton } from "@/components/Icons/OptionIcon";
import { LikeWrapper } from "../LikeWrapper";

import { ICON_SIZE } from "@/constants/style";
import { PostDetailInfoType } from "@/types";

import { selectCurrentUser } from "@/store/slice/authSlice";

import * as S from "./style";

interface Props {
  data: PostDetailInfoType;
}

export function InfoWrapper({ data }: Props) {
  const {
    author,
    date,
    title,
    content,
    hashtags,
    likeCount,
    comments,
    likeYN,
    id,
  } = data;
  const navigate = useNavigate();
  const loginUser = useSelector(selectCurrentUser);

  const isOwnLoginUser = author.kakaoId === loginUser?.kakaoId;

  const handleUserProfileClick = (userId: string) => {
    navigate(`/profile/${userId}`);
  };

  return (
    <Fragment>
      <S.ProfileBox>
        <S.Profile onClick={() => handleUserProfileClick(author.kakaoId)}>
          <S.ProfileImageDiv>
            <S.ProfileImage src={author.profileImage} />
          </S.ProfileImageDiv>
          <S.Writter>{author.name}</S.Writter>
        </S.Profile>
        {isOwnLoginUser && (
          <S.OptionButton>
            <OptionButton size={ICON_SIZE.SMALL} color="#000" />
          </S.OptionButton>
        )}
      </S.ProfileBox>
      <S.ContentBox>
        <S.Title>{title}</S.Title>
        <S.Description>{content}</S.Description>
        {hashtags.length !== 0 && (
          <S.Tags>
            {hashtags.map((tag) => (
              <Link to={`/search?search_query=${tag}`} key={tag}>
                <S.Tag>{tag}</S.Tag>
              </Link>
            ))}
          </S.Tags>
        )}
        <S.Date>{date}</S.Date>
      </S.ContentBox>
      <S.SubInfoBox>
        <S.IconBox>
          <S.Icons>
            <LikeWrapper likeCount={likeCount} likeYN={likeYN} postId={id} />
          </S.Icons>
          <S.Icons>
            <ChatIcon size={ICON_SIZE.MEDIUM_SMALL} color="#000000" />
            <S.IconInfoText>{comments.length}</S.IconInfoText>
          </S.Icons>
        </S.IconBox>
      </S.SubInfoBox>
    </Fragment>
  );
}
