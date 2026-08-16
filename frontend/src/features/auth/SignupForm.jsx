import { FormField } from "../../components/ui/FormField";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import { Alert } from "../../components/ui/Alert";
import { useSignupForm } from "./hooks/useSignupForm";
import { useState } from "react";

import { EyeOn } from "../../components/ui/EyeOn";
import { EyeOff } from "../../components/ui/EyeOff";

export function SignupForm() {
  const {
    values,
    errors,
    status,
    errorMessage,
    isLoading,
    handleChange,
    handleSubmit,
  } = useSignupForm();

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  return (
    <form className="my-8 space-y-5" onSubmit={handleSubmit} noValidate>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <FormField id="firstname" label="نام" error={errors.firstname}>
          <Input
            id="firstname"
            placeholder="محمد"
            value={values.firstname}
            onChange={handleChange}
            error={!!errors.firstname}
          />
        </FormField>
        <FormField id="lastname" label="نام خانوادگی" error={errors.lastname}>
          <Input
            id="lastname"
            placeholder="احمدی"
            value={values.lastname}
            onChange={handleChange}
            error={!!errors.lastname}
          />
        </FormField>
      </div>

      <FormField id="email" label="ایمیل" error={errors.email}>
        <Input
          id="email"
          type="email"
          placeholder="example@gmail.com"
          value={values.email}
          onChange={handleChange}
          error={!!errors.email}
        />
      </FormField>

      <FormField id="phone" label="شماره تلفن (اختیاری)" error={errors.phone}>
        <Input
          id="phone"
          placeholder="09XXXXXXXXX"
          value={values.phone}
          onChange={handleChange}
          error={!!errors.phone}
        />
      </FormField>

      <FormField id="password" label="رمز عبور" error={errors.password}>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            value={values.password}
            onChange={handleChange}
            error={!!errors.password}
            className="pr-10" // Add padding for the eye button
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 left-0 flex items-center px-3 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors"
            aria-label={showPassword ? "مخفی کردن رمز عبور" : "نمایش رمز عبور"}
          >
            {showPassword ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <EyeOn className="w-5 h-5" />
            )}
          </button>
        </div>
      </FormField>

      {status === "error" && errorMessage && (
        <Alert tone="error">{errorMessage}</Alert>
      )}

      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? "در حال ارسال..." : "ایجاد حساب کاربری"}
      </Button>

      <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <Button to="/" variant="ghost" className="w-full">
        بازگشت به صفحه اصلی
      </Button>
    </form>
  );
}
