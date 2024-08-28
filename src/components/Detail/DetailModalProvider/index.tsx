import { createContext, ReactNode, useCallback, useState } from "react";

import { replaceHistory } from "@/utils";

import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";

interface DetailModalContextProps {
  isDetailOpen: boolean;
  handleDetailClose: (dest: string) => void;
  handleDetailOpen: (id: number, dest: string) => void;
}

export const DetailModalContext = createContext<DetailModalContextProps>({
  isDetailOpen: false,
  handleDetailClose: () => {},
  handleDetailOpen: () => {},
});

interface Props {
  children: ReactNode;
}

export function DetailModalProvider({ children }: Props) {
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  useLockBodyScroll(isDetailOpen);

  const handleDetailOpen = (id: number, dest: string) => {
    setIsDetailOpen(true);
    replaceHistory({ modalPostId: id }, dest);
  };

  const handleDetailClose = useCallback((dest: string) => {
    setIsDetailOpen(false);
    replaceHistory({}, dest);
  }, []);

  return (
    <DetailModalContext.Provider
      value={{ isDetailOpen, handleDetailClose, handleDetailOpen }}
    >
      {children}
    </DetailModalContext.Provider>
  );
}
