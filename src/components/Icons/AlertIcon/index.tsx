interface Props {
  size: number;
  color: string;
}

export function AlertIcon({ size, color }: Props) {
  return (
    <svg
      width={String(size)}
      height={String(size)}
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.5 22.3334C18.0228 22.3334 22.5 17.8562 22.5 12.3334C22.5 6.81053 18.0228 2.33337 12.5 2.33337C6.97715 2.33337 2.5 6.81053 2.5 12.3334C2.5 17.8562 6.97715 22.3334 12.5 22.3334Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.5 8.33337V12.3334"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.5 16.3334H12.51"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
