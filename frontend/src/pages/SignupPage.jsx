import { MainLayout } from "../components/layout/MainLayout";
import { AuthCard } from "../features/auth/AuthCard";
import { SignupForm } from "../features/auth/SignupForm";

export default function SignupPage() {
  return (
    <MainLayout showChrome={false}>
      <AuthCard title="ایجاد حساب کاربری" subtitle="قبلاً ثبت‌نام کرده‌اید؟ وارد شوید" subtitleTo="/login">
        <SignupForm />
      </AuthCard>
    </MainLayout>
  );
}
