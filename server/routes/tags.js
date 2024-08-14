// tags.js
const express = require('express');
const Tag = require('../models/Tag');
const auth = require('../middlewares/auth');
const router = express.Router();

// 创建标签名称
router.post('/', auth, async (req, res) => {
    const { name } = req.body;

    try {
        const newTag = new Tag({ name });
        const savedTag = await newTag.save();
        res.status(201).json(savedTag);
    } catch (err) {
        res.status(500).json(err);
    }
});

// 获取所有标签
router.get('/', async (req, res) => {
    try {
        const tags = await Tag.find();
        res.status(200).json(tags);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
