import { Link, useParams } from "react-router-dom";

import { AcceptComment } from "../AcceptComment";

import { calculateDaysAgo } from "@/utils";

import { useDetailContext } from "@/hooks/contexts/useDetailContext";

import * as S from "./style";

export function InfoWrapper() {
  const { data } = useDetailContext();
  const { postId } = useParams();

  return (
    <S.ContentBox id="info-wrapper">
      <S.Title>{data.title}</S.Title>
      <S.Description>{data.content}</S.Description>
      {postId && data.hashtags.length !== 0 && (
        <S.Tags>
          {data.hashtags.map((tag) => (
            <Link to={`/search?search_query=${tag.slice(1)}`} key={tag}>
              <S.Tag>{tag}</S.Tag>
            </Link>
          ))}
        </S.Tags>
      )}
      {postId && (
        <S.Date title={data.date}>{calculateDaysAgo(data.date)}</S.Date>
      )}
      {data.accept && <AcceptComment data={data.accept} />}
    </S.ContentBox>
  );
}
