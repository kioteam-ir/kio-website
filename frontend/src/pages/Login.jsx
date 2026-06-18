import React, { useState } from "react";
import { Label } from "../components/ui/Lable";
import { Input } from "../components/ui/Input";
import { cn } from "../lib/utils";
import { Link } from "react-router-dom";
import { fetcher } from "../core/fetcher";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    fetcher.login(email, password);
  };

  return (
    <div
      dir="rtl"
      className="bg-gray-900 min-h-screen pt-20 px-4 flex items-center justify-center"
    >
      <div className="shadow-input w-full max-w-md rounded-2xl bg-black/50 p-6 md:p-8">
        <h2 className="flex flex-col space-y-4 text-center text-xl font-bold text-neutral-200">
          <span>ورود به حساب کاربری</span>

          <Link
            to="/signup"
            className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            حساب کاربری ندارید؟ ثبت‌نام کنید
          </Link>
        </h2>

        <form className="my-8" onSubmit={handleSubmit}>
          <LabelInputContainer className="mb-5">
            <Label htmlFor="email">ایمیل</Label>

            <Input
              id="email"
              placeholder="example@gmail.com"
              type="email"
              className="text-right"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </LabelInputContainer>

          <LabelInputContainer className="mb-5">
            <Label htmlFor="password">رمز عبور</Label>

            <Input
              id="password"
              placeholder="••••••••"
              type="password"
              className="text-right"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </LabelInputContainer>

          <button
            className="group/btn cursor-pointer relative block h-11 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset]"
            type="submit"
          >
            ورود به حساب کاربری
            <BottomGradient />
          </button>

          <div className="mb-4 mt-6 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />

          <Link
            to="/"
            className="text-sm flex items-center justify-center font-bold text-cyan-400 hover:text-cyan-300"
          >
            بازگشت به صفحه اصلی
          </Link>
        </form>
      </div>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />

      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};

const LabelInputContainer = ({ children, className }) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
};
