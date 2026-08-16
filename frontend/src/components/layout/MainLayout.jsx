import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { BackToTop } from "./BackToTop";
import CursorFollower from "./../ui/CursorFollower";

/** Shared page chrome: sticky nav, blueprint-grid backdrop, footer, back-to-top. */
export function MainLayout({ children, showChrome = true }) {
  return (
    <div className="relative min-h-screen overflow-hidden text-white">
      <div
        className="pointer-events-none absolute inset-0 bg-blueprint-grid bg-ink-vignette"
        aria-hidden="true"
      />
      <div className="relative">
        {showChrome && <Navbar />}
        <div className="mb-20"></div>
        {children}
        {showChrome && <Footer />}
      </div>
      <BackToTop />
      <CursorFollower />
    </div>
  );
}
