import { Fragment } from "react";

import { QnaLatest } from "@/components/Home/QnaLatest";
import { QnaPopular } from "@/components/Home/QnaPopular";

interface Props {
  sortType: number;
}

export function QnaPosts({ sortType }: Props) {
  return <Fragment>{sortType === 0 ? <QnaLatest /> : <QnaPopular />}</Fragment>;
}
