import { MainLayout } from "../components/layout/MainLayout";
import { AuthCard } from "../features/auth/AuthCard";
import { LoginForm } from "../features/auth/LoginForm";

export default function LoginPage() {
  return (
    <MainLayout showChrome={false}>
      <AuthCard title="ورود به حساب کاربری" subtitle="حساب کاربری ندارید؟ ثبت‌نام کنید" subtitleTo="/signup">
        <LoginForm />
      </AuthCard>
    </MainLayout>
  );
}
