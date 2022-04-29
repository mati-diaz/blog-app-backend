const { model, Schema } = require('mongoose');

const commentSchema = new Schema({
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    post: { type: Schema.Types.ObjectId, ref: 'Post' },
    description : {
        type: String,
        required: true
    },
},
{
    timestamps: true
});

commentSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

const Comment = model('Comment', commentSchema);

module.exports = Comment;