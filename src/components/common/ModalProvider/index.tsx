import { createContext, ReactNode, useState } from "react";

import { modalLocationType } from "@/constants";

interface ModalContextProps {
  isOpen: boolean;
  handleClose: () => void;
  handleOpen: (arg: modalLocationType) => void;
  modalLocation: modalLocationType | null;
}

export const ModalContext = createContext<ModalContextProps>({
  isOpen: false,
  handleClose: () => {},
  handleOpen: () => {},
  modalLocation: null,
});

interface Props {
  children: ReactNode;
}
export function ModalProvider({ children }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [modalLocation, setModalLocation] = useState<modalLocationType | null>(
    null
  );

  function handleClose() {
    setIsOpen(false);
  }

  function handleOpen(modalLocation: modalLocationType) {
    setIsOpen(true);
    setModalLocation(modalLocation);
  }

  return (
    <ModalContext.Provider
      value={{ isOpen, handleClose, handleOpen, modalLocation }}
    >
      {children}
    </ModalContext.Provider>
  );
}
