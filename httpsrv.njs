var http = require('http');
var static = require('node-static');
var file = new static.Server();
var url = require('url');

var index = require('./index.njs');
var login = require('./login.njs');
var admin_index = require('./admin/index.njs');
var admin_login = require('./admin/login.njs');

var showx5 = require('./showx5.njs');
var pageNotFound = require('./PageNotFound.njs');
var calc = require('./calc.njs');
var formatClass = require('./formatClass.njs');
var inheritanceClass = require('./inheritanceClass.njs');
var parentstaticClass = require('./parentstaticClass.njs');

http.createServer(function(req, res) {
	if(url.parse(req.url).pathname == '/parentstaticClass.php') {
		parentstaticClass.serve(req, res);
	} else if(url.parse(req.url).pathname == '/inheritanceClass.php') {
		inheritanceClass.serve(req, res);
	} else if(url.parse(req.url).pathname == '/formatClass.php') {
		formatClass.serve(req, res);
	} else if(url.parse(req.url).pathname == '/calc.php') {
		calc.serve(req, res);
	} else if(url.parse(req.url).pathname == '/PageNotFound.php') {
		pageNotFound.serve(req, res);
	} else if(url.parse(req.url).pathname == '/showx5.php') {
		showx5.serve(req, res);
	} else if(url.parse(req.url).pathname == '/index.php') {
		index.serve(req, res);
	} else if(url.parse(req.url).pathname == '/login.php') {
		login.serve(req, res);
	} else if(url.parse(req.url).pathname == '/admin/index.php') {
		admin_index.serve(req, res);
	} else if(url.parse(req.url).pathname == '/admin/login.php') {
		admin_login.serve(req, res);
	} else {
		file.serve(req, res);
		/*console.log([req]);
		pageNotFound.serve(req, res);*/
	}
}).listen(1337, '127.0.0.1');

console.log('Server running at http://127.0.0.1:1337/');