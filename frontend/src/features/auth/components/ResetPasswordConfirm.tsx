import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import apiClient from '../../../api/api';

const ResetPasswordConfirm: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false); 

    const queryParams = new URLSearchParams(location.search);
    const uid = queryParams.get('uid');
    const token = queryParams.get('token');

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccessMessage("");

        if (newPassword !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        setLoading(true); 

        try {
            await apiClient.post("auth/users/reset_password_confirm/", {
                uid,
                token,
                new_password: newPassword,
            });

            setSuccessMessage("Your password has been reset successfully! Please log in.");
            setTimeout(() => {
                navigate('/'); 
            }, 5000);
        } catch (err: any) {
            console.error("Password reset failed:", err);
            if (err.response && err.response.data) {
                setError(err.response.data.non_field_errors || "Failed to reset password.");
            } else {
                setError("An error occurred. Please try again.");
            }
        } finally {
            setLoading(false); 
        }
    };

    useEffect(() => {
        
        if (!uid || !token) {
            setError("Invalid reset link.");
        }
    }, [uid, token]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-3">
            <form onSubmit={handleResetPassword} className="space-y-4 max-w-sm w-full p-6 bg-white rounded shadow-md">
                <h1 className="text-2xl font-semibold mb-4">Reset Password</h1>
                {error && <p className="text-red-500">{error}</p>}
                {successMessage && <p className="text-green-500">{successMessage}</p>}
                <input
                    type="password"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    className="w-full p-2 border border-gray-300 rounded"
                />
                <input
                    type="password"
                    placeholder="Confirm New Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
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
                        "Reset Password"
                    )}
                </button>
            </form>
        </div>
    );
};

export default ResetPasswordConfirm;
