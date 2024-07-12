import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import * as S from "./style";

interface PostType {
  id: number;
  writter: string;
  title: string;
  like: number;
  category: boolean;
  date: string;
  imageUrl: string;
}

const mockData = [
  {
    id: 11,
    writter: "고길동",
    title: "제목 예시",
    like: 20,
    category: false,
    date: "2일전",
    imageUrl: "https://i1.sndcdn.com/artworks-000227430562-am04j1-t500x500.jpg",
  },
  {
    id: 22,
    writter: "고길동",
    title: "제목 예시",
    like: 20,
    category: true,
    date: "2일전",
    imageUrl: "https://i1.sndcdn.com/artworks-000227430562-am04j1-t500x500.jpg",
  },
  {
    id: 33,
    writter: "고길동",
    title: "제목 예시",
    like: 20,
    category: false,
    date: "2일전",
    imageUrl: "https://i1.sndcdn.com/artworks-000227430562-am04j1-t500x500.jpg",
  },
  {
    id: 44,
    writter: "고길동",
    title: "제목 예시",
    like: 20,
    category: true,
    date: "2일전",
    imageUrl: "https://i1.sndcdn.com/artworks-000227430562-am04j1-t500x500.jpg",
  },
];

export function SearchContent() {
  const [searchedData, setSearchedData] = useState<PostType[]>([]);

  const [searchParams] = useSearchParams();
  const query = searchParams.get("search_query");

  useEffect(() => {
    setSearchedData([]);
    if (!query) return;
    // query 로 API 요청
    setSearchedData(mockData);
  }, [query]);

  const renderInfoText = () => {
    if (!query) {
      return <S.Text>찾으려는 룩을 검색하세요.</S.Text>;
    }
    if (searchedData.length === 0) {
      return (
        <S.Text>
          <S.Bold>'{query}'</S.Bold>와 일치하는 결과가 없어요.
        </S.Text>
      );
    }
    return (
      <S.Text>
        <S.Bold>{query}</S.Bold>검색 결과, 총{" "}
        <S.Bold>{searchedData.length}</S.Bold>개의 게시물을 찾았어요.
      </S.Text>
    );
  };

  return (
    <>
      <S.Container>{renderInfoText()}</S.Container>
    </>
  );
}
