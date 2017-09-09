const api_utils = require('../src/api-utils');
const assert = require('assert');
const sinon = require('sinon');
const rp = require('request-promise-native');
const fake_data = require('./api-example-data');
const winston = require('winston');

// Disable logging for tests
winston.remove(winston.transports.Console);

describe('api-utils', () => {
  describe('parse_weather_data', () => {
    this.expected_weather_output = {
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
        this.expected_weather_output,
        'Parsed weather data not correct!'
      );
    });

    it('throws error if part of data missing', () => {
      partial_data = {};
      partial_data.temperature = fake_data.example_weather_data.temperature;
      partial_data.humidity = fake_data.example_weather_data.humidity;

      assert.throws(() => api_utils.parse_weather_data(partial_data), Error);
    });
  });

  describe('parse_rain_data', () => {
    this.expected_rain_output = {
      hail: {
        name: 'Hail intensity',
        value: 0,
        unit: 'hits/cm²h'
      },
      rain: {
        name: 'Rain intensity',
        value: 4.2,
        unit: 'mm/h'
      }
    };

    it('throws error on no data', () => {
      assert.throws(() => api_utils.parse_rain_data(), Error);
    });

    it('corretly parses rain data', () => {
      let actual_output = api_utils.parse_rain_data(fake_data.example_rain_data);

      assert.deepEqual(
        actual_output,
        this.expected_rain_output,
        'Parsed rain data not correct!'
      );
    });

    it('throws error if part of data missing', () => {
      partial_data = {
        Data: {
          Rain: fake_data.example_rain_data.Rain.Rain
        }
      };

      assert.throws(() => api_utils.parse_rain_data(partial_data), Error);
    });
  });

  describe('parse_rain_trigger_data', () => {
    this.expected_rain_trigger_output = {
      rain: {
        name: 'Raining',
        value: true,
        unit: ''
      },
      wetness: {
        name: 'Plate wetness',
        value: 591,
        unit: ''
      }
    };

    it('throws error on no data', () => {
      assert.throws(() => api_utils.parse_rain_trigger_data(), Error);
    });

    it('correctly parses rain trigger data', () => {
      let actual_output = api_utils.parse_rain_trigger_data(fake_data.example_rain_trigger_data);

      assert.deepEqual(
        actual_output,
        this.expected_rain_trigger_output,
        'Parsed rain trigger data not correct!'
      );
    });

    it('throws error if part of data missing', () => {
      partial_data = {
        RainTrigger: {
          Intensity: 0
        }
      };

      assert.throws(() => api_utils.parse_rain_trigger_data(partial_data), Error);
    });
  });

  describe('call_api', () => {
    beforeEach(() => {
      this.requestStub = sinon.stub(rp, 'get');
    });

    afterEach(() => {
      this.requestStub.restore();
    });

    it('should call correct url', () => {
      this.requestStub.resolves();

      api_utils.call_api('http://example.com/api', () => {}, 'Test');

      assert(this.requestStub.calledWithMatch({url: 'http://example.com/api'}));
    });

    it('should resolve on success', (done) => {
      this.requestStub.resolves();

      api_utils.call_api('http://example.com/api', () => {}, 'Test')
        .then(() => {
          assert(true);
          done();
        })
        .catch(() => {
          assert(false);
          done();
        });
    });

    it('should reject on error', (done) => {
      this.requestStub.rejects();

      api_utils.call_api('http://example.com/api', () => {}, 'Test')
        .then(() => {
          assert(false);
          done();
        })
        .catch(() => {
          assert(true);
          done();
        });
    });
  });
});
