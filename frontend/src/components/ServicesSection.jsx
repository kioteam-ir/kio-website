// "use client";
// import React from "react";
// import { LinkPreview } from "./ui/link-preview";

// export default function ServicesSection() {
//   return (
//       <div className="2xl:max-w-7xl xl:max-w-6xl lg:max-w-4xl md:max-w-2xl sm:max-w-xl max-w-lg mx-auto sm:px-0 px-2">
//         {/* Section Title */}
//         <h2 className="text-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-cyan-500 mb-16 lg:mb-16 tracking-tight">
//           Our Services
//         </h2>

//         {/* Services Grid */}
//         <div className="flex flex-col gap-4 lg:gap-10 max-w-5xl px-2 mx-auto">
//           {/* Service 1: Modern Frontend */}
//           <div className="group space-y-2">
//             <p className="text-neutral-300 text-lg md:text-xl leading-relaxed">
//               Modern, responsive web application development using{" "}
//               <LinkPreview
//                 url="https://react.dev"
//                 className="font-bold text-cyan-400 hover:text-cyan-300 transition-colors"
//               >
//                 React
//               </LinkPreview>{" "}
//               and{" "}
//               <LinkPreview
//                 url="https://tailwindcss.com"
//                 className="font-bold text-cyan-400 hover:text-cyan-300 transition-colors"
//               >
//                 Tailwind CSS
//               </LinkPreview>
//               .
//             </p>
//             <p className="text-neutral-300 text-base md:text-lg">
//               We leverage advanced 
//               <LinkPreview 
//                 url="https://motion.dev"
//                 className="font-bold text-cyan-400 hover:text-cyan-300 transition-colors">{" "} Framer Motion {" "}
//               </LinkPreview> 
//               animations and professional 
//               <LinkPreview url="https://ui.aceternity.com" className="font-bold text-cyan-400 hover:text-cyan-300 transition-colors">
//               {" "}  Acernity UI {" "}
//               </LinkPreview> components to deliver a world-class user experience.
//             </p>
//           </div>

//           {/* Service 2: Powerful Backend */}
//           <div className="group space-y-2">
//             <p className="text-neutral-300 text-lg md:text-xl leading-relaxed">
//               Robust, secure, and scalable backend development with{" "}
//               <LinkPreview
//                 url="https://www.djangoproject.com"
//                 className="font-bold text-cyan-400 hover:text-cyan-300 transition-colors"
//               >
//                 Django
//               </LinkPreview>{" "}
//               and {" "} 
//               <LinkPreview
//                 url="https://www.python.org"
//                 className="font-bold text-cyan-400 hover:text-cyan-300 transition-colors"
//                 >
//                 Python.
//               </LinkPreview>
//             </p>
//             <p className="text-neutral-300 text-base md:text-lg">
//               Professional REST APIs, secure JWT authentication, custom admin panels, and infrastructure ready for rapid business growth.
//             </p>
//           </div>

//           {/* Service 3: Custom Dashboards */}
//           <div className="group space-y-2">
//             <p className="text-neutral-300 text-lg md:text-xl leading-relaxed">
//               Design and development of custom dashboards and advanced admin panels.
//             </p>
//             <p className="text-neutral-300 text-base md:text-lg">
//               Full control over your data, real-time analytics, beautiful and efficient UI — tailored precisely to your business needs.
//             </p>
//           </div>

//           {/* Service 4: Landing Pages & Portfolios */}
//           <div className="group space-y-2">
//             <p className="text-neutral-300 text-lg md:text-xl leading-relaxed">
//               High-converting landing pages and stunning portfolio websites.
//             </p>
//             <p className="text-neutral-300 text-base md:text-lg">
//               Websites that not only attract clients but also serve as living showcases of our expertise — just like the one you're viewing right now.
//             </p>
//           </div>
//         </div>
//       </div>
//   );
// }



"use client";
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