/**
 * Created by lukasfrajt on 06/03/2017.
 */
var express = require('express');
var requireRole = require('../model/isAdmin');
var router = express.Router();
var mailer = require('../model/mailer');


router.get('/',requireRole('admin'), function (req,res) {
    var userMail= '';
    var subInfo= '';
    var message='';
    var info='test'
    var success;
    if(req.query.mail)
        userMail = req.query.mail;
    if(req.query.subject != null) {
        subInfo = req.query.subject
    }
    if(req.query.success == 'true'){
        success= true;
        info = "Váš email byl úspěšně odeslán"
    }
    if(req.query.success == 'false'){
        success= false;
        info = "Zkontrolujte prosím zda máte vyplněné všechny pole a spravný formát emailové adresy"
    }
    res.render('sendMail', {title: "Mailer" ,info: info, success: success, userMail: userMail, message:message, subInfo: subInfo})
});

router.post('/send',requireRole('admin'), function (req,res) {
    var mail = req.body;
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var test = re.test(mail.address);
    if(test && mail.message.length >2 && mail.subject.length > 1){
        res.redirect('/send-mail?success=true');
        mailer.Mail(mail.address, mail.subject, mail.message);
    }


    else
        res.send(false)
});

module.exports = router;
