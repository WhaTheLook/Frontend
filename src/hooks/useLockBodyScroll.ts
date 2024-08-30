import { useEffect } from "react";

let modalCount = 0; // 스크롤 잠금이 활성화된 모달의 수

export function useLockBodyScroll(isModalOpen: boolean) {
    useEffect(() => {
    if (isModalOpen) {
      modalCount += 1;
      if (modalCount >= 1) {
        // 처음으로 모달이 열릴 때 스크롤을 잠금
        document.body.style.overflow = 'hidden';
      }
    } else {
      modalCount = Math.max(modalCount - 1, 0);
      if (modalCount === 0) {
        // 마지막 모달이 닫힐 때 스크롤 잠금을 해제
        document.body.style.overflow = '';
      }
    }
  }, [isModalOpen]);
}