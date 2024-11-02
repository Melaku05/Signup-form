import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import LoginForm from "../features/auth/components/LoginForm";
import SignUpForm from "../features/auth/components/SignUpForm";

const Home: React.FC = () => {
  const navigate = useNavigate();
  
 
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState<string | null>(null);


  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsAuthenticated(Boolean(token));
  }, []);


  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl md:text-4xl font-bold mb-4 px-4">Welcome to the Home Page!</h1>
      
      {isAuthenticated ? (
        <p className="text-lg text-gray-700 mb-8">You are logged in. Enjoy exploring the app.</p>
      ) : (
        <>
          <p className="text-lg text-gray-700 mb-8">Please log in or sign up.</p>
          {confirmationMessage && <p className="text-green-500 mb-4">{confirmationMessage}</p>}
        </>
      )}
      
      <div className="flex space-x-4 mb-4">
        {!isAuthenticated ? (
          <>
            <button
              onClick={() => setIsLoginOpen(true)}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Login
            </button>
            <button
              onClick={() => setIsSignUpOpen(true)}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Sign Up
            </button>
          </>
        ) : (
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Logout
          </button>
        )}
      </div>

     
      {(isLoginOpen || isSignUpOpen) && (
        <div className="fixed inset-0 flex items-center px-3 justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
            <div className="text-center mb-4">
              <button 
                onClick={() => {
                  setIsLoginOpen(!isLoginOpen);
                  setIsSignUpOpen(!isSignUpOpen);
                }} 
                className="text-blue-500 hover:underline"
              >
                Switch to {isLoginOpen ? "Sign Up" : "Login"}
              </button>
            </div>

            {isLoginOpen ? (
              <>
                <h2 className="text-xl font-bold mb-4">Login</h2>
                <LoginForm onClose={() => setIsLoginOpen(false)} onLoginSuccess={() => setIsAuthenticated(true)} />
              </>
            ) : (
              <>
                <h2 className="text-xl font-bold mb-4">Sign Up</h2>
                <SignUpForm
                  onClose={() => setIsSignUpOpen(false)}
                  onSignUpSuccess={() => {
                    setConfirmationMessage("Please check your email and confirm your account to log in.");
                    setIsSignUpOpen(false);
                  }}
                />
              </>
            )}

            <div className="mt-4 text-center">
              <button
                className="mt-4 text-red-500"
                onClick={() => {
                  setIsLoginOpen(false);
                  setIsSignUpOpen(false);
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
