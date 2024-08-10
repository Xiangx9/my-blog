const express = require('express');
const Post = require('../models/Post');
const auth = require('../middlewares/auth');
const router = express.Router();

router.post('/',auth, async (req, res) => { // 添加文章
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

router.get('/:id', auth,async (req, res) => { // 根据作者id查询文章
    const { id } = req.params;
    
    try {
        const posts = await Post.find({ author_id:id });
        res.status(200).json({data:posts.reverse(), message: '获取成功'});
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/getPostsDetails/:id', auth,async (req, res) => { // 根据文章id获取文章详情
    const { id } = req.params;
    console.log(id);
    
    try {
        const posts = await Post.findOne({ _id:id });
        res.status(200).json({data:posts, message: '获取成功'});
    } catch (err) {
        res.status(500).json(err);
    }
});

router.put('/:id',auth, async (req, res) => { // 更新文章
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

router.delete('/:id',auth, async (req, res) => { // 删除文章
    const { id } = req.params;

    try {
        await Post.findByIdAndDelete(id);
        res.status(200).json({ message: '删除成功' });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
