interface Props {
  size: number;
  color: string;
}

export function LogoutIcon({ size, color }: Props) {
  return (
    <svg
      width={String(size)}
      height={String(size)}
      viewBox="0 0 67 67"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M25.125 58.625H13.9583C12.4775 58.625 11.0574 58.0368 10.0103 56.9897C8.96324 55.9426 8.375 54.5225 8.375 53.0417V13.9583C8.375 12.4775 8.96324 11.0574 10.0103 10.0103C11.0574 8.96324 12.4775 8.375 13.9583 8.375H25.125"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M44.6665 47.4584L58.6248 33.5001L44.6665 19.5417"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M58.625 33.5H25.125"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
