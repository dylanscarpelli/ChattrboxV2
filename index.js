var http = require('http');
var fs = require('fs');
var extract = require('./extract');
var mime = require('mime');
var wss = require('./websockets-server');
mime.getType("txt");
mime.getExtension("text/plain");


var handleError = function(err, res) {
  res.writeHead(404);
  res.end('<script>window.location.href="http://localhost:3000/error.html";</script>');
};

var server = http.createServer(function(req, res) {
  console.log('Responding to a request.');

  var filePath = extract(req.url);
  fs.readFile(filePath, function(err, data) {

    if (err) {
      handleError(err, res);
      return;
    } else {
      res.end(data);
    }
  });
});
server.listen(3000);
