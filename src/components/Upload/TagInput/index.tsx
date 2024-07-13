import { ChangeEvent, KeyboardEvent, useState } from "react";

import { Label } from "../Label";

import * as S from "./style";

export function TagInput() {
  const [inputText, setInputText] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [isFocus, setIsFocus] = useState(false);

  const handleTagClick = (text: string) => {
    const copyedTags = [...tags];
    const newTags = copyedTags.filter((tag) => tag !== text);
    setTags(newTags);
  };

  const addNewTag = (newTag: string) => {
    if (newTag === "") return;
    const copyedTags = [...tags];
    if (copyedTags.includes(newTag)) return;
    copyedTags.push(newTag);
    setTags(copyedTags);
    if (copyedTags.length === 5) setIsFocus(false);
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
      <Label text="해시태그" htmlFor="tag" />
      <S.TagBox>
        {tags.map((tag) => (
          <S.Tag key={tag} onClick={() => handleTagClick(tag)}>
            {tag}
          </S.Tag>
        ))}
        {tags.length < 5 && (
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
          <S.InfoText>엔터를 입력하면 태그를 등록할 수 있습니다.</S.InfoText>
          <S.InfoText>등록된 태그를 클릭하면 삭제됩니다.</S.InfoText>
          <S.InfoText>(최대 5개까지 입력 가능)</S.InfoText>
        </S.InfoTextBox>
      )}
    </S.Container>
  );
}
