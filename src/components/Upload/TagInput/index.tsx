import { ChangeEvent, KeyboardEvent, memo, useState } from "react";

import { ErrorMessage } from "@/components/common/ErrorMessage";
import { Label } from "../Label";

import { TAGS_MAX_COUNT } from "@/constants";

import * as S from "./style";

interface Props {
  tags: string[];
  dispatcher: (args: string[]) => void;
  error: boolean;
}

export const TagInput = memo(function TagInput({
  tags,
  dispatcher,
  error,
}: Props) {
  const [inputText, setInputText] = useState("");
  const [isFocus, setIsFocus] = useState(false);

  const handleTagClick = (text: string) => {
    const copyedTags = [...tags];
    const newTags = copyedTags.filter((tag) => tag !== text);
    dispatcher(newTags);
  };

  const addNewTag = (newTag: string) => {
    if (newTag === "") return;
    const copyedTags = [...tags];
    if (copyedTags.includes(newTag)) return;
    copyedTags.push(newTag);
    dispatcher(copyedTags);
    if (copyedTags.length === TAGS_MAX_COUNT) setIsFocus(false);
  };

  const handleKeyDown = ({ key }: KeyboardEvent<HTMLInputElement>) => {
    if (key === "Enter") {
      addNewTag(inputText);
      setInputText("");
    }
  };

  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { value } = target;
    setInputText(value.trim());
  };

  return (
    <S.Container>
      <Label text="태그" htmlFor="tag" />
      <S.TagBox>
        {tags.map((tag) => (
          <S.Tag key={tag} onClick={() => handleTagClick(tag)}>
            {tag}
          </S.Tag>
        ))}
        {tags.length < TAGS_MAX_COUNT && (
          <S.Input
            id="tag"
            type="text"
            placeholder="태그를 입력하세요"
            value={inputText}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
          />
        )}
      </S.TagBox>
      {isFocus && (
        <S.InfoTextBox>
          <ul>
            <S.InfoText>엔터로 태그를 등록할 수 있어요.</S.InfoText>
            <S.InfoText>등록된 태그를 클릭하면 삭제돼요.</S.InfoText>
            <S.InfoText>최대 {TAGS_MAX_COUNT}개까지 입력 가능</S.InfoText>
          </ul>
        </S.InfoTextBox>
      )}
      {error && <ErrorMessage message="태그 1개 이상 입력해주세요." />}
    </S.Container>
  );
});
