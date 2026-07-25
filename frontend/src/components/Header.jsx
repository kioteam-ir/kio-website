import { Link } from "react-router-dom";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "../components/ui/resizable-navbar";
import { useEffect, useState } from "react";
import { fetcher } from "../core/fetcher";

const navItems = [
  { name: "خانه", link: "#" },
  { name: "درباره ما", link: "#" },
  { name: "تماس با ما", link: "#" },
  { name: "رزومه", link: "#" },
];

const UserAvatar = ({ className = "" }) => (
  <NavbarButton
    className={`cursor-pointer hover:scale-105 bg-transparent items-center
    align-middle text-center h-12 w-12 p-2 rounded-full border
    border-cyan-500 transition-transform duration-200 ${className}`}
  >
    <svg
      width="30"
      height="30"
      viewBox="0 0 40 40"
      fill="none"
      className="pointer-events-none"
    >
      <circle cx="20" cy="14" r="7" fill="#6B7280" />
      <ellipse cx="20" cy="34" rx="12" ry="9" fill="#6B7280" />
    </svg>
  </NavbarButton>
);

const AuthButtons = () => (
  <div className="flex items-center gap-4">
    <NavbarButton to="/login" variant="primary">
      ورود / ثبتنام
    </NavbarButton>
  </div>
);

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const verifyAuth = async () => {
      const access_token = localStorage.getItem("access_token");
      const refresh_token = localStorage.getItem("refresh_token");

      console.log(access_token, refresh_token);

      if (!access_token && !refresh_token) {
        setIsAuthenticated(false);
        return;
      }

      if (access_token) {
        try {
          await fetcher.verify_token(access_token);
          setIsAuthenticated(true);
          return;
        } catch {
          // Access token invalid or expired — fall through to refresh
        }
      }

      if (refresh_token) {
        try {
          await fetcher.verify_token(refresh_token);
          const newTokens = await fetcher.refresh_token(refresh_token);
          localStorage.setItem("access_token", newTokens.access_token);
          if (newTokens.refresh_token) {
            localStorage.setItem("refresh_token", newTokens.refresh_token);
          }
          setIsAuthenticated(true);
          return;
        } catch {
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          setIsAuthenticated(false);
        }
      } else {
        setIsAuthenticated(false);
      }
    };

    verifyAuth();
  }, []);

  return (
    <div className="sticky top-0 w-full pt-0 md:pt-5 z-50">
      <Navbar className="backdrop-blur-m shadow-lg">
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} />

          {/* Auth state: null = loading, true = logged in, false = logged out */}
          {isAuthenticated === null ? (
            <div className="h-10 w-24 rounded-xl bg-neutral-800 animate-pulse" />
          ) : isAuthenticated ? (
            <UserAvatar />
          ) : (
            <AuthButtons />
          )}
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
            className="backdrop-blur-md mt-9"
          >
            <div className="w-full text-cyan-500 mt-5 grid grid-cols-2 gap-y-10 align-middle items-center">
              {navItems.map((item, idx) => (
                <Link
                  key={idx}
                  to={item.link}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="relative text-center hover:scale-110 transition-all font-bold w-full duration-300"
                >
                  <span className="block border border-gray-500 rounded-[5px] py-8 mx-15 text-[18px] text-center align-middle">
                    {item.name}
                  </span>
                </Link>
              ))}
            </div>

            <div className="w-full flex justify-center mt-2">
              {isAuthenticated === null ? (
                <div className="h-10 w-24 rounded-xl bg-neutral-800 animate-pulse" />
              ) : isAuthenticated ? (
                <UserAvatar />
              ) : (
                <AuthButtons />
              )}
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </div>
  );
}
