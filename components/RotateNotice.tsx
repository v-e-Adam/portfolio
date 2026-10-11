/**
 * Full-screen message shown only when a phone is held in landscape.
 * (Browsers can't lock orientation on a normal web page, so this covers the
 * site until the phone is turned back upright.)
 * Visibility is controlled entirely by the `phone-landscape` variant in globals.css.
 */
export default function RotateNotice() {
  return (
    <div
      role="status"
      className="fixed inset-0 z-100 hidden flex-col items-center justify-center gap-4 bg-black p-8 text-center text-white phone-landscape:flex"
    >
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="h-14 w-14 animate-pulse"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="7" y="2" width="10" height="20" rx="2" />
        <path d="M11 19h2" />
      </svg>
      <p className="font-modestic text-2xl">Please rotate your phone</p>
      <p className="font-europa">This site is best viewed in portrait.</p>
    </div>
  );
}
