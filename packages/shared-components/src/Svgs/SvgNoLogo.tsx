import type { SvgIconProps } from "@mui/material";

export const SvgNoLogo = (props: SvgIconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={50}
      height={50}
      fill="none"
      {...props}
      style={{ color: "inherit" }}
    >
      <g clipPath="url(#clip0_2072_2023)">
        <path
          d="M1.08984 1.08203L48.9112 48.9175"
          stroke="black"
          strokeWidth="2"
          strokeMiterlimit="10"
          strokeLinecap="round"
        />
        <path
          d="M1.08984 6.70996V43.5065H38.9983"
          stroke="black"
          strokeWidth="2"
          strokeMiterlimit="10"
          strokeLinecap="round"
        />
        <path
          d="M6.75391 6.60156H48.9108V43.2899H43.0284"
          stroke="black"
          strokeWidth="2"
          strokeMiterlimit="10"
        />
        <path
          d="M1.41602 33.3332L15.1415 20.6709"
          stroke="black"
          strokeWidth="2"
          strokeMiterlimit="10"
          strokeLinecap="round"
        />
        <path
          d="M36.167 20.7786C38.1524 20.7786 39.7618 19.1796 39.7618 17.2072C39.7618 15.2347 38.1524 13.6357 36.167 13.6357C34.1817 13.6357 32.5723 15.2347 32.5723 17.2072C32.5723 19.1796 34.1817 20.7786 36.167 20.7786Z"
          fill="black"
        />
        <path
          d="M25.2734 35.4973L28.3235 32.5752"
          stroke="black"
          strokeWidth="2"
          strokeMiterlimit="10"
          strokeLinecap="round"
        />
        <path
          d="M30.1758 30.5188L33.9884 26.7309C34.4241 26.298 35.0777 26.298 35.4045 26.7309L48.6943 39.5015"
          stroke="black"
          strokeWidth="2"
          strokeMiterlimit="10"
        />
      </g>
      <defs>
        <clipPath id="clip0_2072_2023">
          <rect width="50" height="50" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
