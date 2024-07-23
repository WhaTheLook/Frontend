interface Props {
  size: number;
  color: string;
}

export function BookMarkIcon({ size, color }: Props) {
  return (
    <svg
      width={String(size)}
      height={String(size)}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M38 42L24 32L10 42V10C10 8.93913 10.4214 7.92172 11.1716 7.17157C11.9217 6.42143 12.9391 6 14 6H34C35.0609 6 36.0783 6.42143 36.8284 7.17157C37.5786 7.92172 38 8.93913 38 10V42Z"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
