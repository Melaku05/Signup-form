import React, { useState } from 'react';
import apiClient from '../../../api/api';

const RequestPasswordReset: React.FC = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false); 

    const handleRequestReset = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setMessage("");
        setLoading(true); 

        try {
            await apiClient.post("auth/users/reset_password/", {
                email,
            });
            setMessage("Password reset link has been sent to your email.");
        } catch (err: any) {
            console.error("Reset request failed:", err);
            if (err.response && err.response.data) {
                setError(err.response.data.non_field_errors || "Failed to send reset link.");
            } else {
                setError("An error occurred. Please try again.");
            }
        } finally {
            setLoading(false); 
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 px-3">
            <form onSubmit={handleRequestReset} className="space-y-4 max-w-sm w-full p-6 bg-white rounded shadow-md">
                <h1 className="text-2xl font-semibold mb-4">Request Password Reset</h1>
                {error && <p className="text-red-500">{error}</p>}
                {message && <p className="text-green-500">{message}</p>}
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full p-2 border border-gray-300 rounded"
                />
                <button 
                    type="submit" 
                    disabled={loading} 
                    className={`w-full px-4 py-2 ${loading ? "bg-gray-400" : "bg-green-500"} text-white rounded hover:bg-green-600 flex items-center justify-center`}
                >
                    {loading ? (
                        <div className="loader"></div> 
                    ) : (
                        "Send"
                    )}
                </button>
            </form>
        </div>
    );
};

export default RequestPasswordReset;
