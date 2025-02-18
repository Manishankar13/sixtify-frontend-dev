import type { SVGProps } from "react";

export const SvgsTransaction = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
    style={{ color: "inherit" }}
  >
    <g stroke={props.fill ?? "currentColor"} clipPath="url(#a)">
      <path
        strokeWidth={1.5}
        d="M18 15.5C18 17.432 16.432 19 14.5 19C12.568 19 11 17.432 11 15.5C11 13.568 12.568 12 14.5 12C16.432 12 18 13.568 18 15.5Z"
      />
      <path
        d="M14.6016 14.6992V16.4992"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
      <path
        d="M6.39844 1V3.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        strokeMiterlimit="10"
      />
      <path
        d="M12.6953 1V3.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        strokeMiterlimit="10"
      />
      <path
        d="M1.89844 7.30078H16.2984"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        strokeMiterlimit="10"
      />
      <path
        d="M17.1984 6.27877V13.1616C16.5779 12.4348 15.6684 11.9707 14.6484 11.9707C12.7699 11.9707 11.2484 13.5381 11.2484 15.4734C11.2484 16.1301 11.4269 16.7518 11.7414 17.2773C11.9199 17.5925 12.1494 17.8727 12.4129 18.1004H6.14844C3.17344 18.1004 1.89844 16.349 1.89844 13.722V6.27877C1.89844 3.65174 3.17344 1.90039 6.14844 1.90039H12.9484C15.9234 1.90039 17.1984 3.65174 17.1984 6.27877Z"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        strokeMiterlimit="10"
      />
      <path
        d="M9.54751 11.3504H9.55561"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        strokeMiterlimit="10"
      />
      <path
        d="M6.84439 11.3504H6.85249"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        strokeMiterlimit="10"
      />
      <path
        d="M6.84439 14.0496H6.85249"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        strokeMiterlimit="10"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill={props.fill ?? "currentColor"} d="M0 0h20v20H0z" />
      </clipPath>
    </defs>
  </svg>
);
