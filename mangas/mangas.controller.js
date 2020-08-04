const express = require('express');
const router = express.Router();
const mangaService = require('./manga.service');

router.post('/add', add);
router.get('/', getAll);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', _delete);

function add(req, res, next) {
    mangaService.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    mangaService.getAll()
        .then(mangas => res.json(mangas))
        .catch(err => next(err));
}

function getById(req, res, next) {
    mangaService.getById(req.params.id)
        .then(manga => manga ? res.json(manga) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    mangaService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    mangaService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}

module.exports = router;
