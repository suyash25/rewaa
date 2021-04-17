"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var quoteService = require('../services/quote-service');
var quoteServiceVar = new quoteService;
var body_parser = require('body-parser');
var app = express();
app.use(body_parser.urlencoded({ extended: false }));
app.use(body_parser.json());
var quoteHandlers = (function () {
    function quoteHandlers() {
    }
    quoteHandlers.prototype.getQuoteDetails = function (req, res, next) {
        var body = req.body;
        var quoteId = "";
        var hostBasicUrl = req.protocol + '://[::]:9001';
        quoteServiceVar.sendRequest('/api/quotes', 'POST', body, {}, hostBasicUrl, function (e, r, body) { }).then(function (response) {
            if (response && response.id) {
                quoteId = response.id;
                quoteServiceVar.getQuote(hostBasicUrl, quoteId, 'candidate,pricing').then(function (quoteData) {
                    return res.status(200).send(response);
                }).catch(function (error) {
                    res.status(500).send(error);
                });
            }
        }).catch(function (error) {
            res.status(500).send(error);
        });
    };
    return quoteHandlers;
}());
module.exports = quoteHandlers;
//# sourceMappingURL=quoteHandler.js.map