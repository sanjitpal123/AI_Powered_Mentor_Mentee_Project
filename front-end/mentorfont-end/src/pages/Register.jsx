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
    <div className="min-h-screen  flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg"
      >
        <h2 className="text-2xl font-bold text-center text-red-700 mb-6">
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
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
                />
              ) : (
                <input
                  {...register(field.name)}
                  type={field.type}
                  placeholder={field.placeholder}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
                />
              )}
              <p className="text-red-500 text-sm">
                {errors[field.name]?.message}
              </p>
            </div>
          ))}

          <div>
            <select
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
              {...register("role")}
            >
              <option value="">Select Role</option>
              <option value="mentee">Mentee</option>
              <option value="mentor">Mentor</option>
            </select>
            <p className="text-red-500 text-sm">{errors.role?.message}</p>
          </div>

          <motion.button
            whileTap={{ scale: 0.97 }}
            whileHover={{ scale: 1.02 }}
            type="submit"
            className="w-full bg-black text-white hover:bg-red-700 font-semibold py-2 rounded transition"
          >
            Sign Up
          </motion.button>

          <p className="text-center text-sm mt-2">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-red-700 font-medium hover:underline"
            >
              Log in
            </Link>
          </p>
        </form>

        <div className="flex items-center my-4">
          <div className="flex-grow h-px bg-gray-300"></div>
          <span className="px-2 text-sm text-gray-500">or</span>
          <div className="flex-grow h-px bg-gray-300"></div>
        </div>

        <button className="w-full flex items-center justify-center border border-gray-300 rounded py-2 text-sm font-medium hover:bg-gray-50 transition">
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google logo"
            className="w-5 h-5 mr-2"
          />
          Sign up with Google
        </button>
      </motion.div>
    </div>
  );
}
