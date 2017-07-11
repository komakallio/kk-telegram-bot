exports.example_weather_data = {
  temperature: 15.7,
  humidity: 85.6,
  dewpoint: 13.29,
  pressure: 996.7,
  windspeed: 0.3,
  windgust: 0.4,
  winddir: 124,
  rainrate: 0,
  cloudcover: 100,
  skytemperature: 13.06,
  skyquality: 0
};

exports.example_rain_data = {
  Data: {
    Hail: {
      Duration: [
        0,
        "s"
      ],
      Intensity: [
        0,
        "hits/cm2h"
      ],
      Peak: [
        0,
        "hits/cm2h"
      ],
      Accumulation: [
        0,
        "hits/cm2"
      ]
    },
    Rain: {
      Duration: [
        9050,
        "s"
      ],
      Intensity: [
        0,
        "mm/h"
      ],
      Peak: [
        30,
        "mm/h"
      ],
      Accumulation: [
        6.56,
        "mm"
      ]
    }
  },
  Type: "Rain",
  Timestamp: 1499079534548
};

exports.example_rain_trigger_data = {
  Type: "RainTrigger",
  Data: {
    Rain: 1,
    Intensity: 591
  },
  Timestamp: 1499774671143
};
