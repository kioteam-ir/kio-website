import React, { useReducer, useState } from "react";
import { fetcher } from "../core/fetcher";

// ─── Reducer ──────────────────────────────────────────────────────────────────

const initialState = {
  title: "",
  project_type: "",
  phone_number: "",
  description: "",
};

const formReducer = (state, action) => {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.field]: action.value };
    case "RESET":
      return initialState;
    default:
      return state;
  }
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function ContactForm() {
  const [formState, dispatch] = useReducer(formReducer, initialState);
  const [status, setStatus] = useState("idle"); // "idle" | "loading" | "success" | "error"
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    dispatch({
      type: "SET_FIELD",
      field: e.target.name,
      value: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    // Phone validation
    const phoneRegex = /^09\d{9}$/;
    if (!phoneRegex.test(formState.phone_number.trim())) {
      setErrorMsg("شماره تلفن معتبر نیست. فرمت صحیح: 09XXXXXXXXX");
      setStatus("error");
      return;
    }

    setStatus("loading");

    try {
      await fetcher.create_project(formState);
      setStatus("success");
      dispatch({ type: "RESET" });
    } catch (err) {
      const detail = err?.response?.data?.detail;
      setErrorMsg(
        typeof detail === "string"
          ? detail
          : Array.isArray(detail)
            ? detail.map((d) => d.msg).join(" | ")
            : "خطایی رخ داد. لطفاً دوباره تلاش کنید.",
      );
      setStatus("error");
    }
  };

  const isLoading = status === "loading";

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
            <form className="space-y-5" onSubmit={handleSubmit}>
              {/* Project name */}
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-neutral-300 mb-2"
                >
                  نام پروژه
                </label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  required
                  value={formState.title}
                  onChange={handleChange}
                  className="w-full px-5 py-3 text-right bg-gray-900 border border-cyan-500/30 rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                  placeholder="مثال: فروشگاه اینترنتی"
                />
              </div>

              {/* Project type */}
              <div>
                <label
                  htmlFor="project_type"
                  className="block text-sm font-medium text-neutral-300 mb-2"
                >
                  نوع پروژه
                </label>
                <input
                  id="project_type"
                  name="project_type"
                  type="text"
                  required
                  value={formState.project_type}
                  onChange={handleChange}
                  className="w-full px-5 py-3 text-right bg-gray-900 border border-cyan-500/30 rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                  placeholder="مثال: فروشگاهی، شرکتی، خبری، آموزشی"
                />
              </div>

              {/* Phone */}
              <div>
                <label
                  htmlFor="phone_number"
                  className="block text-sm font-medium text-neutral-300 mb-2"
                >
                  شماره تماس
                </label>
                <input
                  id="phone_number"
                  name="phone_number"
                  type="text"
                  required
                  value={formState.phone_number}
                  onChange={handleChange}
                  className="w-full px-5 py-3 text-right bg-gray-900 border border-cyan-500/30 rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                  placeholder="09XXXXXXXXX"
                />
              </div>

              {/* Description */}
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-neutral-300 mb-2"
                >
                  توضیحات پروژه
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={6}
                  required
                  value={formState.description}
                  onChange={handleChange}
                  className="w-full px-5 py-3 text-right bg-gray-900 border border-cyan-500/30 rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all resize-none leading-loose"
                  placeholder="ایده، امکانات مورد نیاز، زمان‌بندی و بودجه تقریبی پروژه را توضیح دهید..."
                />
              </div>

              {/* Error */}
              {status === "error" && (
                <p className="text-red-400 text-sm text-center bg-red-400/10 rounded-lg py-2 px-3">
                  {errorMsg}
                </p>
              )}

              {/* Success */}
              {status === "success" && (
                <p className="text-emerald-400 text-sm text-center bg-emerald-400/10 rounded-lg py-2 px-3">
                  درخواست شما با موفقیت ثبت شد. به زودی با شما تماس می‌گیریم.
                </p>
              )}

              {/* Submit */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 text-lg font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white rounded-xl shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? "در حال ارسال..." : "ثبت درخواست مشاوره"}
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
