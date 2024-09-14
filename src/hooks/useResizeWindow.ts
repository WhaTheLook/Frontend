import { useEffect, useState } from "react";
import _ from "lodash";
import { MEDIA_SIZE } from "@/constants/style";
import { Breakpoints } from "@/styles/media";

const THROTTLE_DELAY = 500;

export function useResizeWindow() {
  const [breakPoint, setBreakPoint] = useState<Breakpoints>(getBreakPoint(window.innerWidth));

  function getBreakPoint (width: number): Breakpoints {
    if (width <= MEDIA_SIZE.small) {
      return "small";
    } else if (width <= MEDIA_SIZE.medium) {
      return "medium";
    } else {
      return "large";
    }
  }

  useEffect(() => {
    const handleResize = _.throttle(() => {
      const width = window.innerWidth;

      setBreakPoint(getBreakPoint(width));
    }, THROTTLE_DELAY);

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return { breakPoint };
}
