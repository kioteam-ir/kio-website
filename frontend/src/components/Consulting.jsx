import React from "react";

export default function Consulting() {
  return (
    <div className="2xl:max-w-7xl h-150 mb-15 overflow-hidden xl:max-w-6xl lg:max-w-5xl md:max-w-4xl sm:max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
      <div className="grid lg:grid-cols-3 gap-8 lg:gap-16 items-center">
        <div className="hidden lg:block">
          <div className="rounded-3xl overflow-hidden border-4 border-purple-500/30 shadow-2xl">
            <img
              src="/grow-w.png"
              alt="Woman writing notes"
              className="w-full h-125 object-cover rounded-3xl"
            />
          </div>
        </div>

        <div
          dir="rtl"
          className=" text-center space-y-8 lg:space-y-12 lg:col-span-1"
        >
          <h2 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-white leading-tight">
            با هم رشد کنیم.
          </h2>

          <p className="text-neutral-300 tto text-base lg:text-lg leading-relaxed max-w-3xl mx-auto">
            شما دانش ارزشمندی درباره بازار و خدمات خود در اختیار دارید.
            <br className="hidden sm:block" />
            این اطلاعات برای ما اهمیت زیادی دارد، زیرا یک راهکار دیجیتال موفق با
            همکاری و تعامل ساخته می‌شود.
            <br className="hidden sm:block" />
            به همین دلیل هیچ پروژه‌ای بدون یک جلسه آغازین دقیق شروع نمی‌شود و ما
            روش‌های همکاری مؤثری را برای پیشبرد پروژه‌ها توسعه داده‌ایم.
            <br className="hidden sm:block" />
            مشارکت شما در تمام مراحل پروژه، کنترل و اطمینان بیشتری به همراه
            خواهد داشت.
          </p>

          <div className="pt-4 lg:pt-7">
            <a
              href="#contact"
              className="inline-block px-6 sm:px-8 py-1 sm:py-3 text-lg sm:text-xl font-semibold text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 rounded-full shadow-lg hover:shadow-purple-500/40 transition-all duration-300 transform hover:scale-105"
            >
              تماس با ما
            </a>
          </div>
        </div>

        <div className="hidden lg:block">
          <div className="rounded-3xl overflow-hidden border-4 border-pink-500/30 shadow-2xl">
            <img
              src="/grow-m.png"
              alt="Man thinking on laptop"
              className="w-full h-125 object-cover rounded-3xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
