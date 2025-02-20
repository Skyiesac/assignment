import React from 'react';
import AuthForm from '../components/dashboard';
import '../styles/Register.css';

const RegisterPage = () => {
    return <AuthForm isLogin={false} />;
}

export default RegisterPage;