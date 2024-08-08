const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        console.log(113, user);

        if (!user) return res.status(200).json({ message: '该用户未注册' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: '密码错误' });

        const token = jwt.sign({ id: user._id }, 'secret', { expiresIn: "15m" });
        const refreshToken = jwt.sign({ id: user._id }, 'refreshSecret', { expiresIn: '7d' });

        user.refreshToken = refreshToken; // 将refreshToken保存到数据库中
        await user.save();

        res.status(200).json({ token,refreshToken , user: { username: user.username, _id: user._id }, message: '登录成功' });
    } catch (err) {
        res.status(500).json(err);
    }
});


router.post('/refresh-token', async (req, res) => {
    const { refreshToken } = req.body;

    if (!refreshToken) return res.status(401).json({ message: 'No token provided' });

    try {
        const decoded = jwt.verify(refreshToken, 'refreshSecret');
        const user = await User.findById(decoded.id);
        if (!user || user.refreshToken !== refreshToken) {
            return res.status(403).json({ message: 'Invalid refresh token' });
        }

        const token = jwt.sign({ id: user._id }, 'secret', { expiresIn: '15m' });
        const newRefreshToken = jwt.sign({ id: user._id }, 'refreshSecret', { expiresIn: '7d' });

        user.refreshToken = newRefreshToken;
        await user.save();

        res.status(200).json({ token, refreshToken: newRefreshToken, user: { username: user.username, _id: user._id },message: '刷新成功' });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
