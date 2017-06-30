const request = require('request');
const winston = require('winston');

api_url = 'http://komakallio.dy.fi:9001/'

exports.weather = function(callback) {
  let options = {
    url: api_url + 'weather',
    json: true
  };
  request(options, function(err, res, body) {
    if (err) {
      winston.log('error', err)
      return;
    }
    if (res.statusCode != 200) {
      winston.log('error', res.statusCode);
      return;
    }
    callback(body);
  });
};
