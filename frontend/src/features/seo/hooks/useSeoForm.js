import { useCallback, useEffect, useState } from "react";
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

  const form = useForm({ initialValues, validate, onSubmit });
  const { setValues } = form;

  useEffect(() => {
    async function loadMainContent() {
      try {
        const data = await seoApi.getMainContent();
        if (data) {
          setValues({
            title: data.title || "",
            description: data.description || "",
          });
          setLastSaved(data);
        }
      } catch (err) {
        if (err?.status !== 404) {
          // Ignore non-critical initial load errors if row not found
        }
      }
    }
    loadMainContent();
  }, [setValues]);

  return { ...form, lastSaved };
}