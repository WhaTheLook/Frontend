import { createContext, ReactNode, useState } from "react";

import { CommentsType, PostDetailInfoType } from "@/types";

const initData = {
  id: 0,
  author: {
    name: "",
    profileImage: "",
    kakaoId: "",
  },
  title: "",
  content: "",
  category: "",
  date: "",
  likeCount: 0,
  likeYN: false,
  hashtags: [],
  photoUrls: [],
  deleteYN: false,
  comments: [],
};

interface DetailContextProps {
  data: PostDetailInfoType;
  handleSetData: (newData: PostDetailInfoType) => void;
  handleSetComments: (newComment: CommentsType) => void;
}

export const DetailContext = createContext<DetailContextProps>({
  data: initData,
  handleSetData: () => {},
  handleSetComments: () => {},
});

interface Props {
  children: ReactNode;
}

export function DetailProvider({ children }: Props) {
  const [data, setData] = useState<PostDetailInfoType>(initData);

  const handleSetData = (newData: PostDetailInfoType) => {
    setData(newData);
  };

  const handleSetComments = (newComment: CommentsType) => {
    const copyedData = { newComment, ...data };
    setData(copyedData);
  };

  return (
    <DetailContext.Provider value={{ data, handleSetData, handleSetComments }}>
      {children}
    </DetailContext.Provider>
  );
}
