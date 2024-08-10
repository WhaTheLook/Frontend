import { createContext, ReactNode, useState } from "react";

interface ToastContextProps {
  isOpen: boolean;
  handleToastClose: () => void;
  handleToastOpen: () => void;
}

export const ToastContext = createContext<ToastContextProps>({
  isOpen: false,
  handleToastClose: () => {},
  handleToastOpen: () => {},
});

interface Props {
  children: ReactNode;
}

export function ToastProvider({ children }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  function handleToastClose() {
    setIsOpen(false);
  }

  function handleToastOpen() {
    setIsOpen(true);
  }

  return (
    <ToastContext.Provider
      value={{ isOpen, handleToastClose, handleToastOpen }}
    >
      {children}
    </ToastContext.Provider>
  );
}
