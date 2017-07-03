const rp = require('request-promise-native');
const winston = require('winston');

api_url = 'http://komakallio.dy.fi:9001/'

exports.weather = function(success_cb, failure_cb) {
  let options = {
    url: api_url + 'weather',
    json: true
  };

  rp.get(options)
    .then(success_cb)
    .catch((err) => {
      winston.log('error', 'Weather API error: ' + err);
      failure_cb();
    });
};

exports.rain = function(success_cb, failure_cb) {
  let options = {
    url: api_url + 'rain',
    json: true
  };

  rp.get(options)
    .then(success_cb)
    .catch((err) => {
      winston.log('error', 'Rain API error: ' + err);
      failure_cb();
    });
};
