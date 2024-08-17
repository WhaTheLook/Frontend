import { useSelector } from "react-redux";

import { FlatList } from "@/components/common/FlatList";
import { NothingInfo } from "@/components/common/NothingInfo";

import { selectPost } from "@/store/slice/myPageSlice";

export function MyPosts() {
  const data = useSelector(selectPost);

  return (
    data &&
    (data.length === 0 ? (
      <NothingInfo contentType="post" />
    ) : (
      <FlatList data={data} />
    ))
  );
}
