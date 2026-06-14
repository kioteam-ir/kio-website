import React from "react";

export default function ContactForm() {
  return (
    <section dir="rtl" className="py-20 lg:py-28 bg-gray-900" id="contact">
      <div className="2xl:max-w-7xl xl:max-w-6xl lg:max-w-5xl md:max-w-3xl sm:max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-2xl sm:text-3xl md:text-4xl font-bold text-cyan-500 mb-4">
          ایده شما را به واقعیت تبدیل می‌کنیم
        </h2>

        <p className="text-center text-neutral-400 text-base md:text-lg mb-16 max-w-3xl mx-auto leading-loose">
          جزئیات پروژه خود را با ما در میان بگذارید تا بهترین راهکار را برای
          توسعه کسب‌وکار و حضور دیجیتال شما ارائه دهیم.
        </p>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Form */}
          <div className="space-y-3">
            <form className="space-y-5">
              <div>
                <label
                  htmlFor="projectName"
                  className="block text-sm font-medium text-neutral-300 mb-2"
                >
                  نام پروژه
                </label>

                <input
                  id="projectName"
                  type="text"
                  className="w-full px-5 py-3 text-right bg-gray-900 border border-cyan-500/30 rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                  placeholder="مثال: فروشگاه اینترنتی"
                />
              </div>

              <div>
                <label
                  htmlFor="projectType"
                  className="block text-sm font-medium text-neutral-300 mb-2"
                >
                  نوع پروژه
                </label>

                <input
                  id="projectType"
                  type="text"
                  className="w-full px-5 py-3 text-right bg-gray-900 border border-cyan-500/30 rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                  placeholder="مثال: فروشگاهی، شرکتی، خبری، آموزشی"
                />
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-neutral-300 mb-2"
                >
                  توضیحات پروژه
                </label>

                <textarea
                  id="description"
                  rows={6}
                  className="w-full px-5 py-3 text-right bg-gray-900 border border-cyan-500/30 rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all resize-none leading-loose"
                  placeholder="ایده، امکانات مورد نیاز، زمان‌بندی و بودجه تقریبی پروژه را توضیح دهید..."
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 text-lg font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white rounded-xl shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
                >
                  ثبت درخواست مشاوره
                </button>
              </div>
            </form>
          </div>

          {/* Image */}
          <div className="flex justify-center lg:justify-start">
            <img
              src="/person-playing-3d-video-games-device.png"
              alt="مشاوره و توسعه پروژه"
              className="w-full h-full rounded-2xl bg-gray-900"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
