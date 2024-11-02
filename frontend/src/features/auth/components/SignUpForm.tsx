import React, { useState } from "react";
import apiClient from "../../../api/api";

interface SignUpFormProps {
  onClose: () => void;
  onSignUpSuccess: () => void;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ onClose, onSignUpSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState(""); 
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); 

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); 
    setLoading(true); 
    console.log("Signing up with", { email, password, username });

    try {
      const response = await apiClient.post("auth/users/", {
        email,
        password,
        username, 
      });

      console.log("Sign up successful:", response.data);
      onSignUpSuccess(); 
      onClose(); 
    } catch (err: any) {
      console.error("Sign up failed:", err);
      if (err.response && err.response.data) {
        setError(err.response.data.non_field_errors || "Sign up failed");
      } else {
        setError("An error occurred. Please try again.");
      }
    } finally {
      setLoading(false); 
    }
  };

  return (
    <form onSubmit={handleSignUp} className="space-y-4">
      {error && <p className="text-red-500">{error}</p>}
      <input
        type="text"
        placeholder="Username (optional)"
        value={username}
        onChange={(e) => setUsername(e.target.value)} 
        className="w-full p-2 border border-gray-300 rounded"
      />
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
        className={`w-full px-4 py-2 ${loading ? "bg-gray-400" : "bg-green-500"} flex items-center justify-center text-white rounded hover:bg-green-600`}
      >
        {loading ? (
          <div className="loader"></div> 
        ) : (
          "Sign Up"
        )}
      </button>
    </form>
  );
};

export default SignUpForm;
