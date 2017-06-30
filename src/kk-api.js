const request = require('request');
const winston = require('winston');

api_url = 'http://komakallio.dy.fi:9001/'

exports.weather = function(success_cb, failure_cb) {
  let options = {
    url: api_url + 'weather',
    json: true
  };

  request.get(options, function(err, res, body) {
    if (err) {
      winston.log('error', 'Weather API error: ' + err);
      failure_cb();
      return;
    } else if (res.statusCode != 200) {
      winston.log('error', 'Weather API returned status code: ' + res.statusCode);
      failure_cb();
      return;
    }
    success_cb(body);
  });
};

exports.rain = function(success_cb, failure_cb) {
  let options = {
    url: api_url + 'rain',
    json: true
  };

  request.get(options, function(err, res, body) {
    if (err) {
      winston.log('error', 'Rain API error: ' + err);
      failure_cb();
      return;
    } else if (res.statusCode != 200) {
      winston.log('error', 'Rain API returned status code: ' + res.statusCode);
      failure_cb();
      return;
    }
    success_cb(body);
  });
}
