const PHONE_REGEX = /^09\d{9}$/;

export const isValidIranianPhone = (value) => PHONE_REGEX.test(String(value).trim());

export const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value).trim());

export function validateContactForm(values) {
  const errors = {};
  if (!values.title.trim()) errors.title = "نام پروژه را وارد کنید.";
  if (!values.project_type.trim()) errors.project_type = "نوع پروژه را وارد کنید.";
  if (!isValidIranianPhone(values.phone_number)) {
    errors.phone_number = "شماره تلفن معتبر نیست. فرمت صحیح: 09XXXXXXXXX";
  }
  if (!values.description.trim()) errors.description = "توضیحات پروژه را وارد کنید.";
  return errors;
}

export function validateSignupForm(values) {
  const errors = {};
  if (!values.firstname.trim()) errors.firstname = "نام را وارد کنید.";
  if (!values.lastname.trim()) errors.lastname = "نام خانوادگی را وارد کنید.";
  if (!isValidEmail(values.email)) errors.email = "ایمیل معتبر نیست.";
  if (values.phone.trim() && !isValidIranianPhone(values.phone)) {
    errors.phone = "شماره تلفن معتبر نیست. فرمت صحیح: 09XXXXXXXXX";
  }
  if (values.password.length < 6) errors.password = "رمز عبور باید حداقل ۶ کاراکتر باشد.";
  return errors;
}

export function validateLoginForm(values) {
  const errors = {};
  if (!isValidEmail(values.email)) errors.email = "ایمیل معتبر نیست.";
  if (!values.password) errors.password = "رمز عبور را وارد کنید.";
  return errors;
}
