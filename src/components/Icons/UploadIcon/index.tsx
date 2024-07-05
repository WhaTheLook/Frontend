interface Props {
  size: number;
}

export function UploadIcon({ size }: Props) {
  return (
    <svg
      width={String(size)}
      height={String(size)}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M22 8H8C6.93913 8 5.92172 8.42143 5.17157 9.17157C4.42143 9.92172 4 10.9391 4 12V40C4 41.0609 4.42143 42.0783 5.17157 42.8284C5.92172 43.5786 6.93913 44 8 44H36C37.0609 44 38.0783 43.5786 38.8284 42.8284C39.5786 42.0783 40 41.0609 40 40V26"
        stroke="black"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M37 4.99996C37.7956 4.20432 38.8748 3.75732 40 3.75732C41.1252 3.75732 42.2044 4.20432 43 4.99996C43.7956 5.79561 44.2426 6.87475 44.2426 7.99996C44.2426 9.12518 43.7956 10.2043 43 11L24 30L16 32L18 24L37 4.99996Z"
        stroke="black"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
