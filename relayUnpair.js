/*
*
* relayUnpair.js
* 
* This script unpairs a wigwag relay from its account by setting the account ID to null
*
* Compile and run by typing: node ./relayUnpair.js relayID#
*
*/

var MongoClient = require('mongodb').MongoClient; 
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost/cloud';

var relayID = process.argv[2];//holds relay ID entered from command line

var updateRelayAccID = function(db, callback){ 
   db.collection('relays').updateOne(
      {"relayID" : relayID},//finds the relay by ID entered
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
   updateRelayAccID(db, function() { //calls the updateRelayAccID function defined above
      db.close();
   });
});

var findRelays = function(db, callback) {
   var cursor = db.collection('relays').find( { "relayID": relayID } );
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
  findRelays(db, function() {
      db.close();
  });
});

