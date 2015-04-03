var excercise=6;
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
	
}

