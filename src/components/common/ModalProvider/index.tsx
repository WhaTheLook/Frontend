import { createContext, ReactNode, useState } from "react";

import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";

interface ModalContextProps {
  isOpen: boolean;
  handleClose: () => void;
  handleOpen: () => void;
}

export const ModalContext = createContext<ModalContextProps>({
  isOpen: false,
  handleClose: () => {},
  handleOpen: () => {},
});

interface Props {
  children: ReactNode;
}
export function ModalProvider({ children }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  useLockBodyScroll(isOpen);

  function handleClose() {
    setIsOpen(false);
  }

  function handleOpen() {
    setIsOpen(true);
  }

  return (
    <ModalContext.Provider value={{ isOpen, handleClose, handleOpen }}>
      {children}
    </ModalContext.Provider>
  );
}
