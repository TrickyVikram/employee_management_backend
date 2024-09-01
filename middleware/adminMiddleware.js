const jwt = require('jsonwebtoken');

const adminMiddleware = (req, res, next) => {
    console.log("adminMiddleware");
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(403).json({ msg: 'No token provided' });

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(403).json({ msg: 'Failed to authenticate token' });
        if (!decoded.isAdmin) return res.status(403).json({ msg: 'Access denied' });
        req.user = decoded;
        next();
    });
};

module.exports = adminMiddleware;
