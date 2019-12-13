const express = require('express');
const multer = require('multer');
let bodyParser = require('body-parser');
const url = 'mongodb://127.0.0.1:27017/database';
let GridFsStorage = require('multer-gridfs-storage');
let Grid = require('gridfs-stream');
const app = express();

const assetRoutes = express.Router();
let Asset = require('../models/Asset');

//check if assets in db is empty
let testAssets = require('../models/shopping.json');
Asset.find( function (err, assets) {
  if (err) {
    console.err('having trouble reading from mongo');
  } else {
    //console.log('the asset returned is ',assets);
    if (assets.length == 0) {
      for (let i = 0; i < 20; i++) {
        const ass = new Asset(testAssets[i]);
        ass.save();
      }
    } 
  }
})
/**
 * Get asset.
 */
assetRoutes.route('/').get(function (req, res) {
    Asset.find(function (err, assets){
    if(err){
      console.log(err);
    }
    else {
      res.json(assets);
    }
  });
});

/**
 * Add assset.
 */
// Setting up the storage element
let storage = new GridFsStorage({url});

// Multer configuration for single file uploads
let upload = multer({
  storage
}).single('photo');

assetRoutes.route('/addImage').post(function (req, res) {
  upload(req,res, (err) => {
    console.log( 'I am here.', err);
    if(err){
         res.json({error_code:1,err_desc:err});
         return;
    }
    res.json({error_code:0, error_desc: null, file_uploaded: true});
});
});

assetRoutes.route('/add').post(function (req, res) {
  let asset = new Asset(req.body);
  asset.save()
    .then(asset => {
      res.status(200).json({'asset': 'asset added successfully'});
    })
    .catch(err => {
      console.log(err);      
      res.status(400).send("unable to save to database");
    });
});

/**
 * Delete asset.
 */
assetRoutes.route('/delete/:id').get(function (req, res) {
  let id = req.params.id;
  Asset.findByIdAndRemove({_id: req.params.id}, function(err, asset) {
      if(err) {
        console.log("Failed to remove asset id: " + id + ".");
        res.json(err);
      }
      else {
        console.log("Successfully removed asset id: " + id + ".");
        // res.json('Successfully removed asset.');
      }
  });
});

/**
 * Edit asset.
 */
assetRoutes.route('/edit/:id').get(function (req, res) {
  let id = req.params.id;
  console.log(id);  
  Asset.findById(id, function (err, asset) {
      res.json(asset);
  });
});

/**
 * Update asset.
 */
assetRoutes.route('/update/:id').post(function (req, res) {
    Asset.findById(req.params.id, function(err, asset) {
    if (!asset) {
      return next(new Error('Could not load document.'));
    }
    else {
      asset.code = req.body.code;
      asset.owner = req.body.owner;
      asset.name = req.body.name;

      asset.save().then(asset => {
          res.json('Update complete.');
      })
      .catch(err => {
            res.status(400).send("Unable to update the database.");
      });
    }
  });
});

module.exports = assetRoutes;