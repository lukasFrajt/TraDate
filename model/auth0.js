/**
 * Created by lukasfrajt on 25/02/2017.
 */
var express = require("express");
var request = require("request");

function getToken(callback) {

    var options = { method: 'POST',
        url: 'https://coklin.eu.auth0.com/oauth/token',
        headers: { 'content-type': 'application/json' },
        body:
            { grant_type: 'client_credentials',
                client_id: 'CnyJyYCFdrOasfr5giT2Vn82PlppTfrU',
                client_secret: 'NC2_opQnHwhIniF-q8JGQgAmhRpNzipmJk2VxemyxE95pBIVUndov_p2exopwH7X',
                audience: 'https://coklin.eu.auth0.com/api/v2/' },
        json: true };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        callback(body)
    })
}

module.exports.getUserById = function (id, callback) {

    getToken(function (token) {
        var options = { method: 'GET',
            url: 'https://coklin.eu.auth0.com/api/v2/users/'+id,
            headers:
                { authorization: 'Bearer ' + token.access_token,
                    'content-type': 'application/json' } };

        request(options, function (error, response, body) {
            if (error) throw new Error(error);
            callback(body)
        });
    });
};

module.exports.getAllUsers = function (perPage, page,callback) {
    var properties ={perpage: perPage, page: page,include_totals:true};
    getToken(function (token) {
        var options = { method: 'GET',
            url: 'https://coklin.eu.auth0.com/api/v2/users',
            qs : properties,
            headers:
                { authorization: 'Bearer ' + token.access_token,
                    'content-type': 'application/json' } };

        request(options, function (error, response, body) {
            if (error) throw new Error(error);
            callback(body)
        });

    })
};

module.exports.getUsersByParams = function (value, param, perPage, page,callback) {
    if(param == 'name'){
        var properties ={q: 'user_metadata.full_name:'+value+'*',perPage: perPage, page: page,include_totals:true,search_engine:'v2'};
    }else
        var properties ={q: param+':'+ value+'*',perPage: perPage, page: page,include_totals:true,search_engine:'v2'};
    getToken(function (token) {
        var options = { method: 'GET',
            url: 'https://coklin.eu.auth0.com/api/v2/users',
            qs : properties,
            headers:
                { authorization: 'Bearer ' + token.access_token,
                    'content-type': 'application/json' } };

        request(options, function (error, response, body) {
            if (error) throw new Error(error);
            callback(body)
        });

    })
};
module.exports.deleteUser = function (id, callback) {

    getToken(function (token) {

        var options = { method: 'DELETE',
            url: 'https://coklin.eu.auth0.com/api/v2/users/'+id,
            headers:
                { authorization: 'Bearer ' + token.access_token,
                    'content-type': 'application/json' } };

        request(options, function (error, response, body) {
            if (error) throw new Error(error);
            callback(body)
        });

    })
};

module.exports.restartCountryStats = function (id, callback) {
    var options = { method: 'PUT',
        url: 'http://localhost:3000/stats/country-reset',
        headers: { authorization: 'Bearer '+ id} };

    request(options, function (error, response, body) {
        if (error) callback(error);
        else callback(body);
    });
};

