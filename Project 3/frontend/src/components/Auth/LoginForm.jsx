import React, { useState } from 'react';
import { TextField, Button, Typography, FormControl } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const navigate = useNavigate();

    const validateForm = () => {
        let isValid = true;
        if (!email) {
            setEmailError('Email is required');
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            setEmailError('Email is invalid');
            isValid = false;
        } else {
            setEmailError('');
        }

        if (!password) {
            setPasswordError('Password is required');
            isValid = false;
        } else {
            setPasswordError('');
        }

        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('userId', response.data.userId);
            localStorage.setItem('role', response.data.role);
            if (response.data.role === 'Admin') navigate('/admin-dashboard');
            else {
                const response1 = await axios.get(`http://localhost:5000/api/users/profile/${response.data.userId}`, {
                    headers: {
                        Authorization: `Bearer ${response.data.token}`
                    }
                });
                navigate('/profile');
            }
        } catch (err) {
            setError('Login failed');
        }
    };

    const handleSignup = () => {
        navigate('/signup');
    };

    return (
        <div className="flex flex-col items-center p-6 max-w-md mx-auto shadow-lg rounded-lg bg-white">
            <Typography variant="h4" className="mb-6 text-center">Login</Typography>
            <form onSubmit={handleSubmit} className="w-full">
                <FormControl fullWidth margin="normal">
                    <TextField
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        error={!!emailError}
                        helperText={emailError}
                    />
                </FormControl>
                <FormControl fullWidth margin="normal">
                    <TextField
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        error={!!passwordError}
                        helperText={passwordError}
                    />
                </FormControl>
                <Button type="submit" variant="contained" color="primary" fullWidth className="mt-4">Login</Button>
                {error && <Typography color="error" className="mt-4 text-center">{error}</Typography>}
            </form>
            <Typography variant="body2" className="mt-4 text-center">
                New to the platform?{' '}
                <Button onClick={handleSignup} color="primary" className="p-0">
                    Sign up here
                </Button>
            </Typography>
        </div>
    );
};

export default LoginForm;
