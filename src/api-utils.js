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
