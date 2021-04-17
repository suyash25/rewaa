"use strict";
var express = require('express');
var https = require('https');
var rp = require('request-promise');
var body_parser = require('body-parser');
var app = express();
app.use(body_parser.urlencoded({ extended: false }));
app.use(body_parser.json());
var quoteService = (function () {
    function quoteService() {
        this.sendRequest = this.sendRequest.bind(this);
    }
    quoteService.prototype.sendRequest = function (url_suffix, method, body, headers, hostBasicUrl, on_response) {
        return rp({
            method: method,
            url: hostBasicUrl + url_suffix,
            headers: headers,
            json: body
        }, on_response);
    };
    ;
    quoteService.prototype.getQuote = function (hostBasicUrl, quoteId, includeParam) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (!includeParam) {
                includeParam = "?include=specification,pricing,validation,candidate";
            }
            else {
                if (includeParam != "none") {
                    includeParam = "?include=" + includeParam;
                }
                else {
                    includeParam = "";
                }
            }
            _this.sendRequest('/api/quotes/' + quoteId + includeParam, 'GET', {}, {}, hostBasicUrl, function (e, r, body) { }).then(function (result) {
                return resolve(result);
            }).catch(function (error) {
                reject(error);
            });
        });
    };
    ;
    return quoteService;
}());
module.exports = quoteService;
//# sourceMappingURL=quote-service.js.map