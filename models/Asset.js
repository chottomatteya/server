const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Asset
 */
let AssetSchema = new Schema(
  {
    location: {
      type: String
    },
    name: {
      type: String
    },
    owner: {
      type: String
    },
    price: { 
      type: Number
    }
  },
  {
    collection: 'assets'
  });

module.exports = mongoose.model('assets', AssetSchema);