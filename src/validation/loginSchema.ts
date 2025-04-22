import * as yup from "yup";

export const loginSchema = yup
  .object()
  .shape({
    email: yup.string().email("Invalid email format").optional(),

    username: yup
      .string()
      .min(3, "Username must be at least 3 characters")
      .optional(),

    password: yup
      .string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
  })
  .test(
    "email-or-username",
    "Either email or username is required",
    (value) => !!value.email || !!value.username
  );
