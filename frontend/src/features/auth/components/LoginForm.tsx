import React, { useState } from "react";
import { Link } from "react-router-dom"; 
import apiClient from "../../../api/api";

interface LoginFormProps {
  onClose: () => void; 
  onLoginSuccess: () => void; 
}

const LoginForm: React.FC<LoginFormProps> = ({ onClose, onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); 
    setLoading(true); 
    console.log("Attempting to log in...");

    try {
      const response = await apiClient.post("auth/jwt/create/", {
        email,
        password,
      });

      console.log("Login successful:", response.data);
      localStorage.setItem("authToken", response.data.access);
      onLoginSuccess(); 
      onClose(); 
    } catch (err: any) {
      console.error("Login failed:", err);
      if (err.response && err.response.data) {
        setError(err.response.data.non_field_errors || "Login failed");
      } else {
        setError("An error occurred. Please try again.");
      }
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="bg-white rounded ">
      <form onSubmit={handleLogin} className="space-y-4">
        {error && <p className="text-red-500">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded"
        />
        <button
          type="submit"
          disabled={loading} 
          className={`w-full px-4 py-2 ${loading ? "bg-gray-400" : "bg-blue-500"} text-white rounded hover:bg-blue-600 flex items-center justify-center`}
        >
          {loading ? (
            <div className="loader"></div> 
          ) : (
            "Login"
          )}
        </button>
      </form>
    
      <p className="mt-2 text-center">
        Forgot your password?{" "}
        <Link to="/request-reset-password" className="text-blue-500 hover:underline">
          Reset it here
        </Link>
      </p>
    </div>
  );
};

export default LoginForm;
