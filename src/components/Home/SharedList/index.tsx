import { SharedItem } from "../SharedItem";

import * as S from "./style";

const mockData = [
  {
    id: 1,
    imageUrl: "https://i1.sndcdn.com/artworks-000227430562-am04j1-t500x500.jpg",
    title: "지디가 입은 옷 궁금해요",
    writter: "어나니머스",
    date: "20분전",
    like: 20,
  },
  {
    id: 2,
    imageUrl: "https://i1.sndcdn.com/artworks-000227430562-am04j1-t500x500.jpg",
    title: "지디가 입은 옷 궁금해요",
    writter: "어나니머스",
    date: "20분전",
    like: 20,
  },
  {
    id: 3,
    imageUrl: "https://i1.sndcdn.com/artworks-000227430562-am04j1-t500x500.jpg",
    title: "지디가 입은 옷 궁금해요",
    writter: "어나니머스",
    date: "20분전",
    like: 20,
  },
];

export function SharedList() {
  return (
    <S.Container>
      {mockData.map(({ id, imageUrl, title, writter, date, like }) => (
        <SharedItem
          key={id}
          imageUrl={imageUrl}
          title={title}
          writter={writter}
          date={date}
          like={like}
        />
      ))}
    </S.Container>
  );
}
