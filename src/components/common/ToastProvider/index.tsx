import { createContext, ReactNode, useState } from "react";

import { toastType } from "@/constants";

interface ToastContextProps {
  isOpen: boolean;
  handleToastClose: () => void;
  handleToastOpen: ({ type, content }: handleToastOpenType) => void;
  type: toastType;
  content: string;
}

export const ToastContext = createContext<ToastContextProps>({
  isOpen: false,
  handleToastClose: () => {},
  handleToastOpen: () => {},
  type: toastType.SUCCESS,
  content: "",
});

interface Props {
  children: ReactNode;
}

interface handleToastOpenType {
  type: toastType;
  content: string;
}

export function ToastProvider({ children }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [type, setType] = useState<toastType>(toastType.SUCCESS);
  const [content, setContent] = useState("");

  function handleToastClose() {
    setIsOpen(false);
  }

  function handleToastOpen({ type, content }: handleToastOpenType) {
    setType(type);
    setContent(content);
    setIsOpen(true);
  }

  return (
    <ToastContext.Provider
      value={{ isOpen, handleToastClose, handleToastOpen, type, content }}
    >
      {children}
    </ToastContext.Provider>
  );
}
