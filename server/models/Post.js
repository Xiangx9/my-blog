// 文章模型
const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title: { // 标题
        type: String,
        required: true,
    },
    content: { // 文章内容
        type: String,
        required: true,
    },
    author_id: { // 作者id (登录的用户_id)
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    author_name: { // 作者名 (登录的用户名)
        type: String,
        required: true,
    },
    categories: [{ // 分类
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
    }],
    tags: [{ // 标签
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tag',
    }],
}, { timestamps: true });

module.exports = mongoose.model('Post', PostSchema);
