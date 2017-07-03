const rp = require('request-promise-native');
const winston = require('winston');
const api_utils = require('./kk-api-utils.js');

api_url = 'http://komakallio.dy.fi:9001/'

exports.weather = function() {
  return new Promise((resolve, reject) => {
    let options = {
      url: api_url + 'weather',
      json: true
    };

    rp.get(options)
      .then((body) => {
        resolve(api_utils.parse_weather_data(body));
      })
      .catch((err) => {
        winston.log('error', 'Weather API error: ' + err);
        reject();
      });
  });
};

exports.rain = function() {
  return new Promise((resolve, reject) => {
    let options = {
      url: api_url + 'rain',
      json: true
    };

    rp.get(options)
      .then(resolve)
      .catch((err) => {
        winston.log('error', 'Rain API error: ' + err);
        reject();
      });
  });
};

