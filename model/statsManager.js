/**
 * Created by lukasfrajt on 07/03/2017.
 */
var express = require("express");
var mongoose = require('mongoose');

try {
    mongoose.connect('mongodb://coklin:coklin@ds131119.mlab.com:31119/cesys');
}catch(err){
    mongoose.createConnection('mongodb://coklin:coklin@ds131119.mlab.com:31119/cesys');
}

var StatsCountrySchema = new mongoose.Schema({
    name: {type: String, unique: true},
    counter: {type: Number, unique: false},
    last_search: { type: String, unique: false, default: '' }

});

StatsCountrySchema = mongoose.model('country_stats', StatsCountrySchema)

module.exports.getStatsCountries = function (callback) {
    StatsCountrySchema.find(function (err, data) {
        callback(data)
    })
};
module.exports.getStatsCountriesByName = function (name, callback) {
    StatsCountrySchema.find({name:{$regex: name}}, function (err, data) {
        callback(data)
    })
};

module.exports.statsCountryReset = function (id,callback ) {
    StatsCountrySchema.findOneAndUpdate({_id: id }, { counter: 0, last_search: '' }, function (err, data) {
        callback(data)
    })
};
module.exports.statsOrderBy = function (orderBy,order,callback ) {
    if(orderBy =="counter"){
        StatsCountrySchema.find().sort({counter: order}).exec(function (err,data) {
            callback(data)
        })
    }else {
        StatsCountrySchema.find().sort({name: order}).exec(function (err,data) {
            callback(data)
        })
    }
};