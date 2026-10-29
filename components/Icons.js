const make = (paths) =>
  function Icon({ size = 16, ...p }) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
        strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...p}>
        {paths}
      </svg>
    );
  };
export const Shield = make(<><path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3z" /><path d="M9 12l2 2 4-4" /></>);
export const Swatch = make(<><path d="M4 20l6-6M14 4l6 6-9 9a3 3 0 0 1-4.2 0l-1.8-1.8a3 3 0 0 1 0-4.2L14 4z" /><circle cx="15" cy="9" r="1" /></>);
export const Truck = make(<><path d="M3 6h11v10H3zM14 9h4l3 3v4h-7" /><circle cx="7" cy="18" r="2" /><circle cx="17" cy="18" r="2" /></>);
export const ArrowUpRight = make(<path d="M7 17L17 7M8 7h9v9" />);
export const ArrowRight = make(<path d="M5 12h14M13 6l6 6-6 6" />);
export const Cube = make(<path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3zM12 12l8-4.5M12 12v9M12 12L4 7.5" />);
export const SofaIcon = make(<path d="M5 11V8a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v3M3 13a2 2 0 0 1 4 0v2h10v-2a2 2 0 0 1 4 0v5H3v-5zM6 18v2M18 18v2" />);
export const Rotate = make(<path d="M21 12a9 9 0 1 1-3-6.7L21 8M21 3v5h-5" />);
export const Copy = make(<><rect x="9" y="9" width="11" height="11" rx="2" /><path d="M5 15V6a2 2 0 0 1 2-2h9" /></>);
export const Check = make(<path d="M5 12l5 5 9-10" />);
export const Tree = make(<path d="M12 3l5 7h-3l4 6H6l4-6H7l5-7zM12 16v5" />);
export const Layers = make(<path d="M12 3l9 5-9 5-9-5 9-5zM3 13l9 5 9-5" />);
export const Droplet = make(<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z" />);
export const Factory = make(<path d="M3 21V10l6 4V10l6 4V6h3v15H3z" />);
export const Send = make(<path d="M21 3L3 11l7 3 3 7 8-18z" />);
export const Wrench = make(<path d="M14.7 6.3a4 4 0 0 0-5 5L3 18l3 3 6.7-6.7a4 4 0 0 0 5-5l-2.4 2.4-2.6-.6-.6-2.6 2.6-2.2z" />);
