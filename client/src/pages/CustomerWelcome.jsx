import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const CustomerWelcome = () => {

    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login/admin');
    };

    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <h1>Welcome to the Customer Portal</h1>
            <div style={{ marginTop: '20px' }}>
                <button
                    onClick={handleLogout}
                    style={{ margin: '10px', padding: '10px 20px', background: '#DC3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default CustomerWelcome;