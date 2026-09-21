import { AdminLayout } from "../components/layout/AdminLayout";
import { Container } from "../components/ui/Container";
import { CornerFrame } from "../components/ui/CornerFrame";
import { Button } from "../components/ui/Button";
import { Alert } from "../components/ui/Alert";
import { FormField } from "../components/ui/FormField";
import { Input } from "../components/ui/Input";
import { TextArea } from "../components/ui/TextArea";
import { useSeoForm } from "../features/seo/hooks/useSeoForm";

export default function AdminSeoPage() {
  const {
    values,
    errors,
    status,
    errorMessage,
    isLoading,
    handleChange,
    handleSubmit,
    lastSaved,
  } = useSeoForm();

  return (
    <AdminLayout>
      <Container dir="rtl" className="py-6 sm:py-8">
        <div className="mb-5 sm:mb-6">
          <h1 className="text-lg font-medium text-neutral-100 sm:text-xl">
            محتوای اصلی سایت (سئو)
          </h1>
          <p className="mt-0.5 text-xs text-neutral-500 sm:text-sm">
            عنوان و توضیحاتی که برای موتورهای جستجو و بازدید‌کنندگان نمایش داده می‌شود
          </p>
        </div>

        {status === "success" && lastSaved && (
          <Alert tone="success" className="mb-4 text-start">
            محتوا با موفقیت ذخیره شد.
          </Alert>
        )}
        {status === "error" && errorMessage && (
          <Alert tone="error" className="mb-4 text-start">
            {errorMessage}
          </Alert>
        )}

        <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          <form
            onSubmit={handleSubmit}
            noValidate
            className="rounded-lg border border-neutral-800 bg-neutral-900/40 p-5 sm:p-6"
          >
            <FormField id="title" label="عنوان اصلی" error={errors.title}>
              <Input
                id="title"
                name="title"
                type="text"
                placeholder="مثلاً: تیم کایو — توسعه نرم‌افزار تحت وب"
                value={values.title}
                onChange={handleChange}
                maxLength={1024}
                error={!!errors.title}
              />
            </FormField>

            <FormField id="description" label="توضیحات اصلی" error={errors.description}>
              <TextArea
                id="description"
                name="description"
                rows={6}
                placeholder="معرفی کوتاه تیم کایو که در نتایج جستجو نمایش داده می‌شود…"
                value={values.description}
                onChange={handleChange}
                error={!!errors.description}
              />
            </FormField>

            <div className="flex items-center justify-end">
              <Button type="submit" size="sm" disabled={isLoading}>
                {isLoading ? "در حال ذخیره…" : "ذخیره محتوا"}
              </Button>
            </div>
          </form>

          <CornerFrame className="h-fit rounded-lg border border-dashed border-neutral-800 bg-neutral-900/40 p-5">
            <p className="font-mono text-xs text-neutral-500">آخرین محتوای ذخیره‌شده</p>
            {lastSaved ? (
              <div className="mt-3 space-y-4">
                <div>
                  <p className="font-mono text-[11px] text-neutral-600">عنوان</p>
                  <p className="mt-1 text-sm font-medium text-neutral-100">
                    {lastSaved.title}
                  </p>
                </div>
                <div>
                  <p className="font-mono text-[11px] text-neutral-600">توضیحات</p>
                  <p className="mt-1 whitespace-pre-wrap text-sm leading-7 text-neutral-300">
                    {lastSaved.description}
                  </p>
                </div>
              </div>
            ) : (
              <p className="mt-3 text-xs leading-6 text-neutral-500">
                هنوز محتوایی در این نشست ذخیره نشده است. پس از افزودن
                واکشی مقادیر در بک‌اند (#58)، مقادیر فعلی هنگام باز شدن
                صفحه نمایش داده می‌شوند.
              </p>
            )}
          </CornerFrame>
        </div>
      </Container>
    </AdminLayout>
  );
}
