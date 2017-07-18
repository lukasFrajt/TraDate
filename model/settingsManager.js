/**
 * Created by lukasfrajt on 27/02/2017.
 */
var express = require("express");
var mongoose = require('mongoose');

try {
    mongoose.connect('mongodb://coklin:coklin@ds131119.mlab.com:31119/cesys');
}catch(err){
    mongoose.createConnection('mongodb://coklin:coklin@ds131119.mlab.com:31119/cesys');
}
var CountrySchema = new mongoose.Schema({
    id: { type: String, unique: true },
    name: { type: String, unique: false },
    iso2: {type: String, unique: true}
});
var DissCountrySchema = new mongoose.Schema({
    id: { type: String, unique: true },
    name: { type: String, unique: false },
    iso2: {type: String, unique: true}
});
var SuggestedCountrySchema = new mongoose.Schema({
    id: { type: String, unique: true },
    name: { type: String, unique: false },
    iso2: {type: String, unique: true}
});
var SuggestedTripTypeSchema = new mongoose.Schema({
    id: { type: String, unique: true },
    name: { type: String, unique: true },
});
var TripTypeSchema = new mongoose.Schema({
    id: { type: String, unique: true },
    name: { type: String, unique: true },
});
var SuggestedIdSchema = new mongoose.Schema({
    option1:{type: String, unique: true},
    option2:{type: String, unique: true},
    option3:{type: String, unique: true},
    option4:{type: String, unique: true},
    option5:{type: String, unique: true},
    option6:{type: String, unique: true},
    option7:{type: String, unique: true},
    option8:{type: String, unique: true}
});

CountrySchema = mongoose.model('countries', CountrySchema);
DissCountrySchema = mongoose.model('DisableCountry', DissCountrySchema);
SuggestedCountrySchema = mongoose.model('suggested_countries', SuggestedCountrySchema);
SuggestedIdSchema = mongoose.model('suggestedids', SuggestedIdSchema);
SuggestedTripTypeSchema = mongoose.model('suggested_triptype', SuggestedTripTypeSchema);
TripTypeSchema = mongoose.model('triptypes', TripTypeSchema);

//return all countries
module.exports.getAllCountries = function (callback) {
    CountrySchema.find(function(err, items){
        if(err) callback(err);
        else {callback(items);

        }
    }).lean()
};

module.exports.deleteCountry = function (id, callback) {
    CountrySchema.remove({id: id},function (err,items) {
        if(err) callback(err);
        else  callback(items)
    }).lean()
};

module.exports.addCountry = function ( country, callback) {
    var addCountry = new CountrySchema({name: country.name, iso2: country.iso2, id: country.id });
    console.log(country);
    addCountry.save(function (err) {
        if (err) {
            console.log(err)
        }
        else {
            console.log("Post saved");
        }
    });
};

module.exports.getDissCountry = function (callback) {
    DissCountrySchema.find(function(err, items){
        if(err) callback(err);
        else {callback(items);
        }
    }).lean()
};

module.exports.addDissCountry = function ( country, callback) {
   var dissCountry = new DissCountrySchema({name: country.name, iso2: country.iso2, id: country.id });
    dissCountry.save(function (err) {
        if (err) {
            return err;
        }
        else {
            console.log("Post saved");
        }
    });
};

module.exports.deleteDissCountry = function (id, callback) {
    DissCountrySchema.remove({id: id},function (err,items) {
        if(err) callback(err);
        else  callback(items)
    }).lean()
};

module.exports.getSuggestedId = function (callback) {
    SuggestedIdSchema.find(function(err, items){
        if(err) console.log(err);
        else {callback(items);
        }
    }).lean()
};

module.exports.SuggestedId = function (id, suggestedId, callback) {
    SuggestedIdSchema.findById(id, function (err, suggId) {
        if(!suggId) {
            return res.status(404).json({
                message: 'Course with id ' + id + ' can not be found.'
            });
        }
        suggId.update(suggestedId, function(error, suggIds) {
            if(error)callback(error);
            else  callback(suggIds);
        })
    });
};

module.exports.getSuggestedCountries = function (callback) {
    SuggestedCountrySchema.find(function(err, items){
        if(err) {
            return res.status(404).json({
                message: 'Database Error'
            });
        }
        else {callback(items);
        }
    }).lean()
};

module.exports.addSuggestedCountry = function (country, callback) {
    var countryAdd = new SuggestedCountrySchema(country)
    countryAdd.save(function (err) {
        if (err) {
            return err;
        }
        else {
            console.log("Country saved");
        }
    });
};

module.exports.deleteSuggestedCountry = function (id, callback) {
    SuggestedCountrySchema.remove({id: id},function (err,items) {
        if(err) callback(err);
        else  callback(items)
    }).lean()
};

module.exports.addSuggestedTripType = function (tripType, callback) {
    var suggestedTripType = new SuggestedTripTypeSchema(tripType)
    suggestedTripType.save(function (err) {
        if (err) {
            return err;
        }
        else {
            callback(console.log("TripType saved"));
        }
    });
};

module.exports.deleteSuggestedTripType= function (id, callback) {
    SuggestedTripTypeSchema.remove({id: id},function (err,items) {
        if(err) callback(err);
        else  callback(items)
    }).lean()
};
module.exports.getSuggestedTripTypes = function (callback) {
    SuggestedTripTypeSchema.find(function(err, items){
        if(err) {
            return res.status(404).json({
                message: 'Database Error'
            });
        }
        else {callback(items);
        }
    }).lean()
};

module.exports.getTripTypes = function (callback) {
    TripTypeSchema.find(function(err, items){
        if(err) {
            return res.status(404).json({
                message: 'Database Error'
            });
        }
        else {callback(items);
        }
    }).lean()
};