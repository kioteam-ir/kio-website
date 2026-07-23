import React from "react";

const servicesData = [
  {
    id: "workshops",
    icon: "💬",
    title: "کارگاه‌ها",
    description:
      "فضایی برای گفتگو، تبادل نظر، ارائه ایده‌ها، خلق مشترک و تأیید مسیر پروژه.",
    type: "emoji",
  },
  {
    id: "figjam",
    icon: "✏️",
    title: "FigJam",
    description:
      "برای توسعه و بررسی ایده‌ها از FigJam استفاده می‌کنیم؛ یک تخته سفید دیجیتال عالی برای طوفان فکری و همکاری تیمی.",
    type: "emoji",
  },
  {
    id: "figma",
    icon: "figma-logo",
    title: "Figma",
    description:
      "برای طراحی رابط کاربری و تجربه کاربری پروژه، Figma ابزار اصلی ما برای ایده‌پردازی و طراحی است.",
    type: "figma",
  },
  {
    id: "development",
    icon: "</>",
    title: "توسعه",
    description:
      "برای توسعه وب‌سایت‌ها و اپلیکیشن‌ها از ابزارهایی مانند Webflow، Bubble، Shopify، WordPress و سایر فناوری‌های مدرن استفاده می‌کنیم.",
    type: "code",
  },
  {
    id: "asana",
    icon: "asana-logo",
    title: "Asana",
    description:
      "برای مدیریت پروژه، برنامه‌ریزی، پیگیری وظایف و هماهنگی تیم از Asana استفاده می‌کنیم.",
    type: "asana",
  },
];

const renderIcon = (service) => {
  if (service.type === "emoji" || service.type === "code") {
    return <div className="mb-5 text-5xl">{service.icon}</div>;
  }
  if (service.type === "figma") {
    return (
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
    );
  }
  if (service.type === "asana") {
    return (
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
    );
  }
  return null;
};

export default function ServicesSection() {
  return (
    <section className="p-8 flex items-center justify-center">
      <div className="w-full max-w-6xl rounded-4xl px-10 py-16 text-center">
        <h2 className="text-4xl md:text-5xl font-semibold">سرویس های ما</h2>

        <p className="mx-auto mt-6 max-w-3xl text-base md:text-lg leading-relaxed">
          ساختن یک تیم برای پروژه شما خوب است، اما داشتن یک{" "}
          <span className="font-semibold">سازمان‌دهی دقیق و بدون نقص</span> بهتر
          است. چرا؟ چون باعث افزایش بهره‌وری، صرفه‌جویی در زمان و خلق ایده‌های
          نو می‌شود.
        </p>

        <div
          dir="rtl"
          className="mt-20 flex flex-wrap items-start justify-center gap-12"
        >
          {servicesData.map((service) => (
            <div
              key={service.id}
              className="flex w-full flex-col items-center sm:w-full md:w-[calc(33.333%-2rem)] lg:w-[calc(20%-2rem)]"
            >
              {renderIcon(service)}
              <h3 className="text-2xl text-cyan-500 md:text-3xl font-medium">
                {service.title}
              </h3>
              <p className="mt-4 max-w-xs opacity-70 leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
