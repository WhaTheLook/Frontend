import { Fragment } from "react";
import { Link } from "react-router-dom";

import { HeartIcon } from "@/components/Icons/HeartIcon";
import { ChatIcon } from "@/components/Icons/ChatIcon";
import { BookMarkIcon } from "@/components/Icons/BookmarkIcon";

import * as S from "./style";

interface Props {
  content: {
    writter: string;
    profileImage: string;
    date: string;
    title: string;
    description: string;
    tags: string[];
    like: number;
    chat: number;
  };
}

export function InfoWrapper({ content }: Props) {
  const { writter, profileImage, date, title, description, tags, like, chat } =
    content;
  return (
    <Fragment>
      <S.ProfileBox>
        <S.Profile>
          <S.ProfileImageDiv>
            <S.ProfileImage src={profileImage} />
          </S.ProfileImageDiv>
          <S.Writter>{writter}</S.Writter>
        </S.Profile>
        <S.Date>{date}</S.Date>
      </S.ProfileBox>
      <S.ContentBox>
        <S.Title>{title}</S.Title>
        <S.Description>{description}</S.Description>
        {tags.length !== 0 && (
          <S.Tags>
            {tags.map((tag) => (
              <Link to={`/search?search_query=${tag}`} key={tag}>
                <S.Tag>#{tag}</S.Tag>
              </Link>
            ))}
          </S.Tags>
        )}
      </S.ContentBox>
      <S.SubInfoBox>
        <S.IconBox>
          <S.Icons>
            <HeartIcon size={23} color="#000000" />
            <S.IconInfoText>{like}</S.IconInfoText>
          </S.Icons>
          <S.Icons>
            <ChatIcon size={23} color="#000000" />
            <S.IconInfoText>{chat}</S.IconInfoText>
          </S.Icons>
        </S.IconBox>
        <BookMarkIcon size={28} />
      </S.SubInfoBox>
    </Fragment>
  );
}
