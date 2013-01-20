var initreq = require('./initreq.njs');

function page(req, res, pre, cb) {
	res.writeHead(200, {'Content-Type': 'text/plain'});
	//res.end('admin/index.njs\n'+util.inspect(pre));
	if(pre._GET['x']) {
		res.end('The value of x is '+pre._GET['x']+'.');
	} else {
		res.end('The is no value for x.');
	}
	cb();
}

exports.serve = function(req, res) {
	var pre = {};
	initreq.initGET(req, pre, function() {
		initreq.initPOST(req, pre, function() {
			initreq.initCOOKIE(req, pre, function() {
				initreq.initREQUEST(req, pre, function() {
					//initreq.initSESSION(req, pre, function() {
						page(req, res, pre, function() {
							/*var cookies = [];
							for(var c in pre._COOKIE) {
								cookies.push(c + '=' + pre._COOKIE['c']);
							}
							res.setHeader('Set-Cookie', cookies);*/
							res.writeHead(200, {'Content-Type': 'text/plain'});
							res.end(res.content);
						});
					//});
				});
			});
		});
	});
};