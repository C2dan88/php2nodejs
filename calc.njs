var initreq = require('./initreq.njs');

function page (req, res, pre, cb) {
	res.writeHead(200, {'Content-type': 'text/html'});

	var x = parseInt(pre._GET['x']);
	var y = parseInt(pre._GET['y']);

	function add(x, y) {
		return x + y;
	}

	res.write(x+' + '+y+' = '+add(x, y));

	res.end();
	cb();
}

exports.serve = function (req, res) {
	var pre = {}
	initreq.initGET(req, pre, function() {
		page(req, res, pre, function() {

		});
	});
};