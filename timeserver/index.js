var DateUtil={
	format: function(date) {
		var year=date.getFullYear(), month=date.getMonth(), day=date.getDate(),hour=date.getHours(),min=date.getMinutes();
		return year+"-"+(month<9?"0":"")+(month+1)+"-"+(day<9?"0":"")+(day)+" "+(hour<9?"0":"")+(hour)+":"+(min<9?"0":"")+(min);
	}
};
var TimeServer={
	server: null,
	port: null,
	startServer:function(port) {
		var net=require('net');
		var server=net.createServer(function (socket){
			//socket.write();
			socket.end(DateUtil.format(new Date()));
		});
		this.port=port;
		server.listen(port);
	}
};

module.exports=TimeServer;