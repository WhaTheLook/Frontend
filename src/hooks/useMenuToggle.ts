import { useCallback, useEffect, useRef, useState } from "react";

export function useMenuToggle<T extends HTMLElement>() {
    const [menuVisible, setMenuVisible] = useState(false);

    const triggerRef = useRef<T | null>(null);
    const menuRef = useRef<HTMLDivElement | null>(null);

    const handleToggle = useCallback(() => {
        setMenuVisible(!menuVisible)
    }, [menuVisible]);

    const hideMenu = () => setMenuVisible(false);

    const isClickOutside = (target: EventTarget | null) => {
        return (
          !menuRef.current?.contains(target as Node) &&
          !triggerRef.current?.contains(target as Node)
        );
      };
    
    const handleClickOutside = useCallback(({ target }: MouseEvent) => {
        if (isClickOutside(target)) {
            setMenuVisible(false);
        }
    }, []);
    
    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [handleClickOutside]);

    return { menuVisible, handleToggle, menuRef, triggerRef, hideMenu }
}