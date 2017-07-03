const api_utils = require('../src/kk-api-utils');
const assert = require('assert');
const sinon = require('sinon');
const fake_data = require('./kk-api-example-data');

describe('kk-api-utils', () => {
  describe('parse_weather_data', () => {
    this.expected_example_output = {
      temperature: { name: 'Temperature', value: 15.7, unit: '°C' },
      humidity: { name: 'Relative humidity', value: 85.6, unit: '%' },
      dewpoint: { name: 'Dew point', value: 13.29, unit: '°C' },
      pressure: { name: 'Pressure', value: 996.7, unit: 'hPa' },
      windspeed: { name: 'Wind speed', value: 0.3, unit: 'm/s' },
      windgust: { name: 'Wind gust speed', value: 0.4, unit: 'm/s' },
      winddir: { name: 'Wind direction', value: 124, unit: '°' },
      rainrate: { name: 'Rain rate', value: 0, unit: 'mm/h' },
      cloudcover: { name: 'Cloud cover', value: 100, unit: '%' },
      skytemperature: { name: 'Sky temperature', value: 13.06, unit: '°C' },
      skyquality: { name: 'Sky quality', value: 0, unit: 'mag/arcsec²' }
    };

    it('throws error on no data', () => {
      assert.throws(() => api_utils.parse_weather_data(), Error);
    });

    it('correctly parses weather data', () => {
      let actual_output = api_utils.parse_weather_data(fake_data.example_weather_data);

      assert.deepEqual(
        actual_output,
        this.expected_example_output,
        'Parsed weather data not correct!'
      );
    });

    it('throws error if part of data missing', () => {
      partial_data = {};
      partial_data = fake_data.example_weather_data.temperature;
      partial_data = fake_data.example_weather_data.humidity;

      assert.throws(() => api_utils.parse_weather_data(partial_data), Error);
    });
  });
});
