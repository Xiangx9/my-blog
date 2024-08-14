// categories.js
const express = require('express');
const Category = require('../models/Category');
const auth = require('../middlewares/auth');
const router = express.Router();

// 创建分类
router.post('/', auth, async (req, res) => {
    const { name } = req.body;

    try {
        const newCategory = new Category({ name });
        const savedCategory = await newCategory.save();
        res.status(201).json(savedCategory);
    } catch (err) {
        res.status(500).json(err);
    }
});

// 获取所有分类
router.get('/', async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
