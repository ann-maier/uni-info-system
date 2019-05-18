const express = require('express');
const router = express.Router();

const Subject = require('../models/subject');

router.get('/', (req, res) => {
  Subject
    .find()
    .exec()
    .then(subject => res.status(200).json(subject));
});

module.exports = router;