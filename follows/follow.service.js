const config = require('config.json');
const db = require('_helpers/db');
const Follow = db.Follow;

async function create(followParam) {
  const follow = new Follow(followParam);

  await follow.save();
}

async function getAll() {
  return await Follow.find();
}

async function get(followParam) {
  return await Follow.findOne({ user: followParam.user, manga: followParam.manga });
}

async function _delete(followParam) {
  await Follow.findOneAndRemove({ user: followParam.user, manga: followParam.manga });
}

module.exports = {
  create,
  getAll,
  get,
  delete: _delete
};
