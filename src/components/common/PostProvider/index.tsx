import { createContext, ReactNode, useState } from "react";

import { PostListType } from "@/types";

interface createContextType {
  data: PostListType[];
  handleSetData: (arg: PostListType[]) => void;
}

export const PostContext = createContext<createContextType>({
  data: [],
  handleSetData: () => {},
});

interface Props {
  children: ReactNode;
}

export function PostProvider({ children }: Props) {
  const [data, setData] = useState<PostListType[]>([]);

  const handleSetData = (newData: PostListType[]) => {
    setData(newData);
  };

  return (
    <PostContext.Provider value={{ data, handleSetData }}>
      {children}
    </PostContext.Provider>
  );
}
