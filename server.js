// server.js
// where your node app starts

// init project
var express = require('express')
var helmet = require('helmet')
var app = express()
var PouchDB = require('pouchdb')
// create pouchdb database in .data
var db = new PouchDB('counts');

app.use(helmet())
app.use(require("cors")())

app.use('/up/:counter', function(req,res){
  db.get(req.params.counter).then(function (doc) {
    doc.age++
    doc.count++
    db.put(doc);
    res.send((doc.count).toString())
  }).catch(function(){
      var doc = {
        "_id": req.params.counter,
        "count":0
      };
      db.put(doc);
      res.send('0')
  });

})
app.use('/total/:counter', function(req,res){
  db.get(req.params.counter).then(function (doc) {
    res.send((doc.count).toString())
  })
})
app.use('/', function(req,res){
  db.info().then(function (info) {
    res.send("use the routes /up/counterName and /total/counterName");
  })
})

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your pouchdb is listening on port ' + listener.address().port);
});
