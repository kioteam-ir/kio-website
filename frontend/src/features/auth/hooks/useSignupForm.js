import { useNavigate } from "react-router-dom";
import { useForm } from "../../../hooks/useForm";
import { validateSignupForm } from "../../../utils/validators";
import { useAuth } from "../../../hooks/useAuth";

const initialValues = { firstname: "", lastname: "", email: "", phone: "", password: "" };

export function useSignupForm() {
  const { signup } = useAuth();
  const navigate = useNavigate();

  return useForm({
    initialValues,
    validate: validateSignupForm,
    onSubmit: async (values) => {
      const trimmedPhone = values.phone.trim();
      await signup({
        email: values.email,
        password: values.password,
        first_name: values.firstname,
        last_name: values.lastname,
        ...(trimmedPhone && { phone_number: trimmedPhone }),
      });
      navigate("/login");
    },
  });
}
