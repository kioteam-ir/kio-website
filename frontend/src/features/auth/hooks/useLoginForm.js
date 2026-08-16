import { useNavigate } from "react-router-dom";
import { useForm } from "../../../hooks/useForm";
import { validateLoginForm } from "../../../utils/validators";
import { useAuth } from "../../../hooks/useAuth";

const initialValues = { email: "", password: "" };

export function useLoginForm() {
  const { login } = useAuth();
  const navigate = useNavigate();

  return useForm({
    initialValues,
    validate: validateLoginForm,
    onSubmit: async (values) => {
      await login(values.email, values.password);
      navigate("/dashboard");
    },
  });
}
