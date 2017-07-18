/**
 * Created by lukasfrajt on 23/02/2017.
 */
var express = require("express");
var mongoose = require('mongoose');

mongoose.connect('mongodb://coklin:coklin@ds131119.mlab.com:31119/cesys');

var OrderSchema = new mongoose.Schema({
    id: {type: Number, unique: true},
    user_id: {type: String, unique: false},
    term_id: {type: Number, unique: false},
    people_count: {type: Number, unique: false},
    price: {type: Number, unique: false},
    tour_operator: { unique:false},
    price_currency: {type: String, unique: false},
    country: {type: String},
    destination: {type: String},
    rooms:  {type : Array , "default" : []},
    people:  {type : Array , "default" : []},
    term: {type: Object},
    info: {type: String, unique:false, 'default': ''},
    status:{type: String, unique:false}
});

OrderSchema = mongoose.model('orders', OrderSchema);

//return all orders
module.exports.getAllOrders = function (callback) {
    OrderSchema.find(function(err, items){
        if(err) callback(err);
        else {callback(items);

        }
    })
};

//return one order by ID
//parameter: ID of order
module.exports.getOneOrder =  function (id, callback) {
    OrderSchema.find({_id: id},function (err,items) {
        if(err) callback(err);
        else  callback(items)
    }).lean()

};

//delete one order by ID
//parameter: ID of order
module.exports.deleteOrder = function (id, callback) {
    OrderSchema.findByIdAndRemove(id,function (err,items) {
        if(err) callback(err);
        else  callback(items)
    }).lean()
};

module.exports.updateStatus= function (id, status, callback) {
    OrderSchema.findByIdAndUpdate(id,{status: status}, function (err, items) {
        if(err) callback(err);
        else  callback (items)
    })
};