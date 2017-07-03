exports.parse_weather_data = function(data) {
  if (data == undefined) {
    throw new Error('Undefined weather data!');
  }

  let output = {};
  output.temperature = parse_weather_item('Temperature', data.temperature, '°C');
  output.humidity = parse_weather_item('Relative humidity', data.humidity, '%');
  output.dewpoint = parse_weather_item('Dew point', data.dewpoint, '°C');
  output.pressure = parse_weather_item('Pressure', data.pressure, 'hPa');
  output.windspeed = parse_weather_item('Wind speed', data.windspeed, 'm/s');
  output.windgust = parse_weather_item('Wind gust speed', data.windgust, 'm/s');
  output.winddir = parse_weather_item('Wind direction', data.winddir, '°');
  output.rainrate = parse_weather_item('Rain rate', data.rainrate, 'mm/h');
  output.cloudcover = parse_weather_item('Cloud cover', data.cloudcover, '%');
  output.skytemperature = parse_weather_item('Sky temperature', data.skytemperature, '°C');
  output.skyquality = parse_weather_item('Sky quality', data.skyquality, 'mag/arcsec²');

  return output;
};

let parse_weather_item = function(name, value, unit) {
  if (value == null) {
    throw new Error(name + ' missing from data!');
  }
  return { name: name, value: value, unit: unit };
}
