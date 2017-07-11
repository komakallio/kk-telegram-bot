const rp = require('request-promise-native');
const winston = require('winston');
const api_utils = require('./api-utils.js');

api_url = 'http://komakallio.dy.fi:9001/'

exports.weather = function() {
  return call_api('weather', api_utils.parse_weather_data, 'Weather');
};

exports.rain = function() {
  return call_api('rain', api_utils.parse_rain_data, 'Rain');
};

exports.rain_trigger = function() {
  return call_api('raintrigger', api_utils.parse_rain_trigger_data, 'Rain trigger');
};

let call_api = function(suffix, callback, name) {
  return new Promise((resolve, reject) => {
    let options = {
      url: api_url + suffix,
      json: true
    }

    rp.get(options)
      .then((body) => resolve(callback(body)))
      .catch((err) => {
        winston.log('error', name + ' API error: ' + err);
        reject();
      });
  });
};
