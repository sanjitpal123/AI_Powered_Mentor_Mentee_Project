import * as yup from "yup";
const LoginAUth = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password should be atleast 6 character")
    .required("password is required"),
});

export default LoginAUth;
