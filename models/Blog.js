const { model, Schema } = require('mongoose');

const blogSchema = new Schema({
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ''
    }
},
{
    timestamps: true
});

blogSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

const Blog = model('Blog', blogSchema);

module.exports = Blog;