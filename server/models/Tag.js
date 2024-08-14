// 标签模型
const mongoose = require('mongoose');

const TagSchema = new mongoose.Schema({
    name: { // 标签名
        type: String,
        required: true,
        unique: true,
    },
}, { timestamps: true });

module.exports = mongoose.model('Tag', TagSchema);
