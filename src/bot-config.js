const fs = require('fs');

let openConfig = function() {
  const filename = 'bot-config.json'
  if (fs.existsSync(filename)) {
    let file_contents = JSON.parse(fs.readFileSync(filename));
    return file_contents;
  } else {
    throw new Error('Configuration file not found!');
  }
};

module.exports = openConfig();
