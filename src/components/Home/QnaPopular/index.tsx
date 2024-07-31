import { useContext } from "react";

import { FlatList } from "@/components/common/FlatList";
import { PostContext } from "@/components/common/PostProvider";

export function QnaPopular() {
  const { data } = useContext(PostContext);

  return <FlatList data={data} />;
}
