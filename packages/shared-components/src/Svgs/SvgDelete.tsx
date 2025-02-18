import type { SvgIconProps } from "@mui/material";

export const SvgDelete = (props: SvgIconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={30}
      height={30}
      fill="none"
      {...props}
      style={{ color: "inherit" }}
    >
      <path
        fill="#fff"
        stroke="#DBE1E6"
        d="M.5 4A3.5 3.5 0 0 1 4 .5h22A3.5 3.5 0 0 1 29.5 4v22a3.5 3.5 0 0 1-3.5 3.5H4A3.5 3.5 0 0 1 .5 26V4Z"
      />
      <path
        d="M21.75 10.4844C19.2525 10.2369 16.74 10.1094 14.235 10.1094C12.75 10.1094 11.265 10.1844 9.78 10.3344L8.25 10.4844"
        stroke="#4C5D70"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.375 9.7275L12.54 8.745C12.66 8.0325 12.75 7.5 14.0175 7.5H15.9825C17.25 7.5 17.3475 8.0625 17.46 8.7525L17.625 9.7275"
        stroke="#4C5D70"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20.1383 12.8555L19.6508 20.408C19.5683 21.5855 19.5008 22.5005 17.4083 22.5005H12.5933C10.5008 22.5005 10.4333 21.5855 10.3508 20.408L9.86328 12.8555"
        stroke="#4C5D70"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.7461 18.375H16.2436"
        stroke="#4C5D70"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.125 15.375H16.875"
        stroke="#4C5D70"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
