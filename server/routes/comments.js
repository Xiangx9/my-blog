const express = require('express');
const Comment = require('../models/Comment');
const auth = require('../middlewares/auth');
const router = express.Router();

// 添加评论
router.post('/', auth, async (req, res) => { 
    const { content, postId } = req.body;
    const author = req.user.id;

    try {
        const newComment = new Comment({ content, author, post: postId });
        const savedComment = await newComment.save();
        res.status(201).json({data:savedComment,message: '评论成功'});
    } catch (err) {
        res.status(500).json(err);
    }
});

// 获取评论
router.get('/:postId',auth, async (req, res) => { 
    const { postId } = req.params;
    
    try {
        const comments = await Comment.find({ post: postId }).populate('author', 'username');
        
        res.status(200).json({data:comments,message: '获取成功'});
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
