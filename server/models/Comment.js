// 评论系统模型
const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    content: { // 评论内容
        type: String,
        required: true,
    },
    author: { // 评论作者
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    post: { // 评论所属文章
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: true,
    },
}, { timestamps: true });

module.exports = mongoose.model('Comment', CommentSchema);
