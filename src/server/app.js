var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();

app.set('views', 'src/server/views/');
app.set('view engine', 'jade');

app.use(bodyParser.json());

app.use(express.static(path.resolve(__dirname, '../../public')));

app.get('/', function(req, res, next) {
    res.render('index');
});

module.exports = app;
