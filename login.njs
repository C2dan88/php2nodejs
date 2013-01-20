exports.serve = function(req, res) {
res.writeHead(200, {'Content-Type': 'text/plain'});
res.end('/login.njs');
};