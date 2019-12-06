const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Asset
 */
let Asset = new Schema(
  {
    code: {
      type: Number
    },
    name: {
      type: String
    },
    owner: {
      type: String
    }
  },
  {
    collection: 'assets'
  });

module.exports = mongoose.model('assets', Asset);