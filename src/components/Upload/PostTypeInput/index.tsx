import { memo } from "react";

import { ErrorMessage } from "@/components/common/ErrorMessage";

import { POST_TYPE_LIST } from "@/constants";

import * as S from "./style";

interface Props {
  postType: number | null;
  dispatcher: (args: number) => void;
  error: boolean;
}

export const PostTypeInput = memo(function PostTypeInput({
  postType,
  dispatcher,
  error,
}: Props) {
  const handlePostTypeClick = (id: number) => {
    dispatcher(id);
  };

  const isSelected = (id: number) => postType === id;
  return (
    <S.Container>
      <S.Wrapper>
        {POST_TYPE_LIST.map(({ id, text }) => (
          <S.TypeBox
            key={id}
            $isSelected={isSelected(id)}
            onClick={() => handlePostTypeClick(id)}
          >
            <S.TextDiv>
              <S.Text>
                <S.Bold>{text}</S.Bold>
              </S.Text>
              <S.Text>작성하기</S.Text>
            </S.TextDiv>
          </S.TypeBox>
        ))}
      </S.Wrapper>
      {error && <ErrorMessage message="글 종류를 선택해주세요." />}
    </S.Container>
  );
});
