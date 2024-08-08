const express = require('express');
const Post = require('../models/Post');
const router = express.Router();

router.post('/', async (req, res) => {
    const { title, content, author_id,author_name } = req.body;

    try {
        const newPost = new Post({ title, content, author_id,author_name });
        const savedPost = await newPost.save();
        res.status(200).json({data:savedPost, message: '添加成功'});
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/', async (req, res) => {
    try {
        const posts = await Post.find(); // 查询所有文章
        res.status(200).json({data:posts.reverse(), message: '获取成功'});
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    
    try {
        const posts = await Post.find({ author_id:id });
        res.status(200).json({data:posts.reverse(), message: '获取成功'});
    } catch (err) {
        res.status(500).json(err);
    }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    console.log(id,title, content);
    
    try {
        const updatedPost = await Post.findByIdAndUpdate(id, { title, content }, { new: true });
        res.status(200).json({data:updatedPost, message: '更新成功' });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await Post.findByIdAndDelete(id);
        res.status(200).json({ message: '删除成功' });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
