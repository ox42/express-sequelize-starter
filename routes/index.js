var _ = require('lodash');
var Promise = require('bluebird');

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', asyncWrap(async (req, res) => {
    res.render('index');
}));


/* GET about page. */
router.get('/about', asyncWrap(async (req, res) => {
    res.render('about');
}));

module.exports = router;
