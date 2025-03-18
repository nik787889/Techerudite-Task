import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const CustomerRegistration = () => {
    const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post(
                'http://localhost:5000/api/auth/register',
                { ...formData, role: 'customer', },
                { headers: { 'Content-Type': 'application/json', } }
            );

            if (response.status === 201) {
                toast.success('Registration successful! Please check your email to verify your account.');
                navigate('/login/customer');
            } else {
                toast.error(response.data.message || 'Registration failed');
            }
        } catch (error) {
            toast.error(error.response.data.message || 'An error occurred');
        } finally {
            setLoading(true);
        }
    };

    return (
        <div className="container">
            <h2>Customer Registration</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" required disabled={loading} />
                <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" required disabled={loading} />
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required disabled={loading} />
                <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required disabled={loading} />
                <button type="submit" disabled={loading}>
                    {loading ? 'Registering...' : 'Register'}
                </button>
            </form>
        </div>
    );
};

export default CustomerRegistration;