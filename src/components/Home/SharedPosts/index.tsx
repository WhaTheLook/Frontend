import { Fragment } from "react";

import { SharedLatestContainer } from "@/components/Home/SharedLatestContainer";
import { SharedPopularContainer } from "@/components/Home/SharedPopularContainer";

import { SharedLatestFetcher } from "@/fetcher/Home/SharedLatestFetcher";
import { SharedPopularFetcher } from "@/fetcher/Home/SharedPopularFetcher";

interface Props {
  sortType: number;
}

export function SharedPosts({ sortType }: Props) {
  return (
    <Fragment>
      {sortType === 0 ? (
        <SharedLatestFetcher>
          <SharedLatestContainer />
        </SharedLatestFetcher>
      ) : (
        <SharedPopularFetcher>
          <SharedPopularContainer />
        </SharedPopularFetcher>
      )}
    </Fragment>
  );
}
