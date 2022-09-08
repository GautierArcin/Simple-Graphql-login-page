import { useFormik } from "formik";
import * as yup from "yup";

import { Form } from "./Form";

// Typing yup is a little bit exhausting
// c.f.  https://github.com/DefinitelyTyped/DefinitelyTyped/issues/29412

type FormWrapperVariable = {
  onSubmit: ({ email, password }: { email: string; password: string }) => void;
  textSecondButton: string;
  onClickSecondButton: () => void;
};

const FormWrapper = ({
  onSubmit,
  textSecondButton,
  onClickSecondButton,
}: FormWrapperVariable) => {
  const validationSchema = yup.object({
    email: yup
      .string()
      .email("Enter a valid email")
      .required("Email is required"),
    password: yup
      .string()
      .min(8, "Password should contain at least 8 characters")
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "foobar@example.com",
      password: "foobar",
    },
    validationSchema: validationSchema,
    onSubmit: (values) =>
      onSubmit({ email: values.email, password: values.password }),
  });

  return (
    <Form
      formik={formik}
      textSecondButton={textSecondButton}
      onClickSecondButton={onClickSecondButton}
    />
  );
};

export default FormWrapper;
