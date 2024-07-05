import { useState } from "react";

import { Menu } from "@/components/Home/Menu";

import * as S from "./style";

export function Home() {
  const [currentMenu, setCurrentMenu] = useState(1);

  function handleMenuClick(id: number) {
    setCurrentMenu(id);
  }

  return (
    <S.Container>
      <Menu currentMenu={currentMenu} onMenuClick={handleMenuClick} />
    </S.Container>
  );
}
