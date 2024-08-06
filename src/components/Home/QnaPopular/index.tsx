import { useContext } from "react";

import { FlatList } from "@/components/common/FlatList";
import { PostContext } from "@/components/common/PostProvider";
import { NothingInfo } from "@/components/common/NothingInfo";

export function QnaPopular() {
  const { data } = useContext(PostContext);

  return data.length === 0 ? (
    <NothingInfo contentType="home" />
  ) : (
    <FlatList data={data} />
  );
}
