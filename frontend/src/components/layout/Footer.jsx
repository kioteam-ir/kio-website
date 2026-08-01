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
  { label: "گیت‌هاب", href: "https://github.com/ashrafi-frontDeveloper", icon: IconGithub },
  { label: "تلگرام", href: "https://t.me/YourTelegramID", icon: IconTelegram },
  { label: "اینستاگرام", href: "https://instagram.com/YourInstagramID", icon: IconInstagram },
  { label: "ایمیل", href: "mailto:hello@kio.team", icon: IconEmail },
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
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 sm:flex-row">
      <Input
        type="email"
        placeholder="ایمیل شما"
        value={email}
        onChange={(e) => { setEmail(e.target.value); setStatus("idle"); }}
        error={status === "error"}
        className="sm:max-w-[220px]"
      />
      <Button type="submit" size="md" className="shrink-0">
        {status === "success" ? <IconCheck className="h-4 w-4" /> : "عضویت"}
      </Button>
    </form>
  );
}

export function Footer() {
  return (
    <footer dir="rtl" className="relative border-t border-slate-800 bg-slate-950">
      <Container className="py-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div className="space-y-5">
            <Link to="/" className="flex items-center gap-2.5 text-2xl font-bold text-white">
              <img src="/logo.png" alt="Kio" className="h-11 w-11" />
              Kio
            </Link>
            <p className="max-w-sm text-sm leading-7 text-slate-400">
              تیم کایو ارائه‌دهنده خدمات توسعه نرم‌افزار تحت وب، طراحی رابط کاربری و میزبانی است. ما
              محصولات دیجیتال را با دقت یک نقشه مهندسی می‌سازیم.
            </p>
            <div>
              <p className="mb-2 font-mono text-xs tracking-wide text-slate-500">تازه‌های کایو را از دست ندهید</p>
              <NewsletterForm />
            </div>
          </div>

          <div>
            <h3 className="mb-5 font-mono text-xs uppercase tracking-widest text-slate-500">نقشه سایت</h3>
            <ul className="space-y-3 text-sm">
              {SITEMAP_LINKS.map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="text-slate-400 transition-colors hover:text-brand-blue-300">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-5 font-mono text-xs uppercase tracking-widest text-slate-500">خدمات</h3>
            <ul className="space-y-3 text-sm">
              {SERVICE_LINKS.map((label) => (
                <li key={label} className="text-slate-400">{label}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-5 font-mono text-xs uppercase tracking-widest text-slate-500">راه‌های ارتباطی</h3>
            <ul className="space-y-4 text-sm text-slate-400">
              <li className="flex items-start gap-2.5">
                <IconMapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-blue-400" />
                <span>ایران — کرمانشاه</span>
              </li>
              <li className="flex items-start gap-2.5">
                <IconPhone className="mt-0.5 h-4 w-4 shrink-0 text-brand-crimson-400" />
                <span dir="ltr" className="text-end">+98 912 000 0000</span>
              </li>
              <li className="flex items-start gap-2.5">
                <IconEmail className="mt-0.5 h-4 w-4 shrink-0 text-brand-blue-400" />
                <span dir="ltr" className="text-end">hello@kio.team</span>
              </li>
            </ul>

            <div className="mt-5 flex gap-3">
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

        <div className="mt-14 flex flex-col items-center gap-4 border-t border-slate-800 pt-6 sm:flex-row sm:justify-between">
          <span className="font-mono text-xs text-slate-500">© ۱۴۰۴ Kio — تمامی حقوق محفوظ است.</span>
          <div className="flex gap-6 text-xs text-slate-500">
            {LEGAL_LINKS.map((link) => (
              <a key={link.label} href={link.href} className="hover:text-brand-blue-300">{link.label}</a>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
