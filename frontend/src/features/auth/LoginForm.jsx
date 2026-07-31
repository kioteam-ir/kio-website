import { FormField } from "../../components/ui/FormField";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import { Alert } from "../../components/ui/Alert";
import { useLoginForm } from "./hooks/useLoginForm";

export function LoginForm() {
  const { values, errors, status, errorMessage, isLoading, handleChange, handleSubmit } = useLoginForm();

  return (
    <form className="my-8 space-y-5" onSubmit={handleSubmit} noValidate>
      <FormField id="email" label="ایمیل" error={errors.email}>
        <Input id="email" type="email" placeholder="example@gmail.com" value={values.email} onChange={handleChange} error={!!errors.email} />
      </FormField>

      <FormField id="password" label="رمز عبور" error={errors.password}>
        <Input id="password" type="password" placeholder="••••••••" value={values.password} onChange={handleChange} error={!!errors.password} />
      </FormField>

      {status === "error" && errorMessage && <Alert tone="error">{errorMessage}</Alert>}

      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? "در حال ورود..." : "ورود به حساب کاربری"}
      </Button>

      <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <Button to="/" variant="ghost" className="w-full">
        بازگشت به صفحه اصلی
      </Button>
    </form>
  );
}
