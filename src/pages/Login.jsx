import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const url = isLogin
        ? "http://localhost:5004/api/auth/login"
        : "http://localhost:5004/api/auth/register";

      const res = await axios.post(url, { email, password });

      localStorage.setItem("token", res.data.token || "true");

      alert(isLogin ? "Login Success ✅" : "Registered Successfully 🎉");

      navigate("/dashboard");

    } catch (err) {
      alert("Something went wrong ❌");
      console.log(err);
    }
  };

  return (
    <div style={container}>

      <div style={card}>

        <h1 style={title}>
          {isLogin ? "Welcome Back 👋" : "Create Account 🚀"}
        </h1>

        <p style={subtitle}>
          {isLogin
            ? "Login to continue shopping"
            : "Register to start your journey"}
        </p>

        <input
          style={input}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          style={input}
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button style={btn} onClick={handleSubmit}>
          {isLogin ? "Login" : "Register"}
        </button>

        <p style={switchText}>
          {isLogin ? "New user?" : "Already have account?"}

          <span
            style={link}
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? " Register here" : " Login here"}
          </span>
        </p>

      </div>

    </div>
  );
}

/* 🎨 STYLES */

const container = {
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "linear-gradient(135deg, #f5f7fa, #e4ecf7)"
};

const card = {
  width: 350,
  padding: 30,
  background: "#fff",
  borderRadius: 20,
  boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
  textAlign: "center"
};

const title = {
  marginBottom: 10
};

const subtitle = {
  color: "#777",
  marginBottom: 20
};

const input = {
  width: "100%",
  padding: 12,
  margin: "10px 0",
  borderRadius: 10,
  border: "1px solid #ddd"
};

const btn = {
  width: "100%",
  padding: 12,
  background: "#c9a96e",
  color: "#fff",
  border: "none",
  borderRadius: 10,
  marginTop: 10,
  cursor: "pointer",
  fontWeight: "bold"
};

const switchText = {
  marginTop: 15,
  fontSize: 14
};

const link = {
  color: "#c9a96e",
  cursor: "pointer",
  fontWeight: "bold"
};