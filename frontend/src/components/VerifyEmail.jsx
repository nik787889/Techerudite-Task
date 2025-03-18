import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const VerifyEmail = () => {
    const { token } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const verifyEmail = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/auth/verify/${token}`);
                if (response.status === 200) {
                    toast.success('Email verified successfully! You can now log in.', { autoClose: 1000 });
                    setTimeout(() => navigate('/'), 1500);
                } else {
                    toast.error('Email verification failed.', { autoClose: 1000 });
                    setTimeout(() => navigate('/'), 1500);
                }
            } catch (error) {
                toast.error(error.response.data.message || 'An error occurred during verification.', { autoClose: 1000 });
                setTimeout(() => navigate('/'), 1500);
            }
        };

        verifyEmail();
    }, [token, navigate]);


    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <h2>Verifying Email...</h2>
        </div>
    );
};

export default VerifyEmail;

