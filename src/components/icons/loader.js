import React from 'react';

const IconLoader = () => (
  <svg id="logo" xmlns="http://www.w3.org/2000/svg" viewBox="-10 -50 400 400">
    <title>Loader Logo</title>
    <g transform="scale(2) translate(-40 -40)">
      <g
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        transform="rotate(20 120 120)"
      >
        {/* Star (wand top) */}
        <path
          d="
            M120 10
            L137 58
            L188 58
            L146 90
            L162 140
            L120 110
            L78 140
            L94 90
            L52 58
            L103 58
            Z
          "
        />

        {/* Wand handle */}
        <path d="M120 110 L120 210" strokeWidth="5" />

        {/* Sparkles/stars around the wand */}
        <g>
          <path d="M60 40 L64 44 M64 40 L60 44" />
          <path d="M180 30 L184 34 M184 30 L180 34" />
          <path d="M70 160 L74 164 M74 160 L70 164" />
          <path d="M190 160 L194 164 M194 160 L190 164" />
          <path d="M110 220 L112 225 M112 220 L110 225" />
          <path d="M150 100 L154 104 M154 100 L150 104" />
          <path d="M90 100 L94 104 M94 100 L90 104" />
        </g>
      </g>
    </g>
  </svg>
);

export default IconLoader;
