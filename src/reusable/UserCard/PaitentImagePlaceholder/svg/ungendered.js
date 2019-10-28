import React from 'react';

const Ungendered = (props) => (
  <svg
    data-name="Patient Image Placeholder - Ungendered"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 70 80"
    {...props}
  >
    <defs>
      <clipPath id="a">
        <rect width={70} height={80} fill="none" />
      </clipPath>
      <clipPath id="b">
        <path
          d="M45 56.32l-10 1.81-10-1.81a23.31 23.31 0 0 1-5.24 13.78S24.13 73 35 73s15.14-2.9 15.14-2.9A23.26 23.26 0 0 1 45 56.32z" // eslint-disable-line max-len
          fill="none"
        />
      </clipPath>
    </defs>
    <rect width={70} height={80} fill="#d1d2d2" />
    <polygon points="70 80 0 80 70 0 70 80" fill="#5c5c5c" opacity="0.1" />
    <g clipPath="url(#a)">
      <path
        d="M78.73 88.18c-1.14-4.12-3-8.53-5.45-10.34-6.52-4.76-23.08-8-23.08-8H19.8s-16.56 3.26-23.08 8c-2.46 1.81-4.3 6.22-5.45 10.34z" // eslint-disable-line max-len
        fill="#5e5f5f"
      />
      <path
        d="M45 56.07l-10 1.81-10-1.81a23.22 23.22 0 0 1-5.18 13.77s4.36 2.88 15.18 2.88 15.19-2.88 15.19-2.88A23.14 23.14 0 0 1 45 56.07z" // eslint-disable-line max-len
        fill="#919191"
      />
      <g opacity="0.5" clipPath="url(#b)">
        <path
          d="M56.11 45.78a2.43 2.43 0 1 1-4.86 0V35.57a2.43 2.43 0 0 1 4.86 0zm-37.46 0a2.43 2.43 0 0 1-4.86 0V35.57a2.43 2.43 0 0 1 4.86 0z" // eslint-disable-line max-len
          fill="#ae9eb5"
        />
        <path
          d="M54 29.05a19 19 0 1 0-38.06 0V44.9l.3-.17S14.66 57.8 31.77 66.67a11 11 0 0 0 3.18.61 11 11 0 0 0 3.18-.61c17.11-8.87 15.55-21.94 15.55-21.94l.3.17z" // eslint-disable-line max-len
          fill="#544563"
          opacity="0.2"
          style={{ isolation: 'isolate' }}
        />
      </g>
      <path
        d="M56.16 40.75a2.43 2.43 0 1 1-4.86 0V30.54a2.43 2.43 0 0 1 4.86 0zm-37.46 0a2.43 2.43 0 0 1-4.86 0V30.54a2.43 2.43 0 0 1 4.86 0z" // eslint-disable-line max-len
        fill="#aeaeae"
      />
      <path
        d="M54 24a19 19 0 0 0-38 0v15.86l.3-.17s-1.56 13.08 15.55 22a11 11 0 0 0 3.18.61 11 11 0 0 0 3.18-.61c17.11-8.87 15.55-22 15.55-22l.3.17V24z" // eslint-disable-line max-len
        fill="none"
      />
      <path
        d="M54 24a19 19 0 0 0-38 0v15.86l.3-.17s-1.56 13.08 15.55 22a11 11 0 0 0 3.18.61 11 11 0 0 0 3.18-.61c17.11-8.87 15.55-22 15.55-22l.3.17V24z" // eslint-disable-line max-len
        fill="#aeaeae"
      />
    </g>
  </svg>
);

export default Ungendered;
