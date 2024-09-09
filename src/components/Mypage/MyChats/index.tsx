import { useSelector } from "react-redux";

import { NothingInfo } from "@/components/common/NothingInfo";
import { FlatList } from "@/components/common/FlatList";

import { selectComment } from "@/store/slice/myPageSlice";

export function MyChats() {
  const data = useSelector(selectComment);

  return (
    data &&
    (data.length === 0 ? (
      <NothingInfo contentType="comment" />
    ) : (
      <FlatList data={data} />
    ))
  );
}
