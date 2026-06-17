import React, { useReducer } from "react";
import { Label } from "../components/ui/Lable";
import { Input } from "../components/ui/Input";
import { cn } from "../lib/utils";
import { Link } from "react-router-dom";
import { fetcher } from "../core/fetcher";

const initialState = {
  firstname: "",
  lastname: "",
  email: "",
  phone: "",
  password: "",
};

const formReducer = (state, action) => {
  switch (action.type) {
    case "SET_FIELD":
      return {
        ...state,
        [action.field]: action.value,
      };
    case "RESET_FORM":
      return initialState;
    default:
      return state;
  }
};

export function Signup() {
  const [formState, dispatch] = useReducer(formReducer, initialState);

  const handleChange = (e) => {
    const { id, value } = e.target;
    dispatch({
      type: "SET_FIELD",
      field: id,
      value: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed_phone = formState.phone.trim();
    let data = {};

    data.email = formState.email;
    data.password = formState.password;
    data.first_name = formState.firstname;
    data.last_name = formState.lastname;

    if (trimmed_phone !== "") {
      const phoneRegex = /^09\d{9}$/;
      if (phoneRegex.test(trimmed_phone)) {
        data.phone_number = trimmed_phone;
      }
    }
    fetcher.create_account(data);
  };

  return (
    <div
      dir="rtl"
      className="bg-gray-900 min-h-screen pt-20 px-4 flex items-center justify-center"
    >
      <div className="shadow-input w-full max-w-md rounded-2xl bg-black/50 p-6 md:p-8">
        <h2 className="flex flex-col space-y-4 text-center text-xl font-bold text-neutral-200">
          <span>ایجاد حساب کاربری</span>

          <Link
            to="/login"
            className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            قبلاً ثبت‌نام کرده‌اید؟ وارد شوید
          </Link>
        </h2>

        <form className="my-8" onSubmit={handleSubmit}>
          <div className="mb-5 grid grid-cols-1 md:grid-cols-2 gap-4">
            <LabelInputContainer>
              <Label htmlFor="firstname">نام</Label>
              <Input
                id="firstname"
                placeholder="محمد"
                type="text"
                className="text-right"
                value={formState.firstname}
                onChange={handleChange}
              />
            </LabelInputContainer>

            <LabelInputContainer>
              <Label htmlFor="lastname">نام خانوادگی</Label>
              <Input
                id="lastname"
                placeholder="احمدی"
                type="text"
                className="text-right"
                value={formState.lastname}
                onChange={handleChange}
              />
            </LabelInputContainer>
          </div>

          <LabelInputContainer className="mb-5">
            <Label htmlFor="email">ایمیل</Label>
            <Input
              id="email"
              placeholder="example@gmail.com"
              type="email"
              className="text-right"
              value={formState.email}
              onChange={handleChange}
            />
          </LabelInputContainer>

          <LabelInputContainer className="mb-5">
            <Label htmlFor="phone">شماره تلفن (اختیاری)</Label>
            <Input
              id="phone"
              placeholder="09XXXXXXXXX"
              className="text-right"
              value={formState.phone}
              onChange={handleChange}
            />
          </LabelInputContainer>

          <LabelInputContainer className="mb-5">
            <Label htmlFor="password">رمز عبور</Label>
            <Input
              id="password"
              placeholder="••••••••"
              type="password"
              className="text-right"
              value={formState.password}
              onChange={handleChange}
            />
          </LabelInputContainer>

          <button
            className="group/btn cursor-pointer relative block h-11 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset]"
            type="submit"
          >
            ایجاد حساب کاربری
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

        {/* Optional: Display current form state for debugging */}
        <div className="text-xs text-neutral-500 mt-4 p-2 bg-neutral-900/50 rounded">
          <pre>{JSON.stringify(formState, null, 2)}</pre>
        </div>
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
