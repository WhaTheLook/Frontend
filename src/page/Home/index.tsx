import { useState } from "react";

import { Menu } from "@/components/Home/Menu";
import { SortTab } from "@/components/Home/SortTab";
import { SharedList } from "@/components/Home/SharedList";

import * as S from "./style";

export function Home() {
  const [currentMenu, setCurrentMenu] = useState(0);
  const [sortType, setSortType] = useState(1);

  function handleMenuClick(id: number) {
    setCurrentMenu(id);
  }

  function handleSortTypeClick(id: number) {
    setSortType(id);
  }

  return (
    <S.Container>
      <Menu currentMenu={currentMenu} onMenuClick={handleMenuClick} />
      <SortTab sortType={sortType} onSortTypeClick={handleSortTypeClick} />
      {currentMenu === 1 ? <SharedList /> : <>정보 공유</>}
    </S.Container>
  );
}
