const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Asset
 */
let AssetSchema = new Schema(
  {
    code: {
      type: Number
    },
    name: {
      type: String
    },
    owner: {
      type: String
    },
    avatar: { type: Array }
  },
  {
    collection: 'assets'
  });

module.exports = mongoose.model('assets', AssetSchema);