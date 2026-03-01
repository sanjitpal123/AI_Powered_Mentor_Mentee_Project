import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import LoginAUth from "../components/LoginAUth";
import LoginService from "../services/LoginService";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useContext, useEffect } from "react";
import { GlobalContext } from "../ContextApiStore/ContextStore";

export default function Login() {
  const { setUser } = useContext(GlobalContext);
  const Navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(LoginAUth),
    mode: "onChange",
  });

  const onsubmit = async (data) => {
    try {
      const res = await LoginService(data);
      console.log("Login Response", res);

      // ✅ Ensure token is included in the stored user
      if (res?.token && res?.user) {
        const userWithToken = { ...res.user, token: res.token };
        localStorage.setItem("user", JSON.stringify(userWithToken));
        setUser(userWithToken);
        if (res?.user.role == "mentor") {
          Navigate("/mentor/dashboard");
        } else {
          Navigate("/");
        }
        reset();
      } else {
        alert("Login failed: Invalid response");
      }
    } catch (error) {
      console.log("Login Error", error);
      alert("Login failed: " + error.message);
    }
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    console.log("User in localStorage", storedUser);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-100 flex items-center justify-center px-4">
      <motion.div
        className="w-full max-w-sm bg-white p-8 rounded-xl shadow-2xl border"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Sign In
        </h2>

        <form onSubmit={handleSubmit(onsubmit)} className="space-y-5">
          <div>
            <input
              {...register("email")}
              type="email"
              placeholder="Email"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
            />
            <p className="text-red-500 text-sm mt-1">{errors.email?.message}</p>
          </div>

          <div>
            <input
              {...register("password")}
              type="password"
              placeholder="Password"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
            />
            <p className="text-red-500 text-sm mt-1">
              {errors.password?.message}
            </p>
          </div>

          <motion.button
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-black hover:bg-red-700 transition text-white font-semibold py-2 rounded-lg shadow-md"
          >
            Sign In
          </motion.button>
        </form>

        <p className="text-center text-sm mt-4 text-gray-600">
          Don't have an account?{" "}
          <Link to="/register" className="text-red-600 font-medium">
            Sign Up
          </Link>
        </p>

        <div className="flex items-center my-6">
          <div className="flex-grow h-px bg-gray-300"></div>
          <span className="px-3 text-sm text-gray-400">or</span>
          <div className="flex-grow h-px bg-gray-300"></div>
        </div>

        <motion.button
          whileHover={{ scale: 1.03 }}
          className="w-full flex items-center justify-center border border-gray-300 rounded-lg py-2 text-sm font-medium bg-white hover:bg-gray-100 transition"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google logo"
            className="w-5 h-5 mr-2"
          />
          Sign in with Google
        </motion.button>
      </motion.div>
    </div>
  );
}
