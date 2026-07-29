import React from "react";
import { Highlight } from "./ui/hero-highlight";

export default function Hero() {
  return (
    <div
      dir="rtl"
      className="mb-20 2xl:max-w-7xl xl:max-w-6xl lg:max-w-4xl md:max-w-2xl sm:max-w-xl max-w-lg mx-auto mt-7 md:mt-20 sm:px-0 px-2"
    >
      <div className="flex flex-col md:flex-row items-center justify-center md:justify-baseline lg:justify-between w-full xl:w-5/6 mx-auto">
        <div className="space-y-5 w-full font-bold">
          <div>
            <Highlight className="text-3xl sm:text-4xl md:text-3xl lg:text-5xl text-cyan-500">
              Kio Team
            </Highlight>
            <h3 className="text-4xl md:text-3xl lg:text-5xl text-cyan-500 mt-5">
              آینده رو بسازیم
            </h3>
          </div>
          <p className="max-w-125 font-light text-[16px] leading-8">
            تیم کایو ارائه دهنده خدمات مختلف در زمینه تولید نرم افزارهای تحت وب
            و ارائه خدمات میزبانی می باشد. هدف اصلی تیم ایجاد و ارتقاء جایگاه
            کسب و کار شما در دنیای وب می‌باشد و در این راستا راهکار های لازم را
            با در نظر گرفتن استاندارد های روز ارائه می‌کند. پشتیبانی به موقع و
            با کیفیت یکی از مهمترین اهداف این مجموعه است.
          </p>
          <div className="pt-4 lg:pt-7">
            <a
              href="#contact"
              className="inline-block px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-md font-semibold text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 rounded-2xl shadow-lg hover:shadow-purple-500/40 transition-all duration-300 transform hover:scale-105"
            >
              شروع کنید
            </a>
          </div>
        </div>
        <div className="mt-10">
          <img
            src="/404-computer.svg"
            alt="web3-img"
            className="w-full  md:w-3/4 lg:w-full"
          />
        </div>
      </div>
    </div>
  );
}
