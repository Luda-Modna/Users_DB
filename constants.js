const path = require('path');

const CONNSTANTS = {
  GENDERS: ['male', 'female', 'other'],
  STATIC_PATH: path.join(__dirname, process.env.STATIC_FOLDER),
};

module.exports = CONNSTANTS;
