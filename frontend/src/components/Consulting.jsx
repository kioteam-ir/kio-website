import React from 'react'

export default function Consulting() {
  return (
    <div className="2xl:max-w-7xl xl:max-w-6xl lg:max-w-5xl md:max-w-4xl sm:max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">

      {/* کانتینر اصلی - فقط در lg و بزرگ‌تر سه ستونه */}
      <div className="grid lg:grid-cols-3 gap-8 lg:gap-16 items-center">

        {/* عکس سمت چپ - فقط در lg و بزرگ‌تر */}
        <div className="hidden lg:block">
          <div className="rounded-3xl overflow-hidden border-4 border-purple-500/30 shadow-2xl">
            <img
              src="/grow-w.png"
              alt="Woman writing notes"
              className="w-full h-auto object-cover rounded-3xl"
            />
          </div>
        </div>

        {/* متن مرکزی */}
        <div className="text-center space-y-8 lg:space-y-12 lg:col-span-1">
          <h2 className="text-lg sm:text-xl lg:text-2xl xl:text-4xl font-bold text-white leading-tight">
            Make you grow,<br className="hidden sm:inline" />
            together.
          </h2>

          <p className="text-neutral-300 text-base sm:text-lg lg:text-xl leading-relaxed max-w-3xl mx-auto">
            You have a lot to teach us about your market and your offering.<br className="hidden sm:block" />
            This valuable information deserves our full attention: because a digital solution is built together.<br className="hidden sm:block" />
            That's why a project never starts without a proper kick-off meeting, and why we've developed collaborative methodologies.<br className="hidden sm:block" />
            Involving you in every stage of the project gives you control.
          </p>

          {/* دکمه */}
          <div className="pt-6 lg:pt-10">
            <a
              href="#contact"
              className="inline-block px-8 sm:px-10 py-4 sm:py-5 text-lg sm:text-xl font-semibold text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 rounded-full shadow-lg hover:shadow-purple-500/40 transition-all duration-300 transform hover:scale-105"
            >
              Contact us
            </a>
          </div>
        </div>

        {/* عکس سمت راست - فقط در lg و بزرگ‌تر */}
        <div className="hidden lg:block">
          <div className="rounded-3xl overflow-hidden border-4 border-pink-500/30 shadow-2xl">
            <img
              src="/grow-m.png"
              alt="Man thinking on laptop"
              className="w-full h-auto object-cover rounded-3xl"
            />
          </div>
        </div>

      </div>

    </div>
  )
}