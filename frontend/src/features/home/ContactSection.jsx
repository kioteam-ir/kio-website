import { Container } from "../../components/ui/Container";
import { SectionHeading } from "../../components/ui/SectionHeading";
import { FormField } from "../../components/ui/FormField";
import { Input } from "../../components/ui/Input";
import { TextArea } from "../../components/ui/TextArea";
import { Button } from "../../components/ui/Button";
import { Alert } from "../../components/ui/Alert";
import { CornerFrame } from "../../components/ui/CornerFrame";
import { IconEmail, IconMapPin, IconPhone } from "../../components/icons";
import { useContactForm } from "./hooks/useContactForm";

const CONTACT_DETAILS = [
  {
    icon: IconMapPin,
    label: "آدرس",
    value: "بندرعباس - خیابان شهید حقانی",
  },
  { icon: IconPhone, label: "تلفن", value: "+989967087175", ltr: true },
  { icon: IconEmail, label: "ایمیل", value: "info@kioteam.ir", ltr: true },
];

export function ContactSection() {
  const {
    values,
    errors,
    status,
    errorMessage,
    isLoading,
    handleChange,
    handleSubmit,
  } = useContactForm();

  return (
    <section
      dir="rtl"
      id="contact"
      className="border-t border-slate-800 bg-slate-900/20 py-20 lg:py-28"
    >
      <Container>
        <SectionHeading
          index="07"
          eyebrow="تماس با ما"
          title="ایده شما را به واقعیت تبدیل می‌کنیم"
          description="جزئیات پروژه خود را با ما در میان بگذارید تا بهترین راهکار را برای توسعه کسب‌وکار و حضور دیجیتال شما ارائه دهیم."
        />

        <div className="mt-16 grid items-start gap-8 lg:grid-cols-[1.3fr_1fr]">
          <CornerFrame className="rounded-lg border border-dashed border-slate-800 bg-slate-900/40 p-6 sm:p-8">
            <form className="space-y-5" onSubmit={handleSubmit} noValidate>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <FormField id="title" label="نام پروژه" error={errors.title}>
                  <Input
                    id="title"
                    name="title"
                    value={values.title}
                    onChange={handleChange}
                    placeholder="مثال: فروشگاه اینترنتی"
                    error={!!errors.title}
                  />
                </FormField>

                <FormField
                  id="project_type"
                  label="نوع پروژه"
                  error={errors.project_type}
                >
                  <Input
                    id="project_type"
                    name="project_type"
                    value={values.project_type}
                    onChange={handleChange}
                    placeholder="مثال: فروشگاهی، شرکتی، خبری"
                    error={!!errors.project_type}
                  />
                </FormField>
              </div>

              <FormField
                id="phone_number"
                label="شماره تماس"
                error={errors.phone_number}
              >
                <Input
                  id="phone_number"
                  name="phone_number"
                  value={values.phone_number}
                  onChange={handleChange}
                  placeholder="09XXXXXXXXX"
                  error={!!errors.phone_number}
                />
              </FormField>

              <FormField
                id="description"
                label="توضیحات پروژه"
                error={errors.description}
              >
                <TextArea
                  id="description"
                  name="description"
                  rows={6}
                  value={values.description}
                  onChange={handleChange}
                  placeholder="ایده، امکانات مورد نیاز، زمان‌بندی و بودجه تقریبی پروژه را توضیح دهید..."
                  error={!!errors.description}
                />
              </FormField>

              {status === "error" && errorMessage && (
                <Alert tone="error">{errorMessage}</Alert>
              )}
              {status === "success" && (
                <Alert tone="success">
                  درخواست شما با موفقیت ثبت شد. به زودی با شما تماس می‌گیریم.
                </Alert>
              )}

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full cursor-pointer hover:scale-105 transition-all duration-300"
                size="lg"
              >
                {isLoading ? "در حال ارسال..." : "ثبت درخواست مشاوره"}
              </Button>
            </form>
          </CornerFrame>

          <div className="space-y-5">
            <CornerFrame className="overflow-hidden rounded-lg border border-slate-800">
              <img
                src="/contact-illu.png"
                alt="مشاوره و توسعه پروژه"
                className="h-56 w-full object-contain object-center sm:h-72 lg:h-full"
              />
            </CornerFrame>

            <div className="space-y-4 rounded-lg border border-dashed border-slate-800 bg-slate-900/40 p-6">
              {CONTACT_DETAILS.map((item) => (
                <div key={item.label} className="flex items-center gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-white/5 text-brand-blue-300">
                    <item.icon className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="font-mono text-[11px] text-slate-500">
                      {item.label}
                    </p>
                    <p
                      className="text-sm text-slate-200"
                      dir={item.ltr ? "ltr" : undefined}
                    >
                      {item.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
