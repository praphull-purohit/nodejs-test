var DateUtil={
	format: function(date) {
		var year=date.getFullYear(), month=date.getMonth(), day=date.getDate(),hour=date.getHours(),min=date.getMinutes();
		return year+"-"+(month<9?"0":"")+(month+1)+"-"+(day<9?"0":"")+(day)+" "+(hour<9?"0":"")+(hour)+":"+(min<9?"0":"")+(min);
	}
};
var FileServer={
	server: null,
	startServer:function(port, file) {
		var http=require('http');
		var fs=require('fs');
		server=http.createServer(function (req,res){
			var fileStream=fs.createReadStream(file);
			res.writeHead(200,{'content-type':'text/plain'});
			fileStream.pipe(res);
		});
		this.port=port;
		server.listen(port);
	}
};

module.exports=FileServer;