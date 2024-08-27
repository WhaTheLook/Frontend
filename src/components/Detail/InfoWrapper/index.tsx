import { Fragment } from "react";
import { Link } from "react-router-dom";

import { ProfileBox } from "@/components/Detail/ProfileBox";

import { calculateDaysAgo } from "@/utils";

import { useDetailContext } from "@/hooks/useDetailContext";

import * as S from "./style";

export function InfoWrapper() {
  const { data } = useDetailContext();

  return (
    <Fragment>
      <ProfileBox />
      <S.ContentBox>
        <S.Title>{data.title}</S.Title>
        <S.Description>{data.content}</S.Description>
        {data.hashtags.length !== 0 && (
          <S.Tags>
            {data.hashtags.map((tag) => (
              <Link to={`/search?search_query=${tag.slice(1)}`} key={tag}>
                <S.Tag>{tag}</S.Tag>
              </Link>
            ))}
          </S.Tags>
        )}
        <S.Date title={data.date}>{calculateDaysAgo(data.date)}</S.Date>
      </S.ContentBox>
    </Fragment>
  );
}
