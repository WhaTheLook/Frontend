import { useState } from "react";

import { replaceHistory } from "@/utils";

export function useDetailModal() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = (id: number, dest: string) => {
    setIsOpen(true);
    replaceHistory({ modalPostId: id}, dest);
  };

  const handleClose = (dest: string) => {
    setIsOpen(false);
    replaceHistory({}, dest);
  };

  return { isOpen, handleOpen, handleClose };
}
