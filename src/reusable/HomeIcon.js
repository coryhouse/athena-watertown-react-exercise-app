import React from "react";

function HomeIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="24"
      viewBox="0 0 22 24"
      className={props.className}
    >
      <path
        fill="#333"
        fillRule="nonzero"
        stroke="none"
        strokeWidth="1"
        d="M10.9 23.806c0 .527-.413.954-.923.954H2.924c-.51 0-.924-.427-.924-.954V11.32c0-.27.111-.529.306-.71l10.098-9.365a.902.902 0 011.236.002l10.055 9.365c.194.18.305.438.305.708v11.62c0 1.006-.79 1.821-1.763 1.821h-6.214c-.51 0-.924-.427-.924-.954v-6.33h-4.198v6.33zM22.24 23V12.036L13 3.434l-9.24 8.603V23h5.256v-6.248c0-.52.417-.941.932-.941h6.104c.515 0 .932.421.932.941V23h5.256z"
        transform="translate(-2 -1)"
      ></path>
    </svg>
  );
}

export default HomeIcon;