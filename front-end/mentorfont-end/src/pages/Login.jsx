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
    <div className="min-h-screen bg-[#050505] flex items-center justify-center px-4">
      <motion.div
        className="w-full max-w-md bg-[#0a0a0a] p-8 sm:p-10 rounded-2xl shadow-2xl border border-white/5"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h2 className="text-3xl font-bold text-center text-white mb-8 tracking-tight">
          Sign In
        </h2>

        <form onSubmit={handleSubmit(onsubmit)} className="space-y-5">
          <div>
            <input
              {...register("email")}
              type="email"
              placeholder="Email"
              className="w-full bg-[#050505] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600/50 transition-colors"
            />
            <p className="text-red-500 text-sm mt-1">{errors.email?.message}</p>
          </div>

          <div>
            <input
              {...register("password")}
              type="password"
              placeholder="Password"
              className="w-full bg-[#050505] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600/50 transition-colors"
            />
            <p className="text-red-500 text-sm mt-1">
              {errors.password?.message}
            </p>
          </div>

          <motion.button
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 transition-colors text-white font-medium py-3 rounded-xl shadow-lg"
          >
            Sign In
          </motion.button>
        </form>

        <p className="text-center text-sm mt-6 text-gray-400">
          Don't have an account?{" "}
          <Link to="/register" className="text-red-500 font-medium hover:text-red-400 transition-colors">
            Sign Up
          </Link>
        </p>

        <div className="flex items-center my-6">
          <div className="flex-grow h-px bg-white/5"></div>
          <span className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">or</span>
          <div className="flex-grow h-px bg-white/5"></div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          className="w-full flex items-center justify-center border border-white/10 rounded-xl py-3 text-sm font-medium text-white bg-white/5 hover:bg-white/10 transition-all"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google logo"
            className="w-5 h-5 mr-3"
          />
          Sign in with Google
        </motion.button>
      </motion.div>
    </div>
  );
}
