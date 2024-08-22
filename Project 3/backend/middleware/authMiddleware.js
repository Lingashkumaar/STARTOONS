const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
        const authHeader = req.headers['authorization'];
    
        const token = authHeader?.split(' ')[1];
        if (!token) return res.status(401).json({ error: 'Unauthorized' });
    
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) return res.status(403).json({ error: 'Forbidden' });
            req.userId = decoded.userId;
            next();
        });
};
