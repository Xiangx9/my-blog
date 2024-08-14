const express = require('express');
const Post = require('../models/Post');
const auth = require('../middlewares/auth');
const router = express.Router();

router.post('/', auth, async (req, res) => { // 添加文章
    const { title, content, author_id, author_name, categories, tags } = req.body;

    try {
        const newPost = new Post({ title, content, author_id, author_name, categories, tags });
        const savedPost = await newPost.save();
        res.status(200).json({ data: savedPost, message: '添加成功' });
    } catch (err) {
        res.status(500).json(err);
    }
});

 // 查询所有文章
router.get('/', async (req, res) => {
    const { CategoryID, TagsID } = req.query
    let query = {}
    CategoryID?query.categories=CategoryID:''
    TagsID?query.tags=TagsID:''

    console.log(query);
    try {
        const posts = await Post.find(query).populate('categories' ).populate('tags' );
        res.status(200).json({ data: posts.reverse(), message: '获取成功' });
    } catch (err) {
        res.status(500).json(err);
    }
});

 // 根据作者id和查询条件查询文章
router.get('/:id', auth, async (req, res) => {
    const { id } = req.params;
    const { CategoryID, TagsID } = req.query
    let query = {
        author_id: id,
    }
    CategoryID?query.categories=CategoryID:''
    TagsID?query.tags=TagsID:''

    try {
        const posts = await Post.find(query).populate('categories', 'name').populate('tags', 'name');
        res.status(200).json({ data: posts.reverse(), message: '获取成功' });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/getPostsDetails/:id', auth, async (req, res) => { // 根据文章id获取文章详情
    const { id } = req.params;
    console.log(id);

    try {
        const posts = await Post.findOne({ _id: id }).populate('categories').populate('tags');;
        res.status(200).json({ data: posts, message: '获取成功' });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.put('/:id', auth, async (req, res) => { // 更新文章
    const { id } = req.params;
    const { title, content,categories, tags } = req.body;
    console.log(id, title, content);

    try {
        const updatedPost = await Post.findByIdAndUpdate(id, { title, content,categories, tags }, { new: true });
        res.status(200).json({ data: updatedPost, message: '更新成功' });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete('/:id', auth, async (req, res) => { // 删除文章
    const { id } = req.params;

    try {
        await Post.findByIdAndDelete(id);
        res.status(200).json({ message: '删除成功' });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
