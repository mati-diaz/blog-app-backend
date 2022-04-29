const { model, Schema } = require('mongoose');

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    fullname: {
        type: String,
        maxlength: 40,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ''
    },
    profileImg: {
        type: String,
        default: ''
    },
    configDone: {
        type: Boolean,
        default: false
    },
},
{
    timestamps: true
});

userSchema.method('toJSON', function() {
    const { __v, _id, password, ...object } = this.toObject();
    object.id = _id;
    return object;
})

const User = model('User', userSchema);

module.exports = User;