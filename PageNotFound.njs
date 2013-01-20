var initreq = require('./initreq.njs');
var fs 		= require('fs');

function page(req, res, pre, cb) {
	res.writeHead(400, '404 Not Found', {'Content-Type': 'text/html'});
	var ps = pre._REQUEST['site'];
	var site = ps != '' ? ps : req;

	res.write('<html><head></head><body>\n');

	fs.readFile('header.html', 'ascii', function(err, header) {
		res.write(header);
		res.write('The page could not be found  echo '+site+'.\n');
		fs.readFile('footer.html', 'ascii', function(err, footer) {
			res.write(footer);
			res.end('</body></html>\n');
			cb();
		});
	});
}

exports.serve = function(req, res) {
	var pre = {};
	initreq.initGET(req, pre, function() {
		initreq.initPOST(req, pre, function() {
			initreq.initCOOKIE(req, pre, function() {
				initreq.initREQUEST(req, pre, function() {
					page(req, res, pre, function() {
					});
				});
			});
		});
	});
};