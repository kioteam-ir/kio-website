import { useEffect } from "react";
import { Modal } from "../../components/ui/Modal";
import { Button } from "../../components/ui/Button";
import { Switch } from "../../components/ui/Switch";
import { FormField } from "../../components/ui/FormField";
import { Input } from "../../components/ui/Input";
import { Alert } from "../../components/ui/Alert";
import { IconClose } from "../../components/icons";
import { useForm } from "../../hooks/useForm";
import { isValidEmail } from "../../utils/validators";

const initialValues = {
  first_name: "",
  last_name: "",
  email: "",
  phone_number: "",
  password: "",
  is_admin: false,
};

/** Mirrors the backend validators in app/modules/accounts/schemas.py. */
function validate(v) {
  const errors = {};
  if (!v.first_name.trim()) errors.first_name = "نام الزامی است.";
  if (!v.last_name.trim()) errors.last_name = "نام خانوادگی الزامی است.";

  if (!v.email.trim()) {
    errors.email = "ایمیل الزامی است.";
  } else if (!isValidEmail(v.email.trim())) {
    errors.email = "فرمت ایمیل صحیح نیست.";
  }

  if (v.phone_number && !/^09\d{9}$/.test(v.phone_number.trim())) {
    errors.phone_number = "شماره موبایل باید با ۰۹ شروع شده و ۱۱ رقم باشد.";
  }

  if (!v.password) {
    errors.password = "رمز عبور الزامی است.";
  } else if (v.password.length < 8) {
    errors.password = "رمز عبور حداقل ۸ کاراکتر است.";
  } else if (!/[a-z]/.test(v.password) || !/[A-Z]/.test(v.password)) {
    errors.password = "رمز باید حداقل یک حرف بزرگ و یک حرف کوچک انگلیسی داشته باشد.";
  } else if (!/\d/.test(v.password)) {
    errors.password = "رمز باید حداقل یک عدد داشته باشد.";
  }

  return errors;
}

export function CreateUserModal({ isOpen, onClose, onCreate, mutatingId }) {
  const {
    values,
    errors,
    status,
    errorMessage,
    isLoading,
    handleChange,
    handleSubmit,
    setValues,
    reset,
  } = useForm({ initialValues, validate, onSubmit: onCreate });

  // Fresh form every time the modal opens (useForm state outlives the modal).
  useEffect(() => {
    if (isOpen) reset();
  }, [isOpen, reset]);

  const busy = isLoading || mutatingId === "new";

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex items-start justify-between border-b border-neutral-800 px-6 pb-4 pt-5">
        <div>
          <h2 className="text-base font-medium text-neutral-100">ایجاد حساب کاربری</h2>
          <p className="mt-0.5 font-mono text-xs text-neutral-500">admin / create-account</p>
        </div>
        <button
          onClick={onClose}
          className="rounded-md p-1 text-neutral-500 hover:bg-white/5 hover:text-neutral-300"
          aria-label="بستن"
        >
          <IconClose className="h-5 w-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <div className="space-y-2 px-6 py-4">
          {status === "error" && errorMessage && (
            <Alert tone="error" className="text-start">
              {errorMessage}
            </Alert>
          )}
          <div className="grid grid-cols-2 gap-4">
            <FormField id="first_name" label="نام" error={errors.first_name}>
              <Input
                id="first_name"
                name="first_name"
                type="text"
                placeholder="نام"
                value={values.first_name}
                onChange={handleChange}
                error={!!errors.first_name}
              />
            </FormField>
            <FormField id="last_name" label="نام خانوادگی" error={errors.last_name}>
              <Input
                id="last_name"
                name="last_name"
                type="text"
                placeholder="نام خانوادگی"
                value={values.last_name}
                onChange={handleChange}
                error={!!errors.last_name}
              />
            </FormField>
          </div>

          <FormField id="email" label="ایمیل" error={errors.email}>
            <Input
              id="email"
              name="email"
              type="email"
              dir="ltr"
              placeholder="user@example.com"
              value={values.email}
              onChange={handleChange}
              error={!!errors.email}
            />
          </FormField>

          <FormField
            id="phone_number"
            label="شماره موبایل (اختیاری)"
            error={errors.phone_number}
          >
            <Input
              id="phone_number"
              name="phone_number"
              type="tel"
              dir="ltr"
              placeholder="09123456789"
              value={values.phone_number}
              onChange={handleChange}
              error={!!errors.phone_number}
            />
          </FormField>

          <FormField id="password" label="رمز عبور" error={errors.password}>
            <Input
              id="password"
              name="password"
              type="password"
              dir="ltr"
              placeholder="حداقل ۸ کاراکتر، حروف بزرگ/کوچک و عدد"
              value={values.password}
              onChange={handleChange}
              error={!!errors.password}
            />
          </FormField>

          <div className="flex items-center justify-between rounded-md border border-neutral-800 bg-neutral-900/50 px-4 py-3">
            <div>
              <p className="text-sm text-neutral-200">دسترسی ادمین</p>
              <p className="mt-0.5 text-xs text-neutral-500">
                کاربران ادمین به پنل مدیریت دسترسی دارند
              </p>
            </div>
            <Switch
              checked={values.is_admin}
              disabled={busy}
              onChange={(next) => setValues((prev) => ({ ...prev, is_admin: next }))}
              label="سطح دسترسی ادمین"
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 border-t border-neutral-800 px-6 py-4">
          <Button variant="ghost" size="sm" type="button" onClick={onClose}>
            انصراف
          </Button>
          <Button size="sm" type="submit" disabled={busy}>
            {busy ? "در حال ایجاد…" : "ایجاد حساب"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
