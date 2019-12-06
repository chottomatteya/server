const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * User
 */
let User = new Schema(
  {
    name: {
      type: String
    },
    title: {
      type: String
    },
    company: {
      type: String
    }, 
    address: {
      type: String
    },
    password: {
      type: String
    }
  },
  {
    collection: 'users'
  });

module.exports = mongoose.model('users', User);