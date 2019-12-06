const express = require('express');
const app = express();

const userRoutes = express.Router();
let User = require('../models/User');

/**
 * Create a new user.
 */
userRoutes.route('/add').post(function (req, res) {
  const userDB = new User(req.body);
  userDB.save()
    .then(asset => {
      res.status(200).json({'user': 'user added successfully'});
    })
    .catch(err => {
      console.log(err);      
      res.status(400).send("unable to save to database");
    });
});

/**
 * ADD A ROUTE FOR LOGIN BELOW.
 */
userRoutes.route('/login').post(function (req, res) {
  const userName = req.body.name;
  const userPass = req.body.password;
  function whatToDo(error, user) {
    console.log('hello');
    if (error) console.err(error);
    if(user) {
      if (user.password == userPass) {
        res.status(200).send({'user': 'ya'});
      } else {
        console.log("password does not match");
        res.status(403).send("wrong password");
      }
    }
  }
  const user = User.findOne({ name: {$eq: userName}}).exec(whatToDo);
  //confirm password
  
});



 

module.exports = userRoutes;