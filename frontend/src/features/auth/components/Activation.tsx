import React, { useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import apiClient from '../../../api/api';

interface ErrorResponse {
    non_field_errors?: string[];
}

const Activation: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true); 

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const uid = queryParams.get('uid');
        const token = queryParams.get('token');

        (async () => {
            if (uid && token) {
                try {
                    const { data } = await apiClient.post('auth/users/activation/', { uid, token });
                    setSuccessMessage("Your account has been successfully verified! Please log in.");
                    console.log(data);
                    setTimeout(() => navigate('/'), 5000);
                } catch (error) {
                    const axiosError = error as AxiosError<ErrorResponse>; 
                    setError(
                        axiosError.response?.data.non_field_errors?.[0] || 'Activation failed. Please try again.'
                    );
                    console.error('Activation failed:', axiosError.response?.data);
                } finally {
                    setLoading(false); 
                }
            } else {
                setError('Invalid activation link.');
                setLoading(false);
            }
        })();
    }, [location, navigate]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-2xl font-semibold mb-4">Activating your account...</h1>
            {loading ? (
                <button
                    disabled
                    className="w-full px-4 py-2 bg-gray-400 text-white rounded flex items-center justify-center"
                >
                    <div className="loader"></div> 
                </button>
            ) : (
                <>
                    {error && <p className="mt-4 text-red-600">{error}</p>}
                    {successMessage && (
                        <p className="mt-4 text-green-600 bg-green-100 border border-green-400 rounded-lg p-4 text-center">
                            {successMessage}
                        </p>
                    )}
                </>
            )}
        </div>
    );
};

export default Activation;
