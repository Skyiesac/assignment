import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import MainWeb from './components/mainweb';
import ProtectedRoute from './ProtectedRoute';

const App = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/dashboard" element={
                    <ProtectedRoute>
                        <MainWeb />
                    </ProtectedRoute>
                } />
            </Routes>
        </Router>
    );
};

export default App;
