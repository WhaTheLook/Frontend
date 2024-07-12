import { SearchBar } from "@/components/Search/SearchBar";
import { SearchContent } from "@/components/Search/SearchContent";

import * as S from "./style";

export function Search() {
  return (
    <S.Container>
      <SearchBar />
      <SearchContent />
    </S.Container>
  );
}
