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
      winston.log('error', err);
      failure_cb();
      return;
    }
    if (res.statusCode != 200) {
      winston.log('error', res.statusCode);
      failure_cb();
      return;
    }
    success_cb(body);
  });
};
