var initreq = require('./initreq.njs');

function page (req, res, pre, cb) {
	res.writeHead(200, {'Content-type': 'text/html'});

	function Format(s) {
		this.source = s;
	}

	Format.prototype.apply = function (a) {
		var ret = this.source;
		for (var i=1; i <= a.length; ++i) {
			var ff, f = '{$'+i+'}';
			while((ff = ret.indexOf(f)) !== -1) {
				ret = ret.substring(0, ff) + a[i-1] + ret.substring(ff + f.length);
			}
		}
		return ret;
	}

	var f = new Format('Error {$1}: {$2}');
	res.write(f.apply(['30', 'User not found']));
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