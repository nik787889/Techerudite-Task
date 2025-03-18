import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const AdminLogin = () => {
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
                { ...formData, role: 'admin' },
                { headers: { 'Content-Type': 'application/json' } }
            );

            if (response.status === 200) {
                const { token } = response.data;
                localStorage.setItem('token', token);
                login('admin', token);
                toast.success('Login successful!', { autoClose: 1000 });
                navigate('/admin-welcome');
            } else {
                toast.error(response.data.message || 'Login failed');
            }
        } catch (error) {
            if (error && error.status === 403) {
                toast.error("You are not allowed to login from here");
            } else {
                toast.error('An error occurred');
            }
        }
    };

    return (
        <div className="container">
            <div>
                <h2>Admin Login</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email"
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Password"
                        required
                    />
                    <button type="submit">Login</button>
                </form>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <p>
                    Don't have an account? <Link to="/register/admin">Register as Admin</Link>
                </p>
            </div>
        </div>
    );
};

export default AdminLogin;