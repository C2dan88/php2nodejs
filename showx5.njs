var initreq = require('./initreq.njs');

function page(req, res, pre, cb) {
	var content = '';
	var x = parseInt(pre._REQUEST['x']);
	x += 5;
	content += '<html><head></head><body>';
	content += 'The value of x plus 5 is '+x+'.';
	content += '</body></html>';
	res.writeHead(20, {'Content-Type': 'text/html'})
	res.end(content);
	cb();
}

exports.serve = function(req, res) {
	var pre = {};
	initreq.initGET(req, pre, function() {
		initreq.initPOST(req, pre, function() {
			initreq.initCOOKIE(req, pre, function() {
				initreq.initREQUEST(req, pre, function() {
					/*initreq.initSESSION(req, pre, function() {*/
						page(req, res, pre, function() {
							/*var cookies = [];
							for(var c in pre._COOKIE) {
								cookies.push(c + '=' + pre._COOKIE['c']);
							}
							res.setHeader('Set-Cookie', cookies);*/
							res.writeHead(200, {'Content-Type': 'text/plain'});
							res.end(res.content);
						});
					/*});*/
				});
			});
		});
	});
};