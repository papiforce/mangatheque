const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    type: { type: String, required: true },
    image: { type: String, required: true },
    name: { type: String, unique:true, required: true },
    author: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    scan: { type: String, required: false },
    year: { type: String, required: true },
    status: { type: String, required: true },
    link: { type: String, required: false },
    follow: { type: String, required: false, default: "0" },
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

module.exports = mongoose.model('Mangas', schema);
