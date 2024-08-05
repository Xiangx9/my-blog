const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/anth');
const postRoutes = require('./routes/posts');

const app = express();
const PORT = process.env.PORT || 6000;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/my_blog', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
