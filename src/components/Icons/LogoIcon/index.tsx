import * as S from "./style";

interface Props {
  size: number;
  color: string;
}

export function LogoIcon({ size, color }: Props) {
  return (
    <S.Container>
      <svg
        width={size}
        height={size}
        viewBox="0 0 210 87"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M52.4302 43.462L0 86.9239L52.4708 86.9848C81.3439 87.0051 128.58 87.0051 157.453 86.9848L209.944 86.9239L157.453 43.4417C128.6 19.5397 104.942 -0.0201187 104.921 0.000167847C104.881 0.000167847 81.2627 19.56 52.4302 43.462Z"
          fill={color}
        />
      </svg>
    </S.Container>
  );
}
