const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    avatar: { type: String, required: false },
    email: { type: String, unique:true, required: true },
    username: { type: String, unique: true, required: true },
    hash: { type: String, required: true },
    role: { type: String, required: true, default: "user" },
    createdDate: { type: Date, default: Date.now }
});

schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.hash;
    }
});

module.exports = mongoose.model('User', schema);
