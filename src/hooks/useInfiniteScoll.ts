import { RefObject, useEffect, useRef, useState } from "react";

export function useInfiniteScoll(targetElement : RefObject<HTMLDivElement>, shouldObserve: boolean) {
  const [intersecting, setIntersecting] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const getObserver = () => {
    if (!observerRef.current) {
      observerRef.current = new IntersectionObserver((entries) => {
        setIntersecting(entries.some((entry) => entry.isIntersecting));
      });
    }
    return observerRef.current;
  };

  useEffect(() => {
    if (targetElement.current && shouldObserve) {
      getObserver().observe(targetElement.current);
    }
    return () => getObserver().disconnect();
  }, [targetElement, shouldObserve]);

  return intersecting;
}
