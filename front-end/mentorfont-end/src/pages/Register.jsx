import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import AuthInput from "../components/AuthValidation"; // Yup schema
import singup from "../services/Signup";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(AuthInput),
    mode: "onChange",
  });

  const onsubmit = async (data) => {
    try {
      const res = await singup(data);
      console.log("res in on su", res);
      reset();
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-lg bg-[#0a0a0a] p-8 sm:p-10 rounded-2xl shadow-2xl border border-white/5 my-8"
      >
        <h2 className="text-3xl font-bold text-center text-white mb-8 tracking-tight">
          Sign Up
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit(onsubmit)}>
          {[
            { name: "name", type: "text", placeholder: "Name" },
            { name: "email", type: "email", placeholder: "Email" },
            { name: "password", type: "password", placeholder: "Password" },
            { name: "bio", type: "textarea", placeholder: "Bio", rows: 3 },
            {
              name: "skills",
              type: "text",
              placeholder: "Skills (e.g., React, Python, DSA)",
            },
            {
              name: "linked",
              type: "url",
              placeholder: "LinkedIn URL",
            },
            {
              name: "github",
              type: "url",
              placeholder: "GitHub URL",
            },
          ].map((field) => (
            <div key={field.name}>
              {field.type === "textarea" ? (
                <textarea
                  {...register(field.name)}
                  placeholder={field.placeholder}
                  rows={field.rows}
                  className="w-full bg-[#050505] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600/50 transition-colors resize-none"
                />
              ) : (
                <input
                  {...register(field.name)}
                  type={field.type}
                  placeholder={field.placeholder}
                  className="w-full bg-[#050505] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600/50 transition-colors"
                />
              )}
              <p className="text-red-500 text-sm mt-1">
                {errors[field.name]?.message}
              </p>
            </div>
          ))}

          <div>
            <select
              className="w-full bg-[#050505] border border-white/10 rounded-xl px-4 py-3 text-gray-300 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600/50 transition-colors cursor-pointer"
              {...register("role")}
            >
              <option value="" className="bg-[#0a0a0a] text-gray-500">Select Role</option>
              <option value="mentee" className="bg-[#0a0a0a] text-white">Mentee</option>
              <option value="mentor" className="bg-[#0a0a0a] text-white">Mentor</option>
            </select>
            <p className="text-red-500 text-sm mt-1">{errors.role?.message}</p>
          </div>

          <motion.button
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 transition-colors text-white font-medium py-3 rounded-xl shadow-lg mt-2"
          >
            Sign Up
          </motion.button>

          <p className="text-center text-sm mt-6 text-gray-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-red-500 font-medium hover:text-red-400 transition-colors"
            >
              Log in
            </Link>
          </p>
        </form>

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
          Sign up with Google
        </motion.button>
      </motion.div>
    </div>
  );
}
