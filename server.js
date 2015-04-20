var express = require('express');
var bodyParser = require('body-parser'); // parse JSON, text, raw, url-encode
var mongoose = require('mongoose');
var cors = require('cors'); // cross origin http

mongoose.connect('mongodb://localhost/simple');

var personSchema = {
  firstName: String,
  lastName: String,
  email: String
};
var Person = mongoose.model('Person', personSchema, 'people');


var app = express();
app.use(cors());
app.use(bodyParser());


app.route('/')
  .get(function (req, res) {
    res.send('Hi from Express');
  });

// this is an api call from an app
app.route('/people')
  .get(function (req, res) {
    Person.find().select("firstName").exec(function (err, doc) {
      res.send(doc);
    })
  })
  // can continue request on to the same route
  .post(function (req, res) {
    Person.update({_id: req.body._id}, {firstName: req.body.firstName}, function(err) {
      "use strict";
      res.send(req.body);
    })
  });

app.route('/people/:id')
  .get(function (req, res) {
    Person.findById(req.params.id, function (err, doc) {
      res.send(doc);
    })
  });

app.listen(3000);
