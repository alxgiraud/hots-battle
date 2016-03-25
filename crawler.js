var http = require('http');
var https = require('https');

exports.getHtml = function (options, onResult) {
    var req = http.get(options, function (res) {
        var output = '';
        res.setEncoding('utf8');

        res.on('data', function (chunk) {
            output += chunk;
        });

        res.on('end', function () {
            onResult(res.statusCode, output);
        });
    });

    req.on('error', function (err) {
        onResult(500, err);
    });

    req.end();
};
