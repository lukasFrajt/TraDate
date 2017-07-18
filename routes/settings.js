var express= require('express');
var requireRole = require('../model/isAdmin');
var settingsManager = require('../model/settingsManager');

var router = express.Router();
//Settings for Frontend Framework, search mask, suggested terms etc.
//Filter for search mask
var countries= [];
var disableCountries = [];
//Suggested by ID
var suggestedId = new Array(8);
var suggIdDocId;
//Suggested by parameter
//->country
var suggestedCountries=[];
var suggestedCountriesOptions =[];
//->TriType
var tripTypes=[];
var suggestedTripTypes =[];
router.get('/', function (req, res) {
    settingsManager.getTripTypes(function (data) {
        tripTypes = data;
        settingsManager.getSuggestedTripTypes(function (data) {
            suggestedTripTypes = data;
        });
    });

    settingsManager.getSuggestedCountries(function (suggContries) {
        suggestedCountries = suggContries;
    });
    settingsManager.getDissCountry(function (dissCountry) {
       disableCountries = dissCountry
    });
    settingsManager.getSuggestedId(function (suggId) {
        suggIdDocId =suggId[0]._id;
        suggestedId[0] =suggId[0].option1;
        suggestedId[1] =suggId[0].option2;
        suggestedId[2] =suggId[0].option3;
        suggestedId[3] =suggId[0].option4;
        suggestedId[4] =suggId[0].option5;
        suggestedId[5] =suggId[0].option6;
        suggestedId[6] =suggId[0].option7;
        suggestedId[7] =suggId[0].option8;

    });
    settingsManager.getAllCountries(function (data) {
        countries=data;
        suggestedCountriesOptions = data;
        data.sort(function(a, b) {
            var nameA = a.name.toUpperCase(); // ignore upper and lowercase
            var nameB = b.name.toUpperCase(); // ignore upper and lowercase
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }

            // names must be equal
            return 0;
        });
        suggestedCountriesOptions = suggestedCountriesOptions.filter(function (country) {
            for(var i = 0; suggestedCountries.length > i; i++){
                if(JSON.stringify(suggestedCountries[i]) === JSON.stringify(country))
                    return false
            }
            return true;
        });
        tripTypes= tripTypes.filter(function (tripType) {
            for(var i = 0; suggestedTripTypes.length > i; i++){
                if(suggestedTripTypes[i].name === tripType.name)
                    return false
            }
            return true;
        });


        res.render('settings',{title: 'Nastavení', countries: data, suggestedId: suggestedId,
            disableCountries: disableCountries, suggestedCountries: suggestedCountries, suggestedCountriesOptions: suggestedCountriesOptions,
            tripTypes: tripTypes, suggestedTripTypes: suggestedTripTypes})
    })
});

router.post('/countrydis', function (req, res) {
    var country = countries.find(obj => obj.id == req.body.select);
    settingsManager.addDissCountry(country, function (callback) {
    });
    settingsManager.deleteCountry(req.body.select, function (callback) {
        res.redirect('/settings')
    });
});

router.get('/countryadd/:countryId', function (req,res) {
    var country = disableCountries.find(obj => obj.id == req.params.countryId);
    settingsManager.addCountry(country, function (c) {
    });
    settingsManager.deleteDissCountry(req.params.countryId, function (callback) {
    });

    res.redirect('/settings')
});

router.post('/suggestedId', function (req, res) {
    var ids = req.body;
    settingsManager.SuggestedId(suggIdDocId, ids, function (callback) {
        res.redirect('/settings')
    });
});

router.post('/addsuggestedcountry', function (req, res) {
    var country = countries.find(obj => obj.id == req.body.select)
    settingsManager.addSuggestedCountry(country, function (callback) {
    });
    
    res.redirect('/settings')

});

router.get('/deletesuggCountry/:countryId', function (req,res) {
    settingsManager.deleteSuggestedCountry(req.params.countryId, function (callback) {
        res.redirect('/settings')
    });

});

router.post('/addsuggestedtriptype', function (req, res) {
    var tripType = tripTypes.find(obj => obj.id == req.body.select)
    settingsManager.addSuggestedTripType(tripType, function (callback) {
        res.redirect('/settings')
    });

});

router.get('/deletesuggtriptype/:tripTypeId', function (req,res) {
    settingsManager.deleteSuggestedTripType(req.params.tripTypeId, function (callback) {
        res.redirect('/settings')
    });
});

module.exports = router;
