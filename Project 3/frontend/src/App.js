import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import AdminDashboard from './pages/AdminDashboard';
import { AuthProvider } from './context/AuthContext';
import LoginCountsPage from './pages/LoginCountsPage';

const App = () => (
    <AuthProvider>
        <Router>
            <Routes>
                <Route path="/signup" element={<SignupPage />} /> 
                <Route path="/" element={<LoginPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/admin-dashboard" element={<AdminDashboard />} />
                <Route path="/login-counts/:userId" element={<LoginCountsPage />} />
            </Routes>
        </Router>
    </AuthProvider>
);

export default App;
