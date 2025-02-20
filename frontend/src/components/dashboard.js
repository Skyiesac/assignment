import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/dashboard.css';

const AuthForm = ({ isLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('buyer');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const endpoint = isLogin ? 'http://127.0.0.1:5000/auth/login' : 'http://127.0.0.1:5000/auth/register';
        
        const payload = isLogin 
            ? { username, password } 
            : { username, password, role };

        const response = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });

        const data = await response.json();
        if (response.ok) {
            setMessage(isLogin ? "Login successful!" : "Registration successful!");
            if (isLogin) {
                localStorage.setItem("token", data.access_token);
                navigate('/dashboard'); 
            } else {
                navigate('/login'); 
            }
        } else {
            setMessage(data.msg);
        }
    };

    return (
        <div className="auth-container">
            <h2>{isLogin ? 'Login' : 'Register'}</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="Username" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    required
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required
                />
                {!isLogin && (
                    <select value={role} onChange={(e) => setRole(e.target.value)}>
                        <option value="buyer">Buyer</option>
                        <option value="seller">Seller</option>
                    </select>
                )}
                <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
            </form>
            <p>{message}</p>
        </div>
    );
};

export default AuthForm;
