var express = require('express');
var passport = require('passport');
var requireRole = require('../model/isAdmin');

var router = express.Router();

var env = {
    AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
    AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
    AUTH0_CALLBACK_URL: 'http://localhost:3004/callback'
};

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'TraDate' });
});

router.get('/login',
    function(req, res){
        res.render('login', { env: env });
    });

// Perform session logout and redirect to homepage
router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});

router.get('/unauthorized',
    function(req, res) {
        res.render('unauthorized');
    });


// Perform the final stage of authentication and redirect to '/user'
router.get('/callback',
    passport.authenticate('auth0'),
    function(req, res) {
        res.redirect(req.session.returnTo || '/user');
    });

module.exports = router;
