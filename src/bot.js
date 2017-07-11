const winston = require('winston');
const Telebot = require('telebot');
const kk_api = require('./api');

// Configure logger
winston.add(winston.transports.File, { filename: 'bot.log' });

// Load bot configuration file
let bot_config = {};
try {
  bot_config = require('./bot-config');
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

bot.on('/start', (msg) => {
  if(!is_allowed_user(msg)) {
    return;
  }
  msg.reply.text('An astronomically good day to you, ' + msg.from.first_name + '!');
});

bot.on('/weather', (msg) => {
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
      msg.reply.text('Sorry, there was a problem fetching weather data!');
    });
});

bot.on('/rain', (msg) => {
  if(!is_allowed_user(msg)) {
    msg.reply.text('Sorry, you are not part of the Komakallio inner circle!');
    return;
  }

  kk_api.rain_trigger()
    .then((rain_trigger) => {
      let is_raining = rain_trigger.rain.value;
      if (is_raining) {
        kk_api.rain()
          .then((rain_data) => {
            msg.reply.text(rain_data.rain.name + ': ' + rain_data.rain.value + ' ' + rain_data.rain.unit +'\n' +
                            rain_data.hail.name + ': ' + rain_data.hail.value + ' ' + rain_data.hail.unit);
          })
          .catch(() => {
            msg.reply.text('Sorry there was a problem fetching rain data!');
          });
      } else {
        msg.reply.text('It is not raining!');
      }
    })
    .catch(() => {
      msg.reply.text('Sorry there was a problem fetching rain data!');
    });
});

bot.start();

let is_allowed_user = function(msg) {
  return (allowed_ids.indexOf(msg.chat.id) > -1);
}
