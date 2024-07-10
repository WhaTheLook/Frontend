interface Props {
  size: number;
  color: string;
}
export function XCircleIcon({ size, color }: Props) {
  return (
    <svg
      width={String(size)}
      height={String(size)}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15 9L9 15"
        stroke={color}
        stroke-width="1"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M9 9L15 15"
        stroke={color}
        stroke-width="1"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}
