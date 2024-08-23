import { ForwardedRef, forwardRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { XCircleIcon } from "@/components/Icons/XCircleIcon";

import {
  getLocalStorageItem,
  removeLocalStorageItem,
  setLocalStorageItem,
} from "@/utils";
import { SEARCHED_HISTORY } from "@/constants";
import { ICON_SIZE } from "@/constants/style";

import * as S from "./style";

interface Props {
  onTagClick: () => void;
  toggleSearchHist: boolean;
  onToggleBtnClick: () => void;
}

export const SearchHistory = forwardRef(function SearchHistory(
  { onTagClick, toggleSearchHist, onToggleBtnClick }: Props,
  ref: ForwardedRef<HTMLDivElement>
) {
  const [searchedTags, setSearchTags] = useState<string[]>(() =>
    JSON.parse(getLocalStorageItem(SEARCHED_HISTORY) || "[]")
  );

  const navigate = useNavigate();

  const handleAllDeleteBtnClick = () => {
    const confirmed = window.confirm("전체 기록을 삭제할까요?");

    if (confirmed) {
      removeLocalStorageItem(SEARCHED_HISTORY);
      setSearchTags([]);
    }
  };

  const handleTagDeleteBtnClick = (deleteIndex: number) => {
    const searchHist = JSON.parse(getLocalStorageItem(SEARCHED_HISTORY)!);
    const copyedSearchHist = [...searchHist];
    const newSearchHist = copyedSearchHist.filter(
      (_, idx) => idx !== deleteIndex
    );
    setLocalStorageItem(SEARCHED_HISTORY, JSON.stringify(newSearchHist));
    setSearchTags(newSearchHist);
  };

  const handleTagClick = (text: string) => {
    navigate(`?search_query=${text}`);
    onTagClick();
  };

  return (
    <S.Container ref={ref}>
      <S.Wrapper>
        <S.InfoTextBox>
          <S.InfoText>최근 검색어</S.InfoText>
          <S.InfoSubTextDiv>
            <S.SubButton onClick={onToggleBtnClick} $isDisabled={false}>
              {toggleSearchHist ? "검색 기록 끄기" : "검색 기록 켜기"}
            </S.SubButton>
            |
            <S.SubButton
              onClick={handleAllDeleteBtnClick}
              disabled={!toggleSearchHist}
              $isDisabled={!toggleSearchHist}
            >
              전체 기록 삭제
            </S.SubButton>
          </S.InfoSubTextDiv>
        </S.InfoTextBox>
        {!toggleSearchHist && (
          <S.MainText>검색 기록 기능이 꺼져 있어요.</S.MainText>
        )}
        {toggleSearchHist && (
          <S.Tags>
            {searchedTags.map((tag, index) => (
              <S.Tag key={tag}>
                <S.Text onClick={() => handleTagClick(tag)}>{tag}</S.Text>
                <S.XButton onClick={() => handleTagDeleteBtnClick(index)}>
                  <XCircleIcon size={ICON_SIZE.MEDIUM_LARGE} color="#595959" />
                </S.XButton>
              </S.Tag>
            ))}
          </S.Tags>
        )}
      </S.Wrapper>
    </S.Container>
  );
});
