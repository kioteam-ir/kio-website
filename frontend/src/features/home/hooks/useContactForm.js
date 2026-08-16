import { useForm } from "../../../hooks/useForm";
import { validateContactForm } from "../../../utils/validators";
import { projectApi } from "../../../api/projectApi";

const initialValues = { title: "", project_type: "", phone_number: "", description: "" };

export function useContactForm() {
  return useForm({
    initialValues,
    validate: validateContactForm,
    onSubmit: (values) => projectApi.createProject(values),
  });
}
