const express = require('express');
const router = express.Router();

const User = require('../models/user');

router.get('/:userID', (req, res) => {
  User
    .findById(req.params.userID)
    .populate('subjects.subject')
    .exec()
    .then(user => res.status(200).json(user));
});

module.exports = router;