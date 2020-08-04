const config = require('config.json');
const db = require('_helpers/db');
const Manga = db.Manga;

async function getAll() {
    return await Manga.find();
}

async function getById(id) {
    return await Manga.findById(id);
}

async function create(mangaParam) {
    if (await Manga.findOne({ name: mangaParam.name })) {
      throw 'There is already "' + mangaParam.name + '" in the db';
    }

    const manga = new Manga(mangaParam);

    await manga.save();
}

async function update(id, mangaParam) {
    const manga = await Manga.findById(id);

    if (!manga) throw 'Manga not found';
    if (manga.name !== mangaParam.name && await Manga.findOne({ name: mangaParam.name })) {
        throw 'There is already "' + mangaParam.name + '" in the db';
    }

    Object.assign(manga, mangaParam);

    await manga.save();
}

async function _delete(id) {
    await Manga.findByIdAndRemove(id);
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};
