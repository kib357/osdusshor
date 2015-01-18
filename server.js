var express = require('express');
var compression = require('compression')
var app = express();
app.use(compression());
app.use(express.static(__dirname));
app.set('port', 8000);
var server = app.listen(app.get('port'));
console.log("app.js up and running on port " + app.get('port'));
