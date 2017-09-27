// server.js
// where your node app starts

// init project
const express = require('express')
const helmet = require('helmet')
const hat = require('hat');
const app = express()
const PouchDB = require('pouchdb')
// create pouchdb database in .data
const db = new PouchDB('counts');

app.use(helmet())
app.use(require("cors")())

app.use('/up/:counter', function(req,res){
  db.get(req.params.counter).then(function (doc) {
    if (!doc.protected || req.query.secret===doc.secret){
      doc.age++
      doc.count++
      db.put(doc);
      res.send((doc.count).toString())
    }else{
      res.send("The counter is protected")
    }
  }).catch(function(){
      res.send('not found')
  });
})
app.use('/total/:counter', function(req,res){
  db.get(req.params.counter).then(function (doc) {
    if (!doc.hidden || req.query.secret===doc.secret){
      res.send((doc.count).toString())
    }else{
      res.send("The counter is hidden")
    }
  }).catch(function(){
      res.send('not found')
  });
})
app.use('/new/:counter', function(req,res){
  db.get(req.params.counter).then(function (doc) {
    res.send("The counter already exists")
  }).catch(function(){
      var doc = {
        "_id": req.params.counter,
        secret:req.query.secret || hat(),
        "count":0,
        protected:req.query.protected ? true : false,
        hidden:req.query.hidden ? true : false,
      };
      db.put(doc);
      res.send(doc.secret)
  })
})
app.use('/delete/:counter', function(req,res){
  db.get(req.params.counter).then(function (doc) {
    if (req.query.secret===doc.secret){
      db.remove(doc);
      res.send("removed")
    }else{
      res.send("The counter is protected")
    }
  }).catch(function(){
      res.send('not found')
  });
})
app.use('/', function(req,res){
  db.info().then(function (info) {
    res.send("use the routes '/new/counterName' to create a new counter and '/up/counterName' to 1-up it");
  })
})

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your pouchdb is listening on port ' + listener.address().port);
});
