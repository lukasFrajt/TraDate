var express = require('express');
var passport = require('passport');
var requireRole = require('../model/isAdmin');
var ordersManager = require('../model/ordersManager');
var auth0 = require('../model/auth0');
var router = express.Router();
var mailer = require('../model/mailer');

var lastUser;
var lastOrder;

router.get('/', requireRole('admin'), function (req, res) {
    ordersManager.getAllOrders(function (data) {
        res.render('orders', {title: 'Objednávky', orders: data })
    });

});
router.get('/:orderId',requireRole('admin'), function(req, res) {
    ordersManager.getOneOrder(req.params.orderId, function (order) {
        auth0.getUserById(order[0].user_id, function (user) {


            lastUser = JSON.parse(user);
            lastOrder = order;console.log(order.id)
            res.render('order', { order: order, user: JSON.parse(user) });
        });

    });
});

router.get('/status/:orderId/:statusId', requireRole('admin'), function (req, res) {
    if(req.params.orderId= lastOrder[0]._id){
        var status= lastOrder[0].status;
        if(req.params.statusId == '1')
            status ='complete';
        else if(req.params.statusId == '2')
            status ='processing';
        else if(req.params.statusId == '3')
            status ='error';
        ordersManager.updateStatus(req.params.orderId,status, function (response) {
            res.redirect('/orders/'+req.params.orderId);
        })
    }
});

router.get('/delete/:orderId',requireRole('admin'), function (req, res) {
    if(req.params.orderId ==lastOrder[0]._id ){
        res.redirect('/orders');
        ordersManager.deleteOrder(req.params.orderId, function (response) {
        });
        mailer.Mail(lastUser.email, 'Objednávka byla zrušena', 'Vaše objednávka ID '+ req.params.orderId +' byla zrušena');

    }
    else {
        res.send('Nesmažu')
    }

});

module.exports = router;

