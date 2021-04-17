var express = require('express');
var https = require('https');
var rp = require('request-promise');
var body_parser = require('body-parser');
var app = express();
app.use(body_parser.urlencoded({ extended: false }));
app.use(body_parser.json());

class quoteService {
  constructor() {
    this.sendRequest = this.sendRequest.bind(this);
  }

  /*Common request to handle the API calls to CPQ server*/

  sendRequest(url_suffix, method, body, headers, hostBasicUrl, on_response) {
    return rp({
      method: method,
      url: hostBasicUrl + url_suffix,
      headers: headers,
      json: body
    }, on_response);
  };

  /*Common request to handle the getQuote API calls to CPQ server*/

  getQuote(hostBasicUrl, quoteId, includeParam?: string) {
    return new Promise((resolve, reject) => {
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
      this.sendRequest('/api/quotes/' + quoteId + includeParam, 'GET', {}, {}, hostBasicUrl, function (e, r, body) { }
      ).then(result => {
        return resolve(result);
      }).catch((error) => {

        reject(error);
      });
    });
  };

}

export = quoteService;


