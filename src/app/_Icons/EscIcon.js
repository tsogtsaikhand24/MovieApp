import * as React from "react";
const EscIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={9}
    height={9}
    fill="none"
    {...props}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m8.5.5-8 8m0-8 8 8"
    />
  </svg>
);
export default EscIcon;
