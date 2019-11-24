var http = require('http');
var url = require('url');
var fs = require('fs');
var events = require('events');

http.createServer(function(req, res){
	if(req.url === '/favicon.ico'){res.end();}
	else{
		res.writeHead(200, {'Content-Type': 'test/html'});
		if((req.url).indexOf("?") != -1)
		{
			var q = url.parse(req.url, true).query;
			var n = q.name;
			var l1 = q.firstLanguage;
			var l2 = q.secondLanguage;
		}
		console.log(n+" "+l1+" "+l2+"\n");
		console.log(req.url);
		
		fs.readFile('./web.html', function(err, data) {
			if (err) {
				res.writeHead(404, {'Content-Type': 'text/html'});
				return res.end("404 Not Found");
			} 
			res.writeHead(200, {'Content-Type': 'text/html'});
			res.write(data);
			return res.end();
		});
	}
}).listen(8080);