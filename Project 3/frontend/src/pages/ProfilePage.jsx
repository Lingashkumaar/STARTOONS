import React, { useState, useEffect } from 'react';
import { Typography, Button, Paper } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const id = localStorage.getItem('userId');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await axios.get(`http://localhost:5000/api/users/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setUser(response.data);
            } catch (error) {
                console.error("Error fetching user data", error);
            }
        };
        fetchUser();
    }, []);
    

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('role');
        navigate('/login');
    };

    return (
        <div className="flex flex-col items-center p-6 max-w-3xl mx-auto bg-white shadow-lg rounded-lg">
            <div className="flex justify-between items-center w-full mb-6">
                <Typography variant="h4" className="text-center">Profile</Typography>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleLogout}
                    className="ml-4"
                >
                    Log Out
                </Button>
            </div>
            {user ? (
                <div className="w-full">
                    <Paper className="p-6 rounded-lg shadow-md">
                        <Typography variant="h5" className="mb-4 font-semibold">{user.name}</Typography>
                        <Typography className="mb-2"><strong>Email:</strong> {user.email}</Typography>
                        <Typography className="mb-2"><strong>Gender:</strong> {user.gender}</Typography>
                        <Typography className="mb-2"><strong>Count:</strong> {user.loginHistory[0].count}</Typography>
                        <Typography><strong>Last Login:</strong> {new Date(user.lastLoginDate).toLocaleString()}</Typography>
                    </Paper>
                </div>
            ) : (
                <Typography>Loading...</Typography>
            )}
        </div>
    );
};

export default ProfilePage;
