const express = 
  require('express'),
  path = require('path'),
  bodyParser = require('body-parser'),
  cors = require('cors'),
  mongoose = require('mongoose'),
  config = require('./DB');

const assetRoute = require('./routes/asset.route');
const userRoute = require('./routes/user.route');

mongoose.Promise = global.Promise;
mongoose.connect(config.DB, { useNewUrlParser: true }).then(
  () => {console.log('Connected to the database.') },
  err => { console.log('Cannot connect to the database: '+ err)}
);

// var version=process.env.version || "1.0"

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname,'../dist/angular7crud')));
app.use('/asset', assetRoute);
app.use('/user', userRoute);
app.use('/',function(req,res) { res.sendFile(path.join(__dirname,'../dist/angular7crud')) });

const port = 4000;
const server = app.listen(port, function(){
  console.log('Server is listening on port ' + port);
});