interface Props {
  color: string;
  size: number;
}

export function RotateIcon({ size, color }: Props) {
  return (
    <svg
      width={String(size)}
      height={String(size)}
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_1107_1110)">
        <path
          d="M1.67273 4.50769V10.5077H7.67273"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M4.18273 15.5076C4.83112 17.348 6.06007 18.9278 7.68439 20.009C9.30871 21.0902 11.2404 21.6142 13.1884 21.5021C15.1365 21.39 16.9953 20.6478 18.4849 19.3874C19.9744 18.127 21.014 16.4166 21.447 14.514C21.8799 12.6114 21.6828 10.6196 20.8854 8.83874C20.0879 7.05788 18.7333 5.58443 17.0256 4.6404C15.3179 3.69637 13.3496 3.3329 11.4174 3.60476C9.48518 3.87661 7.69364 4.76906 6.31273 6.14764L1.67273 10.5076"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}
