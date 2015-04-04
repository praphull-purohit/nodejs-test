var excercise=12;
function logData(data) {
	console.log(data);
}
switch(excercise) {
	//Arguments
	case 2:
	{
		var argCnt=process.argv.length;
		var sum=0;
		for(var i=2;i<argCnt;i++)
			sum+=parseInt(process.argv[i]);
		console.log(sum);
		break;
	}
	//Read file contents - sync
	case 3:
	{
		var fs=require('fs');
		//Read a file
		var buf=fs.readFileSync(process.argv[2]);
		var fileFullContents=buf.toString();
		var lineCount = fileFullContents.split('\n');
		console.log(lineCount.length-1);
		break;
	}
	//Read async
	case 4:
	{
		var fs=require('fs');
		var readLineCount=function(callback){
			fs.readFile(process.argv[2], function doneReading(err,fileContents) {
				var lineCount = fileContents.toString().split('\n').length-1;
				callback(lineCount);
			});
		};
		
		function printData(data) {
			console.log(data);
		}
		readLineCount(printData);
		break;
	}
	//List directory contents and get extension from path
	case 5:
	{
		/*var fs=require('fs');
		fs.readdir(process.argv[2],function finishedRead(err,contents){
			var pattern="."+process.argv[3];
			for(var i=0; i<contents.length;i++) {
				
				var data=contents[i].split(pattern);
				if(data.length==2 && data[data.length-1]=="")
					console.log(contents[i]);
			}
		});*/
		var fs=require('fs');
		var path=require('path');
		fs.readdir(process.argv[2],function finishedRead(err,contents){
			var pattern="."+process.argv[3];
			contents.forEach(function(file) {
					if(path.extname(file)==pattern)
						console.log(file);
				}
			);
		});
		break;
	}
	//List dir using module
	case 6:
	{
		var folderfilter=require('./folderfilter');
		folderfilter.filterContents(process.argv[2],
			process.argv[3],
			function filterResults(err, filteredContents) {
				if(err)
					return console.error('Error encountered:',err);
				filteredContents.forEach(logData);
			}
		);
		break;
	}
	//HTTP Client
	case 7:
	{
		var http=require('http');
		var request=http.get(process.argv[2],function(response) {
			response.setEncoding('utf8');
			response.on("data",function(data) {
				console.log(data);
			});
			response.on("error",console.error);
			/*response.on("end",function(data) {
			});*/
		});
		
		request.end();
		
		break;
	}
	//HTTP Collect
	case 8:
	{
		var bl=require('bl');
		var http=require('http');
		var req=http.get(process.argv[2],function(res) {
			res.pipe(bl(function(err,data){
				if(err)
					return console.error(err);
				var str=data.toString();
				console.log(str.length);
				console.log(str);
			}));
		});
		req.end();
		break;
	}
	//Async queuing
	case 9:
	{
		var bl=require('bl');
		var http=require('http');
		var reqList={
			requests:[
				{url:process.argv[2],data:"",req:null},
				{url:process.argv[3],data:"",req:null},
				{url:process.argv[4],data:"",req:null}
			],
			requestsFinished: 0,
			printData: function(){
				this.requests.forEach(function(request){
					console.log(request.data);
				});
			}
		};
		reqList.requests.forEach(function(request){
			request.req=http.get(request.url,function(response){
				response.pipe(bl(function(err,resData){
					if(err)
						return console.error(err);
					request.data=resData.toString();
					reqList.requestsFinished++;
					if(reqList.requestsFinished==reqList.requests.length)
						reqList.printData();
				}));
			});
			//request.req.end();
		});
		break;
	}
	//Time Server:
	case 10: {
		var ts=require('./TimeServer');
		ts.startServer(parseInt(process.argv[2]));
		break;
	}
	//File Server:
	case 11: {
		var fs=require('./FileServer');
		fs.startServer(parseInt(process.argv[2]),process.argv[3]);
		break;
	}
	//HTTP Server
	case 12: {
		var httpServer=require('./HttpServer');
		httpServer.startServer(parseInt(process.argv[2]));
		break;
	}
	//JSON API Server
	case 12: {
		var jsonServer=require('./JsonApiServer');
		jsonServer.startServer(parseInt(process.argv[2]));
		break;
	}
}

