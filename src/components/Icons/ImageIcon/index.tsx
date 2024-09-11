interface Props {
  size: number;
  color: string;
}

export function ImageIcon({ size, color }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 73 73"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M57.7917 9.125H15.2083C11.8486 9.125 9.125 11.8486 9.125 15.2083V57.7917C9.125 61.1514 11.8486 63.875 15.2083 63.875H57.7917C61.1514 63.875 63.875 61.1514 63.875 57.7917V15.2083C63.875 11.8486 61.1514 9.125 57.7917 9.125Z"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M25.8541 30.4166C28.3739 30.4166 30.4166 28.3739 30.4166 25.8541C30.4166 23.3343 28.3739 21.2916 25.8541 21.2916C23.3343 21.2916 21.2916 23.3343 21.2916 25.8541C21.2916 28.3739 23.3343 30.4166 25.8541 30.4166Z"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M63.875 45.625L48.6667 30.4166L15.2084 63.875"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
