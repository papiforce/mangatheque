const express = require('express');
const router = express.Router();
const thequeService = require('./theque.service');

router.post('/add', add);
router.get('/', getAll);
router.get('/mine', getAllByUsers);
router.put('/:id', update);
router.delete('/:id', _delete);

function add(req, res, next) {
    thequeService.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    thequeService.getAll()
        .then(theques => res.json(theques))
        .catch(err => next(err));
}

function getAllByUsers(req, res, next) {
    thequeService.getAllByUsers(req.body)
        .then(theques => res.json(theques))
        .catch(err => next(err));
}

function update(req, res, next) {
    thequeService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    thequeService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}

module.exports = router;
