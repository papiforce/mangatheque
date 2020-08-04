const config = require('config.json');
const db = require('_helpers/db');
const Theque = db.Theque;

async function create(progressParam) {
    const progress = new Theque(progressParam);

    await progress.save();
}

async function getAll() {
    return await Theque.find();
}

async function getAllByUsers(progressParam) {
    return await Theque.find({ user: progressParam.user });
}

async function update(id, progressParam) {
    const progress = await Theque.findById(id);

    Object.assign(progress, progressParam);

    await progress.save();
}

async function _delete(id) {
    await Theque.findByIdAndRemove(id);
}

module.exports = {
  create,
  getAll,
  getAllByUsers,
  update,
  delete: _delete
};
