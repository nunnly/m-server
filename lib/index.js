
var http = require('http');
var fs = require('fs');
var rootPath = process.cwd();
var path = require('path');
var utils = require('./utils');

function HttpServer(option) {
    var server = http.createServer(function (req, res) {
        var requestPath = path.join(rootPath, req.url);
        var targetPath;
        if(!utils.allowPath(requestPath, rootPath)){
            targetPath = rootPath;
            req.url = '/';
        }else {
            targetPath = requestPath;
        }
        if (fs.existsSync(targetPath)) {
            var targetType = fs.lstatSync(targetPath);
            if (targetType.isFile()) {
                res.end(fs.readFileSync(targetPath))
            } else if (targetType.isDirectory()) {
                fs.readdir(targetPath, function (error, list) {
                    if (error) {
                        console.log(error);
                        res.end(error.toString())
                    }
                    var dirs = [];
                    var files = [];
                    list.forEach(function (val) {
                        var file = fs.lstatSync(path.join(targetPath, val));
                        if (file.isFile()) {
                            files.push(val)
                        } else if (file.isDirectory()) {
                            dirs.push(val);
                        }
                    });
                    res.writeHead(200);
                    res.write(utils.render(req.url, dirs, files));
                    res.end()
                })
            } else {
                res.end('error')
            }
        } else {
            res.writeHead(404, {'Content-Type': 'text/plain'});
            res.end('not found');
        }
        req.on('error', function (e) {
            console.log(e);
        })
        res.on('error', function (e) {
            console.log(e);
        })
    });

    server.listen(option.port, function () {
        var print = [];
        print.push('-------------------------------------------------------------')
        print.push('Mini http server running on port ' + option.port + ' !');
        print.push('You can open the floowing urls to view files.');
        utils.getIP().forEach(function (val) {
            print.push('\x1b[32m' + val + ":" + option.port + '\x1b[0m');
        });
        print.push('Have fun ^_^');
        print.push('-------------------------------------------------------------');
        var prev = '\t';
        var length = print.length;
        print.forEach(function (val, ind) {
            if (ind === 0 || ind === length - 1) {
                console.log(val);
            } else {
                console.log(prev + val);
            }
        })
    })
    server.on('error', function (e) {
        console.log(e);
    })
    return server;
}

exports.createServer = function(option) {
    var defaultOption = {
        port: 7000
    }
    var envOption = {}
    utils.parseArg(envOption);
    var httpOption = utils.assign({},defaultOption,envOption, option);
    return new HttpServer(httpOption);
}
exports.HttpServer = HttpServer;