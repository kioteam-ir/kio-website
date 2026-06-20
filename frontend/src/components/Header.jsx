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
    console.log("sex");
  }, []);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="relative w-full pt-0 md:pt-5">
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} />
          {!loginData && (
            <div className="flex items-center gap-4">
              <NavbarButton to="/login" variant="secondary">
                ورود
              </NavbarButton>
              <NavbarButton to="/signup" variant="primary">
                ثبتنام
              </NavbarButton>
            </div>
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
            <div className="flex w-full flex-col gap-4">
              <NavbarButton
                to="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                variant="primary"
                className="w-full"
              >
                ورود
              </NavbarButton>
              <NavbarButton
                to="/signup"
                onClick={() => setIsMobileMenuOpen(false)}
                variant="primary"
                className="w-full"
              >
                ثبت‌نام
              </NavbarButton>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </div>
  );
}
