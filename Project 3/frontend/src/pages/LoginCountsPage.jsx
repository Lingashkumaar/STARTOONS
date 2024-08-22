import React, { useState, useEffect } from 'react';
import { Typography, Paper } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';

const LoginCountsPage = () => {
    const [loginData, setLoginData] = useState([]);
    const [totalCount, setTotalCount] = useState(0);

    useEffect(() => {
        const fetchLoginCounts = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const userId = localStorage.getItem('userId');
                    const response = await axios.get(`http://localhost:5000/api/users/profile/${userId}/login-history`, {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    const data = response.data.loginHistory;
                    setLoginData(data);
                    console.log(data);
                    

                    // Calculate total count
                    const total = data.reduce((sum, entry) => sum + entry.count, 0);
                    setTotalCount(total);
                } catch (error) {
                    console.error('Error fetching login counts:', error);
                }
            }
        };
        fetchLoginCounts();
    }, []);

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <div className="mb-6">
                <Typography variant="h4" className="text-center mb-4">Login Counts Overview</Typography>
                <Typography variant="h6" className="text-center mb-4">Total Login Count: {totalCount}</Typography>
            </div>

            <Paper className="p-4 rounded-lg shadow-md">
                <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={loginData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" tickFormatter={(month) => `${month + 1}`} />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="count" stroke="#8884d8" activeDot={{ r: 8 }} />
                    </LineChart>
                </ResponsiveContainer>
            </Paper>
        </div>
    );
};

export default LoginCountsPage;
