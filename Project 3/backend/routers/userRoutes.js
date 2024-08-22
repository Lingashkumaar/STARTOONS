const express = require('express');
const router = express.Router();
const { getAllUsers, updateLoginDetails,getMonthlyLoginCounts,getUsers } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/users', authMiddleware, getAllUsers);
router.get('/users/:userId', authMiddleware, getUsers);
router.get('/users/profile/:userId', authMiddleware, updateLoginDetails);
router.get('/users/profile/:userId/login-history', authMiddleware, getMonthlyLoginCounts);

module.exports = router;
