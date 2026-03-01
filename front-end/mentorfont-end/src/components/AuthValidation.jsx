import * as yup from "yup";

// Corrected schema
const AuthInputSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  bio: yup.string().required("Bio is required"),
  skills: yup.string().required("At least one skill is required"),
  role: yup
    .string()
    .oneOf(["mentor", "mentee"], "Please choose a valid role")
    .required("Role is required"),
  linked: yup
    .string()
    .url("Invalid LinkedIn URL")
    .required("LinkedIn is required"),
  github: yup.string().url("Invalid GitHub URL").required("GitHub is required"),
});

export default AuthInputSchema;
