import { useState } from "react";

export function useMenuType() {
    const [menuType, setMenuType] = useState(0);

    function handleMenuClick(id: number) {
        setMenuType(id);
    }

    return { menuType, handleMenuClick };
}