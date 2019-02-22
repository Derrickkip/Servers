const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ServerPort = new Schema({
  name: {
    type: String
  },
  port: {
    type: Number
  }
  }, {
    collection: 'servers'
  });

module.exports = mongoose.model('ServerPort', ServerPort);