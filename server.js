// Load up a process to clear the build directory, build once from the Brocfile,
// and serve it on 0.0.0.0:5000 with express. Based on broccoli/lib/builder.js
var broccoli            = require('broccoli');
var copyDereferenceSync = require('copy-dereference').sync;
var express             = require('express');
var fs                  = require('fs');
var gzipStatic          = require('connect-gzip-static');
var http                = require('http');
var path                = require('path');
var Q                   = require('q');
var rimraf              = require('rimraf');

// Clean existing data
function clean(directory) {
  if (fs.existsSync(directory)) {
    rimraf.sync(directory);
  }
}

// Build application
function build(outputDir) {
  var node = broccoli.loadBrocfile();
  var builder = new broccoli.Builder(node);

  return builder.build()
  .then(function() {
    copyDereferenceSync(builder.outputPath, outputDir);
  })
  .finally(function() {
    return builder.cleanup();
  })
  .catch(function(err) {
    // Should show file and line/col if present
    if (err.file) {
      console.error('File: ' + err.file);
    }
    console.error(err.stack);
    console.error('\nBuild failed');
    process.exit(1);
  });
}

// Start up server
function serve() {
  var app = express();
  var router = express.Router();
  router.get('/*', function(req, res, next) {
    // Check for resource requests and redirect to the index file for them
    if (path.extname(req.path).length > 0) {
      next();
    } else {
      req.url = "/index.html";
      next();
    }
  });
  app.use(router);
  app.use(gzipStatic(__dirname + "/public", {
    maxAge: 31536000 * 1000 // 1 year
  }));

  var server = app.listen(process.env.PORT || 5000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
  });
}
Q(clean("public"))
.then(function() {
  return build("public");
})
.then(serve)
.done();
