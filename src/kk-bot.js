const winston = require('winston');
const Telebot = require('telebot');
const kk_api = require('./kk-api');

// Configure logger
winston.add(winston.transports.File, { filename: 'kk-bot.log' });

// Load bot configuration file
let bot_config = {};
try {
  bot_config = require('./kk-bot-config');
} catch (err) {
  winston.log('error', err.message);
  return;
}

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
  msg.reply.text('An astronomically good day to you, ' + msg.from.first_name + '!');
});

bot.on('/weather', function(msg) {
  if(!is_allowed_user(msg)) {
    msg.reply.text('Sorry, you are not part of the Komakallio inner circle!');
    return;
  }
  kk_api.weather()
    .then((weather) => {
      let temp = weather.temperature;
      let hum = weather.humidity;
      let wind = weather.windspeed;
      msg.reply.text(temp.name + ': ' + temp.value + ' ' + temp.unit + '\n' +
                      hum.name + ': ' + hum.value + ' ' + hum.unit + '\n' +
                      wind.name + ': ' + wind.value + ' ' + wind.unit + '.');
    })
    .catch(() => {
      msg.reply.text('Sorry, there was a problem fetching the data!');
    });
});

bot.start();

let is_allowed_user = function(msg) {
  return (allowed_ids.indexOf(msg.chat.id) > -1);
}
