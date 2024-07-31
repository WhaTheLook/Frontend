import { Fragment } from "react";

import { SharedLatest } from "@/components/Home/SharedLatest";
import { SharedPopular } from "@/components/Home/SharedPopular";

interface Props {
  sortType: number;
}

export function SharedPosts({ sortType }: Props) {
  return (
    <Fragment>{sortType === 0 ? <SharedLatest /> : <SharedPopular />}</Fragment>
  );
}
