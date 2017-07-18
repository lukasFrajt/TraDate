/**
 * Created by lukasfrajt on 07/03/2017.
 */
var express= require('express');
var requireRole = require('../model/isAdmin');
var statsManager = require('../model/statsManager');
var router = express.Router();
var auth0 = require('../model/auth0');

var order = 1;

router.get('/', requireRole('admin'), function (req, res) {
    var countryValue= '';
    var countries;
    if(req.query.name){
        countryValue = req.query.name
        statsManager.getStatsCountriesByName(function (data) {
            countries = data;
            res.render('stats', {title: 'Statistika vyhledávání', countryValue: countryValue, countries:countries})
        })
    }
    else {
        statsManager.getStatsCountries(function (data) {
            countries = data;
            res.render('stats', {title: 'Statistika vyhledávání',countryValue: countryValue, countries:countries})
        })
    }


});

router.get('/all',requireRole('admin'), function (req,res) {
    auth0.restartCountryStats(req.user.extraParams.id_token,function (response) {
        res.redirect('stats')
    })
});


router.get('/:value', function (req,res) {
    var countryValue= '';
    var countries;
    statsManager.statsOrderBy(req.params.value,order,function (data) {
        if(order == 1) order = -1;
        else  order =1
        countries = data;
        res.render('stats', {title: 'Statistika vyhledávání',countryValue: countryValue, countries:countries})
    })
})

router.get('/restart/:id',requireRole('admin'), function (req,res) {
   if(req.params.id){
       console.log(req.params.id)
       statsManager.statsCountryReset(req.params.id, function (response) {
           res.redirect('/stats')
       })
   }
});



module.exports = router;