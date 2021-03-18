var express = require('express')
var app = express();
var proxy = require('express-http-proxy'); 
app.use('/', proxy('http:127.0.0.1:5500'));
app.use(express.static('./final-board'))
app.listen(5501);
