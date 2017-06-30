const request = require('request');

api_url = 'http://komakallio.dy.fi:9001/'

exports.weather = function(callback) {
  let options = {
    url: api_url + 'weather',
    json: true
  };
  request(options, function(err, res, body) {
    if (err) {
      console.log(err)
      return;
    }
    if (res.statusCode != 200) {
      console.log(res.statusCode);
      return;
    }
    callback(body);
  });
};
