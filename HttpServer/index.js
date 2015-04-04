var HttpServer={
	server: null,
	startServer:function(port) {
		var http=require('http');
		var map=require('through2-map');
		server=http.createServer(function (req,res){
			res.writeHead(200,{'content-type':'text/plain'});
			req.pipe(map(function(chunk){
				return chunk.toString().toUpperCase();
			})).pipe(res);
		});
		this.port=port;
		server.listen(port);
	}
};

module.exports=HttpServer;