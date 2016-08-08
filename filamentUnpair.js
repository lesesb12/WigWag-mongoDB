/*
*
* filamentUnpair.js
* 
* This script unpairs a wigwag filament from its account by setting the account ID to null
*
* Compile and run by typing: node ./filamentUnpair.js filamentID#
*
*/
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost/cloud';

var filamentID = process.argv[2];//holds filament ID entered from command line


var updateFilAccID = function(db, callback){
   db.collection('devices').updateOne(
      {"deviceID" : filamentID},//finds the filament by ID entered
      {
         $set:{"accountID" : null}//sets account ID to null
      },
     function(err, results){
     console.log(results);
      callback();
   });
};

MongoClient.connect(url, function(err, db) { //connecting to mongoDB 
   assert.equal(null, err);
   updateFilAccID(db, function() { //calls the updateFilAccID function defined above
      db.close();
   });
});

var findFilaments = function(db, callback) {
   var cursor = db.collection('devices').find( { "deviceID": filamentID } );
   cursor.each(function(err, doc) {
      assert.equal(err, null);
      if (doc != null) {
         console.dir(doc);
      } else {
         callback();
      }
   });
};

MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  findFilaments(db, function() {
      db.close();
  });
});

