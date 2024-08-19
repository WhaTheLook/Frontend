import { useContext } from "react";

import { FlatList } from "@/components/common/FlatList";
import { PostContext } from "@/components/common/PostProvider";
import { NothingInfo } from "@/components/common/NothingInfo";

export function QnaLatestContainer() {
  const { data } = useContext(PostContext);

  return (
    data &&
    (data.length === 0 ? (
      <NothingInfo contentType="home" />
    ) : (
      <FlatList data={data} />
    ))
  );
}
