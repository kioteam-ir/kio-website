import React from "react";
import { LinkPreview } from "./ui/link-preview";

export default function ServicesSection() {
  return (
    <section className="bg-slate-900 p-8 flex items-center justify-center">
      <div className="w-full max-w-6xl rounded-4xl bg-cyan-500 px-10 py-16 text-center">
        <h2 className="text-4xl md:text-5xl font-semibold text-slate-900">
          سرویس های ما
        </h2>

        <p className="mx-auto mt-6 max-w-3xl text-base md:text-lg text-slate-800 leading-relaxed">
          ساختن یک تیم برای پروژه شما خوب است، اما داشتن یک{" "}
          <span className="font-semibold">سازمان‌دهی دقیق و بدون نقص</span>{" "}
          بهتر است. چرا؟ چون باعث افزایش بهره‌وری، صرفه‌جویی در زمان و خلق
          ایده‌های نو می‌شود.
        </p>

        <div className="mt-20 grid gap-12 md:grid-cols-3">
          <div className="flex flex-col items-center">
            <div className="mb-5 text-5xl">💬</div>

            <h3 className="text-2xl md:text-3xl font-medium text-slate-900">
              کارگاه‌ها
            </h3>

            <p className="mt-4 max-w-xs text-slate-800 leading-relaxed">
              فضایی برای گفتگو، تبادل نظر، ارائه ایده‌ها، خلق مشترک و تأیید
              مسیر پروژه.
            </p>
          </div>

          <div className="flex flex-col items-center">
            <div className="mb-5 text-5xl">✏️</div>

            <h3 className="text-2xl md:text-3xl font-medium text-slate-900">
              FigJam
            </h3>

            <p className="mt-4 max-w-xs text-slate-800 leading-relaxed">
              برای توسعه و بررسی ایده‌ها از FigJam استفاده می‌کنیم؛ یک تخته
              سفید دیجیتال عالی برای طوفان فکری و همکاری تیمی.
            </p>
          </div>

          <div className="flex flex-col items-center">
            <svg
              className="mb-5 h-12 w-12"
              viewBox="0 0 38 57"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="10" cy="10" r="9" fill="#F24E1E" />
              <circle cx="28" cy="10" r="9" fill="#FF7262" />
              <circle cx="10" cy="28" r="9" fill="#A259FF" />
              <circle cx="28" cy="28" r="9" fill="#1ABCFE" />
              <circle cx="10" cy="46" r="9" fill="#0ACF83" />
            </svg>

            <h3 className="text-2xl md:text-3xl font-medium text-slate-900">
              Figma
            </h3>

            <p className="mt-4 max-w-xs text-slate-800 leading-relaxed">
              برای طراحی رابط کاربری و تجربه کاربری پروژه، Figma ابزار اصلی ما
              برای ایده‌پردازی و طراحی است.
            </p>
          </div>
        </div>

        <div className="mt-16 grid gap-12 md:grid-cols-2 md:px-32">
          <div className="flex flex-col items-center">
            <div className="mb-5 text-5xl font-bold text-slate-900">
              {"</>"}
            </div>

            <h3 className="text-2xl md:text-3xl font-medium text-slate-900">
              توسعه
            </h3>

            <p className="mt-4 max-w-xs text-slate-800 leading-relaxed">
              برای توسعه وب‌سایت‌ها و اپلیکیشن‌ها از ابزارهایی مانند Webflow،
              Bubble، Shopify، WordPress و سایر فناوری‌های مدرن استفاده
              می‌کنیم.
            </p>
          </div>

          <div className="flex flex-col items-center">
            <svg
              className="mb-5 h-12 w-12"
              viewBox="0 0 60 60"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="30" cy="15" r="10" fill="#8E75FF" />
              <circle cx="15" cy="40" r="10" fill="#8E75FF" opacity="0.8" />
              <circle cx="45" cy="40" r="10" fill="#8E75FF" opacity="0.6" />
            </svg>

            <h3 className="text-2xl md:text-3xl font-medium text-slate-900">
              Asana
            </h3>

            <p className="mt-4 max-w-xs text-slate-800 leading-relaxed">
              برای مدیریت پروژه، برنامه‌ریزی، پیگیری وظایف و هماهنگی تیم از
              Asana استفاده می‌کنیم.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}