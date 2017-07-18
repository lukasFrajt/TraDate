/**
 * Created by lukasfrajt on 26/02/2017.
 */
var express = require("express");
'use strict';
const nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: '******',
        pass: '******'
    }
});

// send mail with defined transport object
module.exports.Mail = function (emailTo, subject, message) {
    transporter.sendMail({
        from: 'TraDate Service TradDate@tradate.com', // sender address
        to: emailTo, // list of receivers
        subject: subject, // Subject line
        text: message, // plain text body
    }, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
});

};

