import { Fragment } from "react";

import { SharedLatest } from "@/components/Home/SharedLatest";
import { SharedPopular } from "@/components/Home/SharedPopular";

import { SharedLatestFetcher } from "@/fetcher/SharedLatestFetcher";
import { SharedPopularFetcher } from "@/fetcher/SharedPopularFetcher";

interface Props {
  sortType: number;
}

export function SharedPosts({ sortType }: Props) {
  return (
    <Fragment>
      {sortType === 0 ? (
        <SharedLatestFetcher>
          <SharedLatest />
        </SharedLatestFetcher>
      ) : (
        <SharedPopularFetcher>
          <SharedPopular />
        </SharedPopularFetcher>
      )}
    </Fragment>
  );
}
