import { createContext, ReactNode, useState } from "react";

import { PostDetailInfoType } from "@/types";

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
  commentCount: 0,
  hashtags: [],
  photoUrls: [],
  deleteYN: false,
  comments: [],
};

interface DetailContextProps {
  data: PostDetailInfoType;
  handleSetData: (newData: PostDetailInfoType) => void;
}

export const DetailContext = createContext<DetailContextProps>({
  data: initData,
  handleSetData: () => {},
});

interface Props {
  children: ReactNode;
}

export function DetailProvider({ children }: Props) {
  const [data, setData] = useState<PostDetailInfoType>(initData);

  const handleSetData = (newData: PostDetailInfoType) => {
    setData(newData);
  };

  return (
    <DetailContext.Provider value={{ data, handleSetData }}>
      {children}
    </DetailContext.Provider>
  );
}
