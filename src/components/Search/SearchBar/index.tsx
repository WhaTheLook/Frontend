import { ChangeEvent, FormEvent, MouseEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

import { SearchIcon } from "@/components/Icons/SearchIcon";
import { XCircleIcon } from "@/components/Icons/XCircleIcon";

import * as S from "./style";

export function SearchBar() {
  const [inputText, setInputText] = useState("");

  const navigate = useNavigate();

  const handleResetBtnClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setInputText("");
  };

  const handleChangeInput = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { value } = target;
    setInputText(value.trim()); // 띄어쓰기 방지
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inputText === "") return;
    navigate(`?search_query=${inputText}`);
    setInputText("");
  };

  return (
    <S.Container>
      <S.Form method="GET" onSubmit={handleSubmit}>
        <S.InputBox>
          <S.InputText
            value={inputText}
            type="text"
            placeholder="Look 검색하기"
            onChange={handleChangeInput}
          />
          <S.SubmitButton type="submit">
            <SearchIcon size={24} color="#A2A2A2" />
          </S.SubmitButton>
          <S.ResetButton onClick={handleResetBtnClick}>
            <XCircleIcon size={22} color="#FFF" />
          </S.ResetButton>
        </S.InputBox>
      </S.Form>
    </S.Container>
  );
}
