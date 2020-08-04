const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  user: { type: String, required: true },
  manga: { type: String, required: true }
})

schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.hash;
    }
});

module.exports = mongoose.model('Follow', schema);
