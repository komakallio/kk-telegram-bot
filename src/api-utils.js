const rp = require('request-promise-native');
const winston = require('winston');

exports.parse_weather_data = function(data) {
  if (data == undefined) {
    throw new Error('Undefined weather data!');
  }

  let output = {};
  output.temperature = parse_item('Temperature', data.temperature, '°C');
  output.humidity = parse_item('Relative humidity', data.humidity, '%');
  output.dewpoint = parse_item('Dew point', data.dewpoint, '°C');
  output.pressure = parse_item('Pressure', data.pressure, 'hPa');
  output.windspeed = parse_item('Wind speed', data.windspeed, 'm/s');
  output.windgust = parse_item('Wind gust speed', data.windgust, 'm/s');
  output.winddir = parse_item('Wind direction', data.winddir, '°');
  output.rainrate = parse_item('Rain rate', data.rainrate, 'mm/h');
  output.cloudcover = parse_item('Cloud cover', data.cloudcover, '%');
  output.skytemperature = parse_item('Sky temperature', data.skytemperature, '°C');
  output.skyquality = parse_item('Sky quality', data.skyquality, 'mag/arcsec²');

  return output;
};

exports.parse_rain_data = function(data) {
  if (data == undefined) {
    throw new Error('Undefined rain data!');
  }
  let output = {};
  output.hail = parse_item('Hail intensity', data.Data.Hail.Intensity[0], 'hits/cm²h');
  output.rain = parse_item('Rain intensity', data.Data.Rain.Intensity[0], 'mm/h');

  return output;
};

let parse_item = function(name, value, unit) {
  if (value == null) {
    throw new Error(name + ' missing from data!');
  }
  return { name: name, value: value, unit: unit };
}

exports.parse_rain_trigger_data = function(data) {
  if (data == undefined) {
    throw new Error('Undefined rain trigger data!');
  }

  let output = {};
  output.rain = parse_item('Raining', data.Data.Rain == 1, '');
  output.wetness = parse_item('Plate wetness', data.Data.Intensity, '');

  return output;
};

exports.call_api = function(url, callback, name) {
  return new Promise((resolve, reject) => {
    let options = {
      url: url,
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
