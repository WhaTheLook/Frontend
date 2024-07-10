interface Props {
  size: number;
  color: string;
}
export function SendIcon({ size, color }: Props) {
  return (
    <svg
      width={String(size)}
      height={String(size)}
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M22.4451 2.13216L11.4451 13.1322"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22.4451 2.13216L15.4451 22.1322L11.4451 13.1322L2.44507 9.13216L22.4451 2.13216Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
