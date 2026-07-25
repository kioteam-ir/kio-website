import React from "react";
import { AnimatedTestimonials } from "./ui/animated-testimonials";

export default function Devs() {
  const testimonials = [
    {
      quote:
        "پشت هر دکمه‌ای که بی‌دردسر کار می‌کند، احتمالاً چند فنجان قهوه، چند ساعت دیباگ و مقدار قابل توجهی منطق پنهان شده است. ساختن زیرساخت‌هایی که دیده نمی‌شوند اما همه‌چیز به آن‌ها وابسته است، جذاب‌ترین بخش این مسیر است.",
      name: "یاسین افاضل",
      designation: "توسعه‌دهنده بک‌اند",
      src: "/dev/yasin.jfif",
    },
    {
      quote:
        "سلام! من یک توسعه‌دهنده کنجکاو فرانت‌اند هستم که با React، Tailwind و کمی جادوی Aceternity UI ✨ وب‌سایت‌های جذاب می‌سازم. کدنویسی، قهوه و یادگیری مداوم بخشی از مسیر من هستند...",
      name: "محمد اشرفی",
      designation: "توسعه‌دهنده فرانت‌اند",
      src: "/dev/mamad.jfif",
    },
    {
      quote:
        "من یک توسعه‌دهنده بک‌اند با مهارت در پایتون و جنگو هستم و به ساخت برنامه‌های وب مقیاس‌پذیر علاقه دارم. مشتاق یادگیری، رشد و مشارکت در پروژه‌های واقعی با کدنویسی تمیز و کارآمد هستم.",
      name: "محمد حسین کوهکن",
      designation: "مهندس DevOps",
      src: "/dev/hoos.webp",
    },
  ];

  return (
    <div
      dir="rtl"
      className="2xl:max-w-7xl xl:max-w-6xl lg:max-w-4xl md:max-w-2xl sm:max-w-xl max-w-lg mx-auto sm:px-0 px-2"
    >
      <h2 className="text-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-cyan-500  lg:mb-8 mt-10 tracking-tight">
        توسعه‌دهندگان
      </h2>

      <AnimatedTestimonials testimonials={testimonials} />
    </div>
  );
}
