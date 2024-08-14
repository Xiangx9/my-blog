// 文章分类模型
// Category.js
const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    name: { // 分类名称
        type: String,
        required: true,
        unique: true,
    },
}, { timestamps: true });

module.exports = mongoose.model('Category', CategorySchema);
