function parsetime (time) {
return {
hour: time.getHours(),
minute: time.getMinutes(),
second: time.getSeconds()
}
}
function unixtime (time) {
return { unixtime : time.getTime() }
}
var JsonApiServer={
	server: null,
	startServer:function(port) {
		var http=require('http');
		var url=requirer('url');
		this.server=http.createServer(function (req,res){
			var parsedUrl = url.parse(req.url, true)
			var time = new Date(parsedUrl.query.iso)
			var result
			if (/^\/api\/parsetime/.test(req.url))
				result = parsetime(time)
			else if (/^\/api\/unixtime/.test(req.url))
				result = unixtime(time)
			if (result) {
				res.writeHead(200, { 'Content-Type': 'application/json' })
				res.end(JSON.stringify(result))
			} else {
				res.writeHead(404)
				res.end()
			}
			
			/*var reqDetails=url.parse(req.url,true);
			//var date=new Date(reqDetails.query.iso);
			var dateJson={d:reqDetails.protocol};
			if(reqDetails.pathname=='/api/parsetime') {
				dateJson={
					hour:date.getHours(),
					minute:date.getMinutes(),
					second:date.getSeconds()
				};
			} else if(reqDetails.pathname=='/api/unixtime') {
				dateJson={
					unixtime:date.getTime()
				};
			}else dateJson={"d":reqDetails.pathname};
			res.writeHead(200,{'Content-Type':'application/json'});
			//res.write("{a:b}");
			res.end("{c:d}");*/
		});
		
		this.port=port;
		this.server.listen(port);
	}
};

module.exports=JsonApiServer;