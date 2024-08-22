import React, { useState } from 'react';
import { TextField, Button, Typography, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignupForm = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [gender, setGender] = useState('');
    const [error, setError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [emailError, setEmailError] = useState('');
    const navigate = useNavigate();

    const validateForm = () => {
        let isValid = true;

        // Email validation
        if (!email) {
            setEmailError('Email is required');
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            setEmailError('Email is invalid');
            isValid = false;
        } else {
            setEmailError('');
        }

        // Password validation
        if (!password) {
            setPasswordError('Password is required');
            isValid = false;
        } else if (password !== confirmPassword) {
            setPasswordError('Passwords do not match');
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
            await axios.post('http://localhost:5000/api/auth/signup', { name, password, email, gender });
            navigate('/');
        } catch (err) {
            setError('Signup failed');
        }
    };

    return (
        <div className="flex flex-col items-center p-6 max-w-md mx-auto shadow-lg rounded-lg bg-white">
            <Typography variant="h4" className="mb-6 text-center">Sign Up</Typography>
            <form onSubmit={handleSubmit} className="w-full">
                <TextField
                    label="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    fullWidth
                    margin="normal"
                    required
                />
                <TextField
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    fullWidth
                    margin="normal"
                    error={!!emailError}
                    helperText={emailError}
                    required
                />
                <TextField
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    fullWidth
                    margin="normal"
                    error={!!passwordError}
                    helperText={passwordError}
                    required
                />
                <TextField
                    label="Confirm Password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    fullWidth
                    margin="normal"
                    error={!!passwordError}
                    helperText={passwordError}
                    required
                />
                <FormControl fullWidth margin="normal">
                    <InputLabel>Gender</InputLabel>
                    <Select
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        label="Gender"
                    >
                        <MenuItem value="Male">Male</MenuItem>
                        <MenuItem value="Female">Female</MenuItem>
                        <MenuItem value="Other">Other</MenuItem>
                    </Select>
                </FormControl>
                <Button type="submit" variant="contained" color="primary" fullWidth className="mt-4">Sign Up</Button>
                {error && <Typography color="error" className="mt-4 text-center">{error}</Typography>}
            </form>
            <Typography variant="body2" className="mt-4 text-center">
                Already have an account?{' '}
                <Button onClick={() => navigate('/')} color="primary" className="p-0">
                    Login here
                </Button>
            </Typography>
        </div>
    );
};

export default SignupForm;
