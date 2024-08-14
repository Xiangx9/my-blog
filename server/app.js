const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/anth');
const postRoutes = require('./routes/posts');
const commentRoutes = require('./routes/comments');
const categoryRoutes = require('./routes/categories');
const tagRoutes = require('./routes/tags');



const app = express();
const PORT = process.env.PORT || 3030;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/my_blog', {})
    .then(() => console.log('MongoDB 启动成功'))
    .catch(err => console.log("MongoDB 启动成功",err));


app.use('/api/auth', authRoutes); // 登录注册
app.use('/api/posts', postRoutes); // 文章
app.use('/api/comments', commentRoutes); // 评论
app.use('/api/categories', categoryRoutes); // 分类
app.use('/api/tags', tagRoutes); // 标签

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
