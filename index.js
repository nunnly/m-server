#! /usr/bin/env node
var http = require('http');
var fs = require('fs');
var rootPath = process.cwd();
var path = require('path');
var utils= require('./lib/utils');
var argv = process.argv;

var server = http.createServer(function(req,res){
    var targetPath = path.join(rootPath, req.url);
    if(fs.existsSync(targetPath)){
        var targetType = fs.lstatSync(targetPath);
        if(targetType.isFile()){
            res.end(fs.readFileSync(targetPath))
        }else if(targetType.isDirectory()){
            fs.readdir(targetPath, function(error,list){
                if(error){
                    console.log(error);
                    res.end(error.toString())
                }
                var dirs = [];
                var files = [];
                list.forEach(function(val){
                    var file = fs.lstatSync(path.join(targetPath,val));
                    if(file.isFile()){
                        files.push(val)
                    }else if(file.isDirectory()){
                        dirs.push(val);
                    }
                });
                res.write(utils.render(req.url,dirs, files));
                res.end()
            })    
        }else{
            res.end('error')
        }
    }else{
        res.end('not fount');
    }
    req.on('error', function(e){
        console.log(e);
    })
    res.on('error', function(e){
        console.log(e);
    })
});

var serverConfig = {
    port : 7000
}

server.listen(7000, function(){
    argv.forEach(function(val, ind){
        if(val === '-p'){
            var port = parseInt(argv[ind+1]);
            if(port && port > 0){
                serverConfig.port = port;
            }
        }
    })
    
    var print = [];
    print.push('-------------------------------------------------------------')
    print.push('Mini http server running on port ' + serverConfig.port + ' !');
    print.push('You can open the floowing urls to view files.');
    utils.getIP().forEach(function(val){
        print.push(val + ":" + serverConfig.port);
    });
    print.push('Have fun ^_^');
    print.push('-------------------------------------------------------------');
    var prev = '\t';
    var length= print.length;
    print.forEach(function(val,ind){
        if(ind === 0 || ind === length-1){
            console.log(val);
        }else{
                console.log(prev + val);
        }
    })
})
server.on('error', function(e){
    console.log(e);
})

