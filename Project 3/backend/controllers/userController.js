const User = require('../models/User');

// Get all users (for admin)
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find({ role: { $ne: 'Admin' } });
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

exports.getUsers = async (req, res) => {
    const { userId } = req.params;
    try {
        const users = await User.findById(userId);
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

exports.updateLoginDetails = async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await User.findById(userId).select('-password');
        if (!user) return res.status(404).json({ error: 'User not found' });

        const today = new Date();
        const currentYear = today.getFullYear();
        const currentMonth = today.getMonth(); 

        let currentMonthHistory = user.loginHistory.find(
            (entry) => entry.year === currentYear && entry.month === currentMonth
        );

        if (currentMonthHistory) {
            currentMonthHistory.count += 1;
        } else {
            user.loginHistory.push({
                year: currentYear,
                month: currentMonth,
                count: 1
            });
        }

        user.lastLoginDate = today;
        await user.save();

        res.status(200).json({ message: 'User details updated' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

exports.getMonthlyLoginCounts = async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await User.findById(userId).select('loginHistory');
        if (!user) return res.status(404).json({ error: 'User not found' });

        res.status(200).json({ loginHistory: user.loginHistory });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

