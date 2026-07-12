import { useState, useContext } from "react";
import axios from "axios";
import { Context } from "../../main";
import { Navigate, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaRobot,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { isAuthorized, setIsAuthorized } = useContext(Context);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:4000/auth/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem("token", response.data.token);
      setIsAuthorized(true);
      navigate("/");
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Invalid Email or Password");
    }
  };

  if (isAuthorized) return <Navigate to="/" />;

  return (
    <div
      className="relative flex items-center justify-center min-h-screen overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg,#0f172a,#111827,#1e3a8a,#0f172a)",
      }}
    >
      {/* Animated Background */}
      <motion.div
        className="absolute w-96 h-96 rounded-full bg-blue-500 opacity-20 blur-3xl"
        animate={{
          x: [0, 120, -80, 0],
          y: [0, -80, 80, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
        }}
      />

      <motion.div
        className="absolute w-80 h-80 rounded-full bg-green-400 opacity-10 blur-3xl"
        animate={{
          x: [100, -100, 80],
          y: [-50, 100, -50],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
        }}
      />

      {/* Card */}
      <motion.form
        onSubmit={handleLogin}
        initial={{ opacity: 0, scale: 0.8, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-[420px] rounded-3xl border border-gray-700 bg-gray-900/70 backdrop-blur-xl p-8 shadow-2xl"
      >
        {/* Robot */}
        <div className="flex justify-center mb-6">
          <motion.div
            animate={{
              rotate: [0, 8, -8, 8, 0],
              y: [0, -5, 0],
              scale: [1, 1.08, 1],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
            }}
            className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-green-400 flex items-center justify-center shadow-xl"
          >
            <FaRobot
              size={42}
              className="text-white"
            />
          </motion.div>
        </div>

        <h2 className="text-3xl font-bold text-center text-white mb-2">
          Welcome Back
        </h2>

        <p className="text-center text-gray-400 mb-8">
          Login to AI CodePilot
        </p>

        {/* Email */}
        <div className="relative mb-5">
          <FaEnvelope
            className="absolute left-4 top-4 text-gray-400"
          />

          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full bg-gray-800 border border-gray-700 rounded-xl py-3 pl-12 pr-4 text-white outline-none focus:border-blue-500 transition"
          />
        </div>

        {/* Password */}
        <div className="relative mb-6">
          <FaLock
            className="absolute left-4 top-4 text-gray-400"
          />

          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full bg-gray-800 border border-gray-700 rounded-xl py-3 pl-12 pr-12 text-white outline-none focus:border-green-400 transition"
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-3 text-gray-400 hover:text-white"
          >
            {showPassword ? (
              <FaEyeSlash />
            ) : (
              <FaEye />
            )}
          </button>
        </div>
                {/* Login Button */}
        <motion.button
          whileHover={{
            scale: 1.03,
            boxShadow: "0px 0px 25px rgba(59,130,246,0.7)",
          }}
          whileTap={{ scale: 0.97 }}
          type="submit"
          className="w-full py-3 rounded-xl font-bold text-lg bg-gradient-to-r from-blue-600 to-green-500 text-white transition-all duration-300"
        >
          🚀 Login
        </motion.button>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-gray-700"></div>

          <span className="px-4 text-gray-500 text-sm">
            OR
          </span>

          <div className="flex-1 h-px bg-gray-700"></div>
        </div>

        {/* Register */}
        <p className="text-center text-gray-300">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-blue-400 hover:text-green-400 font-semibold transition"
          >
            Register Now
          </Link>
        </p>

        {/* Footer */}
        <p className="text-center text-xs text-gray-500 mt-8">
          🤖 AI CodePilot • Secure Authentication
        </p>
      </motion.form>

      {/* Bottom Glow */}
      <motion.div
        className="absolute bottom-[-150px] w-[600px] h-[300px] rounded-full bg-blue-500 opacity-20 blur-[120px]"
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.15, 0.28, 0.15],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}

export default Login;