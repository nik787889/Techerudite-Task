import React from 'react'
import { useNavigate } from 'react-router-dom'

const HomePage = () => {

    const navigate = useNavigate()

    return (
        <div style={{ marginTop: "2rem" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <h1>Welcom to Home Page</h1>
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "2rem" }}>
                <button onClick={() => navigate('/register/customer')}>Customer Registration</button>
                <button onClick={() => navigate('/register/admin')}>Admin Registration</button>
            </div>
        </div >
    )
}

export default HomePage
