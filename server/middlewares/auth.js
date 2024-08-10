// 用户认证
const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const token = req.header('Authorization').split(' ')[1];
    
    if (!token) return res.status(400).json({ message: '请登录' });

    try {
        const decoded = jwt.verify(token, 'secret');
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ message: 'token过期' });
    }
};

module.exports = auth;
