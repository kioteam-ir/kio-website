"use client";
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

export function Header() {
  const navItems = [
    {
      name: "خانه",
      link: "#",
    },
    {
      name: "درباره ما",
      link: "#",
    },
    {
      name: "تماس با ما",
      link: "#",
    },
    {
      name: "رزومه",
      link: "#",
    },
  ];

  const [loginData, setLoginData] = useState(null);
  useEffect(() => {
    const access_token = localStorage.getItem("access_token");
    const refresh_token = localStorage.getItem("refresh_token");
    setLoginData({
      access_token,
      refresh_token,
    });
  }, []);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="relative w-full pt-0 md:pt-5">
      <Navbar>
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} />
          {loginData === null ? (
            <div className="flex items-center gap-4">
              <NavbarButton to="/login" variant="secondary">
                ورود
              </NavbarButton>
              <NavbarButton to="/signup" variant="primary">
                ثبتنام
              </NavbarButton>
            </div>
          ) : (
            <NavbarButton
              className="cursor-pointer hover:scale-105 bg-transparent items-center
              align-middle text-center h-12 w-12 p-2 rounded-full border
              border-cyan-500 transition-transform duration-200"
            >
              <svg
                width="30"
                height="30"
                viewBox="0 0 40 40"
                fill="none"
                className="pointer-events-none" // ← ADD THIS
              >
                <circle cx="20" cy="14" r="7" fill="#6B7280" />
                <ellipse cx="20" cy="34" rx="12" ry="9" fill="#6B7280" />
              </svg>
            </NavbarButton>
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
          >
            {navItems.map((item, idx) => (
              <Link
                key={idx}
                to={`/${item.link}`}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative text-center font-bold w-full text-neutral-600 dark:text-neutral-300"
              >
                <span className="block">{item.name}</span>
              </Link>
            ))}
            {loginData === null ? (
              <div className="flex items-center gap-4">
                <NavbarButton to="/login" variant="secondary">
                  ورود
                </NavbarButton>
                <NavbarButton to="/signup" variant="primary">
                  ثبتنام
                </NavbarButton>
              </div>
            ) : (
              <div className="w-full text-center">
                <NavbarButton
                  className="cursor-pointer hover:scale-105 bg-transparent items-center
                align-middle text-center h-12 w-12 p-2 rounded-full border
              border-cyan-500 transition-transform duration-200"
                >
                  <svg
                    width="30"
                    height="30"
                    viewBox="0 0 40 40"
                    fill="none"
                    className="pointer-events-none" // ← ADD THIS
                  >
                    <circle cx="20" cy="14" r="7" fill="#6B7280" />
                    <ellipse cx="20" cy="34" rx="12" ry="9" fill="#6B7280" />
                  </svg>
                </NavbarButton>
              </div>
            )}
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </div>
  );
}
