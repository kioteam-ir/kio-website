import { useState } from "react";
import { Link } from "react-router-dom";
import { Container } from "../ui/Container";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { isValidEmail } from "../../utils/validators";
import {
  IconGithub,
  IconTelegram,
  IconInstagram,
  IconEmail,
  IconMapPin,
  IconPhone,
  IconCheck,
} from "../icons";

const SOCIAL_LINKS = [
  {
    label: "گیت‌هاب",
    href: "https://github.com/ashrafi-frontDeveloper",
    icon: IconGithub,
  },
  { label: "تلگرام", href: "https://t.me/YourTelegramID", icon: IconTelegram },
  {
    label: "اینستاگرام",
    href: "https://instagram.com/YourInstagramID",
    icon: IconInstagram,
  },
  { label: "ایمیل", href: "mailto:info@kioteam.ir", icon: IconEmail },
];

const SITEMAP_LINKS = [
  { label: "خانه", to: "/#top" },
  { label: "خدمات", to: "/#services" },
  { label: "فرآیند کار", to: "/#process" },
  { label: "نمونه‌کار", to: "/#projects" },
  { label: "تعرفه‌ها", to: "/#pricing" },
  { label: "سوالات متداول", to: "/#faq" },
];

const SERVICE_LINKS = [
  "توسعه اپلیکیشن وب",
  "طراحی UI/UX",
  "مشاوره فنی و معماری",
  "میزبانی و پشتیبانی",
  "توسعه API و بک‌اند",
];

const LEGAL_LINKS = [
  { label: "حریم خصوصی", href: "#" },
  { label: "شرایط و قوانین استفاده", href: "#" },
];

function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!isValidEmail(email)) {
      setStatus("error");
      return;
    }
    // TODO: connect to a real newsletter endpoint once it exists on the backend.
    setStatus("success");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center justify-center gap-2 sm:flex-row lg:justify-start"
    >
      <Input
        type="email"
        placeholder="ایمیل شما"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          setStatus("idle");
        }}
        error={status === "error"}
        className="w-full max-w-[280px] text-center sm:max-w-[220px] sm:text-start"
      />
      <Button
        type="submit"
        className="h-fit -mt-3 py-3.25 w-full max-w-[280px] sm:w-auto"
      >
        {status === "success" ? (
          <IconCheck className="h-4 w-4 mx-auto" />
        ) : (
          "عضویت"
        )}
      </Button>
    </form>
  );
}

export function Footer() {
  return (
    <footer
      dir="rtl"
      className="relative border-t border-slate-800 bg-slate-950"
    >
      <Container className="py-16 -mb-13">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          {/* Column 1: Brand & Newsletter */}
          <div className="flex flex-col items-center space-y-5 lg:items-start text-center lg:text-start">
            <Link
              to="/"
              className="flex items-center justify-center gap-2.5 text-2xl w-full font-bold text-white lg:justify-center"
            >
              <img
                src="/logo.png"
                alt="Kio"
                className="h-11 w-11 scale-250 -mt-5 mb-5"
              />
            </Link>
            <p className="max-w-sm text-sm leading-7 text-slate-400">
              تیم کایو ارائه‌دهنده خدمات توسعه نرم‌افزار تحت وب، طراحی رابط
              کاربری و میزبانی است. ما محصولات دیجیتال را با دقت یک نقشه مهندسی
              می‌سازیم.
            </p>
            <div className="w-full flex flex-col items-center lg:items-start mt-4">
              <p className="mb-3 font-mono text-xs tracking-wide text-slate-500">
                تازه‌های کایو را از دست ندهید
              </p>
              <NewsletterForm />
            </div>
          </div>

          {/* Column 2: Sitemap */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-start">
            <h3 className="mb-5 font-mono text-xs uppercase tracking-widest text-slate-500">
              نقشه سایت
            </h3>
            <ul className="flex flex-col items-center lg:items-start space-y-3 text-sm">
              {SITEMAP_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-slate-400 transition-colors hover:text-brand-blue-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-start">
            <h3 className="mb-5 font-mono text-xs uppercase tracking-widest text-slate-500">
              خدمات
            </h3>
            <ul className="flex flex-col items-center lg:items-start space-y-3 text-sm">
              {SERVICE_LINKS.map((label) => (
                <li key={label} className="text-slate-400">
                  {label}
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & Socials */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-start">
            <h3 className="mb-5 font-mono text-xs uppercase tracking-widest text-slate-500">
              راه‌های ارتباطی
            </h3>
            <ul className="flex flex-col items-center lg:items-start space-y-4 text-sm text-slate-400">
              <li className="flex items-center justify-center lg:justify-start gap-2.5">
                <IconMapPin className="h-4 w-4 shrink-0 text-brand-blue-400" />
                <span>ایران — کرمانشاه</span>
              </li>
              <li className="flex items-center justify-center lg:justify-start gap-2.5">
                <IconPhone className="h-4 w-4 shrink-0 text-brand-crimson-400" />
                <span dir="ltr">+98 912 000 0000</span>
              </li>
              <li className="flex items-center justify-center lg:justify-start gap-2.5">
                <IconEmail className="h-4 w-4 shrink-0 text-brand-blue-400" />
                <span dir="ltr">hello@kio.team</span>
              </li>
            </ul>

            <div className="mt-6 flex justify-center lg:justify-start gap-3">
              {SOCIAL_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="flex h-9 w-9 items-center justify-center rounded-md border border-slate-800 text-slate-400 transition-colors hover:border-brand-blue-400/40 hover:text-brand-blue-300"
                >
                  <link.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 flex flex-col items-center justify-center gap-4 border-t border-slate-800 pt-6 lg:flex-row lg:justify-between text-center lg:text-start">
          <span className="font-mono text-xs text-slate-500">
            © 1405 Kio — تمامی حقوق محفوظ است.
          </span>
          <div className="flex flex-wrap justify-center lg:justify-start gap-4 lg:gap-6 text-xs text-slate-500">
            {LEGAL_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-brand-blue-300"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
