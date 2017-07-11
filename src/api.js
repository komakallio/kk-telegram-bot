const api_utils = require('./api-utils');

const base_url = 'http://komakallio.dy.fi:9001/'

exports.api_url = base_url;

exports.weather = function() {
  return api_utils.call_api(base_url + 'weather', api_utils.parse_weather_data, 'Weather');
};

exports.rain = function() {
  return api_utils.call_api(base_url + 'rain', api_utils.parse_rain_data, 'Rain');
};

exports.rain_trigger = function() {
  return api_utils.call_api(base_url + 'raintrigger', api_utils.parse_rain_trigger_data, 'Rain trigger');
};

