import type { SVGProps } from "react";

const base = (props: SVGProps<SVGSVGElement>) => ({
  width: 22,
  height: 22,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  ...props,
});

export const Close = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
);

export const ChevronRight = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <path d="M9 5l7 7-7 7" />
  </svg>
);

export const ChevronDown = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <path d="M5 9l7 7 7-7" />
  </svg>
);

export const ArrowRight = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <path d="M4 12h15M13 6l6 6-6 6" />
  </svg>
);

export const Eye = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <path d="M2.4 12S6 5.6 12 5.6 21.6 12 21.6 12 18 18.4 12 18.4 2.4 12 2.4 12Z" />
    <circle cx="12" cy="12" r="2.9" />
  </svg>
);

export const Key = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <rect x="3" y="7" width="18" height="11" rx="2.4" />
    <path d="M7 11.2h2.2M11 11.2h2.2M15 11.2h2.2M8 14.6h8" />
  </svg>
);

export const Rotate = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <path d="M4.5 12a7.5 7.5 0 1 0 2.6-5.7" />
    <path d="M4 4v4.4h4.4" />
  </svg>
);

export const Download = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <path d="M12 3.5v11M7.6 10.4 12 14.8l4.4-4.4M4.5 19.5h15" />
  </svg>
);

export const Upload = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <path d="M12 15V4M7.6 8.4 12 4l4.4 4.4M4.5 19.5h15" />
  </svg>
);

export const Plus = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export const Share = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <path d="M12 3.5v10M8.4 7.1 12 3.5l3.6 3.6" />
    <path d="M5.5 12.5v6.2a1.8 1.8 0 0 0 1.8 1.8h9.4a1.8 1.8 0 0 0 1.8-1.8v-6.2" />
  </svg>
);

export const Today = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <rect x="3.5" y="5" width="17" height="15.5" rx="2.4" />
    <path d="M3.5 10h17M8 3.2v3.4M16 3.2v3.4M8 14h2.4M8 17.2h6" />
  </svg>
);

export const Library = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <path d="M4 4.6h5.4v15H4zM14.6 4.6H20v15h-5.4zM9.4 8.4h5.2" />
  </svg>
);

export const Sliders = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <path d="M4 8h9M17 8h3M4 16h3M11 16h9" />
    <circle cx="15" cy="8" r="2.1" />
    <circle cx="9" cy="16" r="2.1" />
  </svg>
);

export const Bulb = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <path d="M9.2 17.4h5.6M10 20.2h4" />
    <path d="M12 3.2a6 6 0 0 0-3.4 10.9c.5.4.8 1 .8 1.7v1.6h5.2v-1.6c0-.7.3-1.3.8-1.7A6 6 0 0 0 12 3.2Z" />
  </svg>
);

export const Check = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <path d="M4.5 12.6l4.7 4.7L19.5 7" />
  </svg>
);

export const Heart = (p: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width={22} height={22} aria-hidden="true" {...p}>
    <path
      d="M12 21C12 21 2.2 15.2 2.2 8.9 2.2 5.7 4.7 3.4 7.6 3.4c2 0 3.7 1.2 4.4 2.8.7-1.6 2.4-2.8 4.4-2.8 2.9 0 5.4 2.3 5.4 5.5C21.8 15.2 12 21 12 21Z"
      fill="currentColor"
    />
    <path d="M9.3 12.9 12 9.5l2.7 3.4" fill="none" stroke="var(--brass)" strokeWidth="1.7" strokeLinejoin="miter" />
  </svg>
);
