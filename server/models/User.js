// 用户模型
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { // 用户名
        type: String,
        required: true,
        unique: true,
    },
    email: { // 邮箱
        type: String,
        required: false,
        unique: true,
    },
    password: { // 密码
        type: String,
        required: true,
    },
    refreshToken: { // 刷新令牌
        type: String,
    },
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
