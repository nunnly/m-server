var os = require('os');
exports.getIP = function () {
    var network = os.networkInterfaces();
    var list = [];
    for (var p in network) {
        if (network.hasOwnProperty(p)) {
            network[p].forEach(function (val) {
                if (val.family == 'IPv4') {
                    list.push(val.address);
                }
            })
        }
    }
    return list;
}

exports.parseArg = function (envOption) {
    var argv = process.argv;
    argv && argv.forEach(function (val, ind) {
        if (val === '-p') {
            var port = parseInt(argv[ind + 1]);
            if (port && port > 0) {
                envOption.port = port;
            }
        }
    });
    return envOption; 
}

function sort(a, b) {
    var a1 = a.toLocaleLowerCase()
    var b1 = b.toLocaleLowerCase();
    if (a1 < b1) {
        return -1;
    } else if (a1 > b1) {
        return 1
    } else {
        return 0;
    }
}
exports.sort = sort;

exports.render = function (path, dirs, files) {
    var html = [];
    var parentPath;
    html.push("<h1>" + path + "</h1>");
    html.push('<ul>');
    if (path !== '/') {
        parentPath = path.split('/').slice(0, -1).join('/');
        if (parentPath == '') {
            parentPath = '/';
        }
        html.push('<li><a href="' + parentPath + '">../</a><li>');
    } else {
        path = "";
    }
    dirs.sort(sort).forEach(function (val) {
        html.push('<li><a href="' + path + '/' + val + '">' + val + '</a></li>');
    });
    files.sort(sort).forEach(function (val) {
        html.push('<li><a download href="' + path + '/' + val + '">' + val + '</a></li>');
    });
    html.push('</ul>');
    return html.join('');
}
function assignObject(target) {
    for (var t = 1; t < arguments.length; t++) { 
        var n = arguments[t];
        for (var a in n){
            Object.prototype.hasOwnProperty.call(n, a) && (target[a] = n[a])
        }
    }
    return target;
}

exports.assign = function (target) {
    if (Object.assign) {
        return Object.assign.apply(null, arguments);
    } else {
        assignObject.apply(null, arguments)
    }
}

exports.allowPath = function(requestPath, enablePath){
    return requestPath.indexOf(enablePath) === 0;
}