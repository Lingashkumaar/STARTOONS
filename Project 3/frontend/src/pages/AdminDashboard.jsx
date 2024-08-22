import React, { useState, useEffect } from 'react';
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                const response = await axios.get('http://localhost:5000/api/users', { headers: { Authorization: `Bearer ${token}` } });
                setUsers(response.data);
                console.log(response.data);
                
            } else {    
                navigate('/login'); 
            }
        };
        fetchUsers();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('role');
        navigate('/');
    };
    console.log(user);
    

    const handleRowClick = (userId) => {
        navigate(`/login-counts/${userId}`);
    };

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <Typography variant="h4" className="text-center">Admin Dashboard</Typography>
                <Button variant="contained" color="primary" onClick={handleLogout}>
                    Log Out
                </Button>
            </div>
            
            <div className="overflow-x-auto mb-8">
                <TableContainer component={Paper} className="rounded-lg shadow-md">
                    <Table>
                        <TableHead>
                            <TableRow className="bg-gray-100">
                                <TableCell className="font-bold">Name</TableCell>
                                <TableCell className="font-bold">Email</TableCell>
                                <TableCell className="font-bold">Count</TableCell>
                                <TableCell className="font-bold">Gender</TableCell>
                                <TableCell className="font-bold">Last Login Date</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map(user => (
                                <TableRow 
                                    key={user._id} 
                                    className="hover:bg-gray-50 cursor-pointer" 
                                    onClick={() => handleRowClick(user._id)}
                                >
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.count}</TableCell>
                                    <TableCell>{user.gender}</TableCell>
                                    <TableCell>{new Date(user.lastLoginDate).toLocaleDateString()}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    );
};

export default AdminDashboard;
