import {
    css,
    type CSSObject,
    type Interpolation,
  } from "styled-components";
  
  export type Breakpoints = "mobile" | "small" | "medium" | "large";
  
  export const breakpoints: Record<Breakpoints, string> = {
    mobile: '@media (max-width: 440px)',
    small: '@media (max-width: 639px)',
    medium: '@media (max-width: 1047px)',
    large: '@media (min-width: 1048px)',
  };

  const media = Object.entries(breakpoints).reduce((acc, [key, value]) => {
    return {
      ...acc,
      [key]: (
        first: CSSObject | TemplateStringsArray,
        ...interpolations: Interpolation<object>[]
      ) => css`
        ${value} {
          ${css(first, ...interpolations)}
        }
      `,
    };
  }, {}) as Record<Breakpoints, any>;
  
  export default media;