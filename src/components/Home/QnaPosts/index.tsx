import { useEffect, Fragment } from "react";

import { FlatList } from "@/components/common/FlatList";

interface Props {
  sortType: number;
}

export function QnaPosts({ sortType }: Props) {
  useEffect(() => {
    // Todo: sortType에 따른 fetch 요청 구분
  }, [sortType]);

  return (
    <Fragment>
      <FlatList data={[]} />
    </Fragment>
  );
}
