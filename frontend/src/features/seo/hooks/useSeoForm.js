import { useCallback, useState } from "react";
import { useForm } from "../../../hooks/useForm";
import { seoApi } from "../../../api/seoApi";

const initialValues = { title: "", description: "" };

function validate(values) {
  const errors = {};
  if (!values.title.trim()) {
    errors.title = "عنوان الزامی است.";
  } else if (values.title.trim().length > 1024) {
    errors.title = "عنوان حداکثر ۱۰۲۴ کاراکتر است.";
  }
  if (!values.description.trim()) {
    errors.description = "توضیحات الزامی است.";
  }
  return errors;
}

/**
 * Main-content (SEO) editor form. The backend upserts the singleton row,
 * so the same POST serves both create and update. `lastSaved` mirrors
 * the successfully saved payload for the preview card.
 */
export function useSeoForm() {
  const [lastSaved, setLastSaved] = useState(null);

  const onSubmit = useCallback(async (values) => {
    const payload = {
      title: values.title.trim(),
      description: values.description.trim(),
    };
    await seoApi.saveMainContent(payload);
    setLastSaved(payload);
  }, []);

  return { ...useForm({ initialValues, validate, onSubmit }), lastSaved };
}