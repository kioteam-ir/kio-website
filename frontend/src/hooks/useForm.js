import { useCallback, useState } from "react";

/**
 * Generic controlled-form hook: values, per-field change handler,
 * validation-on-submit, and idle/loading/success/error status tracking.
 * Every form in the app (contact, login, signup) is built on top of this
 * instead of hand-rolling its own reducer.
 */
export function useForm({ initialValues, validate, onSubmit }) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = useCallback((event) => {
    const { name, id, value } = event.target;
    const field = name || id;
    setValues((prev) => ({ ...prev, [field]: value }));
  }, []);

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setStatus("idle");
    setErrorMessage("");
  }, [initialValues]);

  const handleSubmit = useCallback(
    async (event) => {
      event?.preventDefault?.();
      setErrorMessage("");

      const validationErrors = validate ? validate(values) : {};
      setErrors(validationErrors);
      if (Object.keys(validationErrors).length > 0) {
        setStatus("error");
        return;
      }

      setStatus("loading");
      try {
        await onSubmit(values);
        setStatus("success");
      } catch (err) {
        setErrorMessage(err?.message || "خطایی رخ داد. لطفاً دوباره تلاش کنید.");
        setStatus("error");
      }
    },
    [values, validate, onSubmit],
  );

  return {
    values,
    errors,
    status,
    errorMessage,
    isLoading: status === "loading",
    handleChange,
    handleSubmit,
    reset,
    setValues,
  };
}
