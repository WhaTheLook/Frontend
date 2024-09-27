import {
  ChangeEvent,
  FormEvent,
  MouseEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";

import { SearchIcon } from "@/components/Icons/SearchIcon";
import { XCircleIcon } from "@/components/Icons/XCircleIcon";
import { SearchHistory } from "../SearchHistory";

import {
  SEARCHED_HISTORY,
  SEARCHED_HISTORY_MAX_LENGTH,
  TOGGLE_SEARCH_HISTORY,
} from "@/constants";
import { getLocalStorageItem, setLocalStorageItem } from "@/utils";
import { ICON_SIZE } from "@/constants/style";

import { useSearchContext } from "@/hooks/contexts/useSearchContext";
import { useResizeWindow } from "@/hooks/useResizeWindow";

import * as S from "./style";

export function SearchBar() {
  const { handleSetQuery } = useSearchContext();
  const [inputText, setInputText] = useState("");
  const [isFocus, setIsFocus] = useState(false);
  const [toggleSearchHist, setToggleSearchHist] =
    useState<boolean>(initToggleSearchHist);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const searchHistoryRef = useRef<HTMLDivElement | null>(null);

  const navigate = useNavigate();
  const { breakPoint } = useResizeWindow();

  const getIconSize = () => {
    switch (breakPoint) {
      case "mobile":
        return ICON_SIZE.MEDIUM_TINY;
      default:
        return ICON_SIZE.MEDIUM_SMALL;
    }
  };

  function initToggleSearchHist() {
    if (!getLocalStorageItem(TOGGLE_SEARCH_HISTORY)) {
      setLocalStorageItem(TOGGLE_SEARCH_HISTORY, "true");
      return true;
    }
    return JSON.parse(getLocalStorageItem(TOGGLE_SEARCH_HISTORY)!);
  }

  const updateInputText = (text: string) => {
    setInputText(text);
  };

  const hideSearchHistory = () => {
    setIsFocus(false);
  };

  const handleSearchTagClick = () => {
    hideSearchHistory();
    updateInputText("");
  };

  const handleResetBtnClick = (event: MouseEvent) => {
    event.preventDefault();
    updateInputText("");
  };

  const handleChangeInput = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { value } = target;
    updateInputText(value.trim()); // 띄어쓰기 방지
  };

  const storeSearchedHistory = (text: string) => {
    const searchHist = JSON.parse(
      getLocalStorageItem(SEARCHED_HISTORY) || "[]"
    );
    const copyedSearchHist = [...searchHist].filter((tag) => tag !== text); // 중복 제거

    if (copyedSearchHist.length === SEARCHED_HISTORY_MAX_LENGTH) {
      copyedSearchHist.pop();
    }
    copyedSearchHist.unshift(text);
    setLocalStorageItem(SEARCHED_HISTORY, JSON.stringify(copyedSearchHist));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inputText === "") return;

    toggleSearchHist && storeSearchedHistory(inputText);
    navigate(`?search_query=${inputText}`);
    handleSetQuery(inputText);
  };

  const handleToggleBtnCLick = () => {
    const message = toggleSearchHist
      ? "최근 검색 저장 기능을 중지할까요?"
      : "최근 검색 저장 기능을 사용할까요?";

    const confirmed = window.confirm(message);

    if (confirmed) {
      setToggleSearchHist((prev) => !prev);
      setLocalStorageItem(
        TOGGLE_SEARCH_HISTORY,
        JSON.stringify(!JSON.parse(getLocalStorageItem(TOGGLE_SEARCH_HISTORY)!))
      );
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: globalThis.MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        inputRef.current &&
        !inputRef.current.contains(target as HTMLInputElement) &&
        searchHistoryRef.current &&
        !searchHistoryRef.current.contains(target as HTMLDivElement)
      ) {
        hideSearchHistory();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    inputText === "" ? setIsFocus(true) : setIsFocus(false);
  }, [inputText]);

  useEffect(() => {
    setIsFocus(false);
  }, []);

  return (
    <S.Container>
      <S.Form onSubmit={handleSubmit} $isFocus={isFocus}>
        <S.InputBox>
          <S.InputText
            ref={inputRef}
            value={inputText}
            type="search"
            placeholder="Look 검색하기"
            onChange={handleChangeInput}
            onFocus={() => setIsFocus(true)}
          />
          <S.SubmitButton type="submit">
            <SearchIcon size={getIconSize()} color="#A2A2A2" />
          </S.SubmitButton>
          <S.ResetButton onClick={handleResetBtnClick}>
            <XCircleIcon size={getIconSize()} color="#FFF" />
          </S.ResetButton>
        </S.InputBox>
      </S.Form>
      {isFocus && (
        <SearchHistory
          ref={searchHistoryRef}
          onTagClick={handleSearchTagClick}
          toggleSearchHist={toggleSearchHist}
          onToggleBtnClick={handleToggleBtnCLick}
        />
      )}
    </S.Container>
  );
}
