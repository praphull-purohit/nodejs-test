function filterContents(dir, extn, callback) {
	var fs=require('fs');
	var path=require('path');
	fs.readdir(dir, function(err, contents) {
		if(err)
			return callback(err);
		var result=[];
		contents.forEach(function(file) {
			if(path.extname(file)=="."+extn)
				result.push(file);
		});
		callback(null,result);
	});
};
var thisModule={};
thisModule.filterContents=filterContents;
module.exports=thisModule;