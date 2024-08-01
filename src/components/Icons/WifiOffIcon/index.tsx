interface Props {
  size: number;
  color: string;
}

export function WifiOffIcon({ size, color }: Props) {
  return (
    <svg
      width={String(size)}
      height={String(size)}
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_285_1110)">
        <path
          d="M1.69238 1.9231L23.6924 23.9231"
          stroke={color}
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M17.4124 11.9832C18.2315 12.3829 18.9974 12.8834 19.6924 13.4732"
          stroke={color}
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M5.69238 13.473C7.17447 12.2338 8.95826 11.4092 10.8624 11.083"
          stroke={color}
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M11.4023 5.97308C13.5448 5.80045 15.7 6.06124 17.7394 6.7399C19.7788 7.41855 21.6606 8.50116 23.2723 9.92308"
          stroke={color}
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M2.11243 9.92321C3.49959 8.69706 5.09012 7.72244 6.81243 7.04321"
          stroke={color}
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M9.22241 17.0331C10.2376 16.3118 11.4521 15.9243 12.6974 15.9243C13.9427 15.9243 15.1572 16.3118 16.1724 17.0331"
          stroke={color}
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M12.6924 20.9231H12.7024"
          stroke={color}
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_285_1110">
          <rect
            width="24"
            height="24"
            fill="white"
            transform="translate(0.692383 0.923096)"
          />
        </clipPath>
      </defs>
    </svg>
  );
}
