import { useState, useContext } from "react";
import axios from "axios";
import { Context } from "../../main";
import { Navigate, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";

import {
  FaRobot,
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { isAuthorized, setIsAuthorized } = useContext(Context);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:4000/auth/register", {
        name,
        email,
        password,
      });

      const loginRes = await axios.post(
        "http://localhost:4000/auth/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem("token", loginRes.data.token);

      setIsAuthorized(true);

      navigate("/");
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Registration Failed");
    }
  };

  if (isAuthorized) {
    return <Navigate to="/" />;
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg,#020617,#0f172a,#111827,#1e3a8a)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "30px",
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{
          width: "420px",
          borderRadius: "24px",
          padding: "35px",
          backdropFilter: "blur(20px)",
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,.12)",
          boxShadow: "0 25px 50px rgba(0,0,0,.45)",
        }}
      >
        {/* Robot */}

     <motion.div
  animate={{
    rotate: [0, 8, -8, 8, 0],
    y: [0, -6, 0],
    scale: [1, 1.08, 1],
    boxShadow: [
      "0 0 18px rgba(34,197,94,0.4)",
      "0 0 35px rgba(34,197,94,0.9)",
      "0 0 18px rgba(34,197,94,0.4)",
    ],
  }}
  transition={{
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut",
  }}
  style={{
    width: "90px",
    height: "90px",
    margin: "auto",
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg,#2563EB,#22C55E)",
    color: "#fff",
    fontSize: "42px",
  }}
>
  <FaRobot />
</motion.div>

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: .3 }}
          style={{
            textAlign: "center",
            color: "white",
            marginTop: "20px",
            fontSize: "32px",
            fontWeight: "bold",
          }}
        >
          Create Account
        </motion.h1>

        <p
          style={{
            textAlign: "center",
            color: "#cbd5e1",
            marginBottom: "30px",
          }}
        >
          Join AI CodePilot 🚀
        </p>

        <form
          onSubmit={handleRegister}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          {/* Name */}

          <div
            style={{
              display: "flex",
              alignItems: "center",
              background: "#1e293b",
              borderRadius: "12px",
              padding: "14px",
              color: "#60a5fa",
            }}
          >
            <FaUser />

            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              required
              style={{
                flex: 1,
                marginLeft: "12px",
                border: "none",
                outline: "none",
                background: "transparent",
                color: "white",
                fontSize: "16px",
              }}
            />
          </div>

          {/* Email */}

          <div
            style={{
              display: "flex",
              alignItems: "center",
              background: "#1e293b",
              borderRadius: "12px",
              padding: "14px",
              color: "#60a5fa",
            }}
          >
            <FaEnvelope />

            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              required
              style={{
                flex: 1,
                marginLeft: "12px",
                border: "none",
                outline: "none",
                background: "transparent",
                color: "white",
                fontSize: "16px",
              }}
            />
          </div>
                    {/* Password */}

          <div
            style={{
              display: "flex",
              alignItems: "center",
              background: "#1e293b",
              borderRadius: "12px",
              padding: "14px",
              color: "#60a5fa",
            }}
          >
            <FaLock />

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                flex: 1,
                marginLeft: "12px",
                border: "none",
                outline: "none",
                background: "transparent",
                color: "white",
                fontSize: "16px",
              }}
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                background: "transparent",
                border: "none",
                color: "#94a3b8",
                cursor: "pointer",
                fontSize: "18px",
              }}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* Register Button */}

            <motion.button
          whileHover={{
            scale: 1.03,
            boxShadow: "0px 0px 25px rgba(59,130,246,0.7)",
          }}
          whileTap={{ scale: 0.97 }}
          type="submit"
          className="w-full py-3 rounded-xl font-bold text-lg bg-gradient-to-r from-blue-600 to-green-500 text-white transition-all duration-300"
        >
          🚀 Create Account
        </motion.button>

          <p
            style={{
              color: "#cbd5e1",
              textAlign: "center",
              marginTop: "5px",
            }}
          >
            Already have an account?{" "}
            <Link
              to="/login"
              style={{
                color: "#38bdf8",
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
              Login
            </Link>
          </p>
        </form>
      </motion.div>

      {/* Background Glow */}

      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.25, 0.45, 0.25],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
        }}
        style={{
          position: "absolute",
          width: "420px",
          height: "420px",
          borderRadius: "50%",
          background: "#2563eb",
          filter: "blur(170px)",
          zIndex: -1,
        }}
      />
    </div>
  );
}

export default Register;