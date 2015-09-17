/**
 * Module dependencies
 */

var express = require('express')
  , path = require('path')
, fs = require('fs')
;

// create express app
var app = express();

// configure express stuff
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

// custom middleware
app.use(function(req, res, next) {
    console.log('Time: %d; Route: %s', Date.now(), req.url);
    next();
});

app.get('/', function(req, res) {
    var prefix;
    if(req.headers['x-proxy-prefix']) {
	prefix = req.headers['x-proxy-prefix']
    } else {

	// FIXME what's the error here?
	prefix = '/';
    }
    
    res.render('acorns', {prefix: prefix});
});


var port = process.env.PORT || 3030;

// START SERVER
// ======================================
app.listen(port);
console.log('listening on port ' + port);
