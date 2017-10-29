var _ = require('lodash');
var Promise = require('bluebird');
var passport = require('passport');

var express = require('express');
var router = express.Router();

var helpers = require('./helpers');

/* GET home page. */
router.get('/', asyncWrap(async (req, res) => {
    res.render('index');
}));

/* GET about page. */
router.get('/about', asyncWrap(async (req, res) => {
    res.render('about');
}));

/* GET dashboard, we verify that the user is already authenticated with checkLogin() */
router.get('/dashboard', helpers.checkLogin, asyncWrap(async (req, res) => {

    //let's just list the accounts available in the system
    //so we see how sequelize and async/await can be used
    let accounts = await models.Account.findAll({ raw: true });

    return res.render('dashboard', {
        accounts: accounts
    });
}));




/* GET login page, we verify that the user is not authenticated with checkUnauthorized() */
router.get('/login', helpers.checkUnauthorized, asyncWrap(async (req, res) => {

    res.render('login');
}));

/* POST login data */
router.post('/login', passport.authenticate('local'), asyncWrap(async (req, res) => {

    //passport verified the password, so we're good
    res.redirect('/dashboard');
}));

/* POST logout, we verify that the user is already authenticated with checkLogin() */
router.post('/logout', helpers.checkLogin, asyncWrap(async (req, res) => {

    req.logout();
    return res.send('success');
}));

module.exports = router;
