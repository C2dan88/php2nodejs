var initreq = require('./initreq.njs');

function page (req, res, pre, cb) {
	res.writeHead(200, {'Content-type': 'text/html'});

	/********************\
	*      USER CLASS    *
	\********************/

	function User(name) {
		this.name = name;
	}

	User.prototype.getName = function () {
		return this.name;
	}

	User.prototype.homePage = function () {
		var msg = 'Welcome ' + this.getName();
		return '<html><head><title>'+msg+'</title></head><body>'+msg+'</body></html>';
	}

	/********************\
	*     ADMIN CLASS    *
	\********************/

	function Admin(name) {
		// Extends User class above
		var p = Object.create(new User(name), {});
		for(var pp in this.constructor.prototype) {
			p[pp] = this.constructor.prototype[pp];
		}
		p.constructor = this.constructor;
		this.__proto__ = p;
		this.name = name;
	}

	Admin.prototype.homePage = function () {
		var msg = 'Welcome ' + this.getName() + ' (Administrator)';
		return '<html><head><title>'+msg+'</title></head><body>'+msg+'</body></html>';
	}

	Admin.prototype.logPage = function (log) {
		var logHtml = '';
		for(var l = 0; l < log.length; ++l) {
			logHtml += log[l]+'<br />';
		}
		return '<html><head><title>System Log</title></head><body>'+logHtml+'</body></html>';
	}

	/*var me = new User('guest');
	res.write(me.homePage());*/

	me = new Admin('Admin');
	var page = '';
	var links = '<p><a href="inheritanceClass.php?action=home">Home</a> | <a href="inheritanceClass.php?action=log">Log</a></p>';

	switch(pre._GET['action'])
	{
		case 'log':
			var log = ['Error #30: User not found', 'Error #31: Invalid password'];
			page = me.logPage(log);
		break;

		case 'home':
		default:
			page = me.homePage();
		break;
	}

	res.write(page + links);
	/*
	res.write(me.logPage(log);*/
	
	res.end();
	cb();
}

exports.serve = function (req, res) {
	var pre = {}
	initreq.initGET(req, pre, function() {
		page(req, res, pre, function() { });
	});
};