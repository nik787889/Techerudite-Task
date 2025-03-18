import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav style={{ background: '#333', padding: '1rem', color: 'white' }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <ul style={{ listStyle: 'none', display: 'flex', gap: '50px' }}>
                    <li>
                        <Link
                            to="/login/customer"
                            style={{ color: 'white', textDecoration: 'none' }}
                            onMouseEnter={(e) => e.target.style.color = '#c0deff'}
                            onMouseLeave={(e) => e.target.style.color = 'white'}
                        >
                            Customer Login
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/login/admin"
                            style={{ color: 'white', textDecoration: 'none' }}
                            onMouseEnter={(e) => e.target.style.color = '#c0deff'}
                            onMouseLeave={(e) => e.target.style.color = 'white'}
                        >
                            Admin Login
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;