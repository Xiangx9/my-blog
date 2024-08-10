const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/anth');
const postRoutes = require('./routes/posts');
const commentRoutes = require('./routes/comments');


const app = express();
const PORT = process.env.PORT || 3030;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/my_blog', {})
    .then(() => console.log('MongoDB 启动成功'))
    .catch(err => console.log("MongoDB 启动成功",err));
    
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
