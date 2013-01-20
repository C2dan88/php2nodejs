var initreq = require('./initreq.njs');

function page (req, res, pre, cb) {
	res.writeHead(200, {'Content-type': 'text/html'});

	/********************\
	*      USER CLASS    *
	\********************/

	function User(name) {
		this.name = name;
		++User.prototype.num;	// use static variable
	}

	User.prototype.num = 0;		// declare the static variable;

	User.prototype.getActions = function() {
		return ['login', 'logout', 'showHomePage'];
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

	Admin.prototype.getActions = function() {
		var a = ['showSystemLog', 'showLoggedInUsers'];
		var u = this.__proto__.__proto__.getActions(); // get the user (parent class) actions
		return u.concat(a);
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

	/*var me = new Admin('Admin');
	var actions = me.getActions();
	for(var a = 0; a < actions.length; ++a) {
		res.write(actions[a]+'<br />');
	}*/

	var users = ['Gilly', 'Ardo', 'James'];
	var accounts = [];
	for(i = 0; i < users.length; ++i) {
		accounts[i] = new User(users[i]);
	}
	res.write('The number of User objects is: '+User.prototype.num);

	res.end();
	cb();
}

exports.serve = function (req, res) {
	var pre = {}
	initreq.initGET(req, pre, function() {
		page(req, res, pre, function() { });
	});
};