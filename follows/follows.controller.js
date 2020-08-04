const express = require('express');
const router = express.Router();
const followService = require('./follow.service');

router.post('/', add);
router.get('/', getAll);
router.get('/follow', getFollow);
router.delete('/', _delete);

function add(req, res, next) {
  followService.create(req.body)
      .then(() => res.json({}))
      .catch(err => next(err));
}

function getAll(req, res, next) {
  followService.getAll()
      .then(follows => res.json(follows))
      .catch(err => next(err));
}

function getFollow(req, res, next) {
  followService.get(req.body)
      .then(follow => res.json(follow))
      .catch(err => next(err));
}

function _delete(req, res, next) {
  followService.delete(req.body)
      .then(() => res.json({}))
      .catch(err => next(err));
}

module.exports = router;
