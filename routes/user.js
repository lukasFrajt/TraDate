var express = require('express');
var passport = require('passport');
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();
var router = express.Router();
var requireRole = require('../model/isAdmin');
var request = require("request");

// Get the user profile
router.get('/',ensureLoggedIn, requireRole('admin'), function(req, res, next) {

    res.render('user', { user: req.user.profile });
    var options = { method: 'POST',
        url: 'https://coklin.eu.auth0.com/oauth/token',
        headers: { 'content-type': 'application/json' },
        body: '{"client_id":"CnyJyYCFdrOasfr5giT2Vn82PlppTfrU","client_secret":"NC2_opQnHwhIniF-q8JGQgAmhRpNzipmJk2VxemyxE95pBIVUndov_p2exopwH7X","audience":"https://coklin.eu.auth0.com/api/v2/","grant_type":"client_credentials"}' };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

    });




});

module.exports = router;