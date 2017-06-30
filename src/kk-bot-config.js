const fs = require('fs');
// TODO: Do something if config file does not exist!
module.exports = JSON.parse(fs.readFileSync('bot-config.json'));
