import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const CustomerLogin = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                'http://localhost:5000/api/auth/login',
                { ...formData, role: 'customer' },
                { headers: { 'Content-Type': 'application/json' } }
            );

            if (response.status === 200) {
                const { token } = response.data;
                localStorage.setItem('token', token);
                login('customer', token);
                toast.success('Login successful!', { autoClose: 1000 });
                navigate('/customer-welcome');
            } else {
                toast.error(response.data.message || 'Login failed');
            }
        } catch (error) {
            toast.error(error.response.data.message || "something went wrong");
        }
    };

    return (
        <div className="container">
            <div>
                <h2>Customer Login</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email"
                        required
                        style={{ display: 'block', margin: '10px 0' }}
                    />
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Password"
                        required
                        style={{ display: 'block', margin: '10px 0' }}
                    />
                    <button type="submit" style={{ padding: '10px 20px' }}>Login</button>
                </form>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <p>
                    Don't have an account? <Link to="/register/customer">Register as Customer</Link>
                </p>
            </div>
        </div>
    );
};

export default CustomerLogin;