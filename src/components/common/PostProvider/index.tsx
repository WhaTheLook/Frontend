import { createContext, ReactNode, useState } from "react";

import { PostListContentType } from "@/types";

interface createContextType {
  data: PostListContentType[];
  handleSetData: (arg: PostListContentType[]) => void;
}

export const PostContext = createContext<createContextType>({
  data: [],
  handleSetData: () => {},
});

interface Props {
  children: ReactNode;
}

export function PostProvider({ children }: Props) {
  const [data, setData] = useState<PostListContentType[]>([]);

  const handleSetData = (newData: PostListContentType[]) => {
    setData(newData);
  };

  return (
    <PostContext.Provider value={{ data, handleSetData }}>
      {children}
    </PostContext.Provider>
  );
}
