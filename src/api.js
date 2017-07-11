const api_utils = require('./api-utils.js');

api_url = 'http://komakallio.dy.fi:9001/'

exports.weather = function() {
  return api_utils.call_api('weather', api_utils.parse_weather_data, 'Weather');
};

exports.rain = function() {
  return api_utils.call_api('rain', api_utils.parse_rain_data, 'Rain');
};

exports.rain_trigger = function() {
  return api_utils.call_api('raintrigger', api_utils.parse_rain_trigger_data, 'Rain trigger');
};

