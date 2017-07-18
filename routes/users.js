var express = require('express');
var requireRole = require('../model/isAdmin');
var router = express.Router();
var auth0 = require('../model/auth0');

router.get('/', function(req, res, next) {
    var users;
    var max= 20;
    var page =0
    var parameter='';
    var value=""
    if(req.query.options != null && req.query.value != null){
        if(req.query.options == '1')
            parameter='name';
        if(req.query.options == '2')
            parameter='email';
    auth0.getUsersByParams(req.query.value,parameter, max, 0, function (data) {
        users = JSON.parse(data);
        value = req.query.value;
        res.render('users', { title: 'Uživatelé', users: users.users, parameter: value });

    })

    }else{
        auth0.getAllUsers(max,page,function (_users) {
            users =JSON.parse(_users).users;
            if(users.total > 20){
                page++
            }
            res.render('users', { title: 'Uživatelé', users: users, parameter: parameter });

        })
    }



});

router.get('/:id', function (req,res, next) {
    var userId = req.params.id;
    var user;
    auth0.getUserById(userId, function (_user) {
        user = JSON.parse(_user);
        res.render('userDetail', {user: user})
    })
});

router.get('/delete/:id', function (req,res) {
    var userId = req.params.id;
    auth0.deleteUser(userId, function (response) {
        res.redirect('/users')
    })
})


module.exports = router;
