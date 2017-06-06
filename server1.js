var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('admin:admin@ds143081.mlab.com:43081/karthik', ['content']);
var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/'));
app.use(bodyParser.json());

app.get('/content', function (req, res) {
  console.log('I received a GET request');

  db.content.find(function (err, docs) {
    console.log(docs);
    res.json(docs);
  });
});

app.post('/content', function (req, res) {
  console.log(req.body);
  db.content.insert(req.body, function(err, doc) {
    res.json(doc);
  });
});

app.delete('/content/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.content.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

app.get('/content/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.content.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

app.put('/content/:id', function (req, res) {
  var id = req.params.id;
  console.log(req.body.name);
  db.content.findAndModify({
    query: {_id: mongojs.ObjectId(id)},
    update: {$set: {name: req.body.name, content: req.body.progress, date: req.body.date}},
    new: true}, function (err, doc) {
      res.json(doc);
    }
  );
});

app.listen(3000);
console.log("Server running on port 3000");
