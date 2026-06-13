import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section
      dir="rtl"
      className="min-h-screen bg-gray-900 flex items-center justify-center"
    >
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-md flex flex-col items-center justify-center text-center">
          <h1 className="mb-4 text-7xl lg:text-9xl font-extrabold text-cyan-500">
            ۴۰۴
          </h1>

          <h2 className="mb-4 text-3xl md:text-4xl font-bold text-white">
            صفحه مورد نظر پیدا نشد
          </h2>

          <p className="mb-8 text-lg text-neutral-300 leading-loose max-w-xl">
            متأسفیم، صفحه‌ای که به دنبال آن هستید وجود ندارد یا به آدرس دیگری
            منتقل شده است. برای ادامه می‌توانید به صفحه اصلی بازگردید.
          </p>

          <img
            src="/404-computer.svg"
            alt="صفحه پیدا نشد"
            className="w-full max-w-md mb-8"
          />

          <Link
            to="/"
            className="inline-flex items-center justify-center px-8 py-3 text-lg font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 rounded-xl shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
          >
            بازگشت به صفحه اصلی
          </Link>
        </div>
      </div>
    </section>
  );
}
