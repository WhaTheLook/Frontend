interface Props {
  size: number;
  color: string;
}

export function FileIcon({ size, color }: Props) {
  return (
    <svg
      width={String(size)}
      height={String(size)}
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.6506 2.8772H6.65063C6.1202 2.8772 5.61149 3.08791 5.23642 3.46298C4.86135 3.83806 4.65063 4.34676 4.65063 4.8772V20.8772C4.65063 21.4076 4.86135 21.9163 5.23642 22.2914C5.61149 22.6665 6.1202 22.8772 6.65063 22.8772H18.6506C19.1811 22.8772 19.6898 22.6665 20.0648 22.2914C20.4399 21.9163 20.6506 21.4076 20.6506 20.8772V9.8772L13.6506 2.8772Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.6506 2.8772V9.8772H20.6506"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
