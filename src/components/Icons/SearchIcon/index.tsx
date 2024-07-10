interface Props {
  size: number;
  color: string;
}

export function SearchIcon({ size, color }: Props) {
  return (
    <svg
      width={String(size)}
      height={String(size)}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M22 38C30.8366 38 38 30.8366 38 22C38 13.1634 30.8366 6 22 6C13.1634 6 6 13.1634 6 22C6 30.8366 13.1634 38 22 38Z"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M42 42L33.3 33.3"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
