const Telebot = require('telebot');
const kk_api = require('./kk-api');
const bot_config = require('./kk-bot-config');

const allowed_ids = bot_config.allowed_chat_ids;
const bot_token = bot_config.token;

let bot = new Telebot({
  token: bot_token,
  usePlugins: ['floodProtection']
});

bot.on('/start', function(msg) {
  if(!is_allowed_user(msg)) {
    return;
  }
  msg.reply.text('Tähtitieteellisen hyvää päivää, ' + msg.from.first_name + '!');
});

bot.on('/weather', function(msg) {
  if(!is_allowed_user(msg)) {
    msg.reply.text('Sori, et kuulu sisäpiiriin!');
    return;
  }
  kk_api.weather((weather_conditions) => {
    let temp = weather_conditions.temperature;
    let hum = weather_conditions.humidity;
    let wind_speed = weather_conditions.windspeed;
    msg.reply.text('Lämpötila: ' + temp + '°C, suhteellinen kosteus: ' + hum + '%, tuulen nopeus: ' + wind_speed + ' m/s');
  });
});

bot.start();

let is_allowed_user = function(msg) {
  return (allowed_ids.indexOf(msg.chat.id) > -1);
}
