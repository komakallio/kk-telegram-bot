exports.example_weather_data = {
  temperature: 15.7,
  humidity: 85.6,
  dewpoint: 13.29,
  pressure: 996.7,
  windspeed: 0.3,
  windgust: 0.4,
  winddir: 124,
  rainrate: 0,
};

exports.example_rain_data = {
  Type: "Rain",
  Rain: {
    Hail: {
      Duration: [0, "s"],
      Intensity: [0, "hits/cm2h"],
      Peak: [0, "hits/cm2h"],
      Accumulation: [0, "hits/cm2"]
    },
    Rain: {
      Duration: [57650, "s"],
      Intensity: [4.2, "mm/h"],
      Peak: [83.8, "mm/h"],
      Accumulation: [89.32, "mm"]
    }
  },
  Timestamp: 1504948359113
}

exports.example_rain_trigger_data = {
  Type: "RainTrigger",
  RainTrigger: {
    Rain: 1,
    Intensity: 591
  },
  Timestamp: 1499774671143
};
