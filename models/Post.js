const { model, Schema } = require('mongoose');

const postSchema = new Schema({
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    blog: { type: Schema.Types.ObjectId, ref: 'Blog' },
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
    },
    postImg: {
        type: String,
        default: ''
    }
},
{
    timestamps: true
});

postSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

const Post = model('Post', postSchema);

module.exports = Post;