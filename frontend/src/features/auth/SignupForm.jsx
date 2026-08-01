import { FormField } from "../../components/ui/FormField";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import { Alert } from "../../components/ui/Alert";
import { useSignupForm } from "./hooks/useSignupForm";

export function SignupForm() {
  const { values, errors, status, errorMessage, isLoading, handleChange, handleSubmit } = useSignupForm();

  return (
    <form className="my-8 space-y-5" onSubmit={handleSubmit} noValidate>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <FormField id="firstname" label="نام" error={errors.firstname}>
          <Input id="firstname" placeholder="محمد" value={values.firstname} onChange={handleChange} error={!!errors.firstname} />
        </FormField>
        <FormField id="lastname" label="نام خانوادگی" error={errors.lastname}>
          <Input id="lastname" placeholder="احمدی" value={values.lastname} onChange={handleChange} error={!!errors.lastname} />
        </FormField>
      </div>

      <FormField id="email" label="ایمیل" error={errors.email}>
        <Input id="email" type="email" placeholder="example@gmail.com" value={values.email} onChange={handleChange} error={!!errors.email} />
      </FormField>

      <FormField id="phone" label="شماره تلفن (اختیاری)" error={errors.phone}>
        <Input id="phone" placeholder="09XXXXXXXXX" value={values.phone} onChange={handleChange} error={!!errors.phone} />
      </FormField>

      <FormField id="password" label="رمز عبور" error={errors.password}>
        <Input id="password" type="password" placeholder="••••••••" value={values.password} onChange={handleChange} error={!!errors.password} />
      </FormField>

      {status === "error" && errorMessage && <Alert tone="error">{errorMessage}</Alert>}

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
