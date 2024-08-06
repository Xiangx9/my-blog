const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    author_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    author_name: {
        type: String,
        required: true, 
    }
}, { timestamps: true });

module.exports = mongoose.model('Post', PostSchema);
