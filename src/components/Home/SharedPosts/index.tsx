import { SharedLatestContainer } from "@/components/Home/SharedLatestContainer";

import { SharedLatestFetcher } from "@/fetcher/Home/SharedLatestFetcher";

export function SharedPosts() {
  return (
    <SharedLatestFetcher>
      <SharedLatestContainer />
    </SharedLatestFetcher>
  );
}
