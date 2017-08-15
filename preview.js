// Load up a process to watch the local directories, auto-build from the
// Brocfile, and serve it on localhost:4200. Based on broccoli/lib/server.js
var broccoli       = require('broccoli');
var http           = require('http');
var express        = require('express');
var printSlowNodes = require('broccoli-slow-trees');
var router         = require('./router');

var getBuilder = function() {
  var node = broccoli.loadBrocfile();
  return new broccoli.Builder(node);
};

function serve (builder, options) {
  options = options || {};
  var server = {};

  console.log('Previewing on http://' + options.host + ':' + options.port + '\n');

  server.watcher = options.watcher || new broccoli.Watcher(builder, {verbose: true});
  server.builder = server.watcher.builder;

  server.app = express();
  server.app.use(broccoli.getMiddleware(server.watcher));

  server.app.use(router);
  server.app.use(express.static('public'));

  server.http = http.createServer(server.app);

  // We register these so the 'exit' handler removing temp dirs is called
  function cleanupAndExit() {
    return server.watcher.quit();
  }

  process.on('SIGINT', cleanupAndExit);
  process.on('SIGTERM', cleanupAndExit);

  server.watcher.on('buildSuccess', function() {
    printSlowNodes(server.builder.outputNodeWrapper);
    console.log('Built - ' + Math.round(server.builder.outputNodeWrapper.buildState.totalTime) + ' ms @ ' + new Date().toString());
  });

  server.watcher.on('buildFailure', function(err) {
    console.log('Built with error:');
    console.log(err.message);
    if (!err.broccoliPayload || !err.broccoliPayload.location.file) {
      console.log('');
      console.log(err.stack);
    }
    console.log('');
  });

  server.watcher.start()
    .catch(function(err) {
      console.log(err && err.stack || err);
    })
    .finally(function() {
      server.builder.cleanup(); // TODO
      server.http.close();
    })
    .catch(function(err) {
      console.log('Cleanup error:');
      console.log(err && err.stack || err);
    })
    .finally(function() {
      process.exit(1);
    });

  server.http.listen(parseInt(options.port, 10), options.host);
  return server;
}

serve(getBuilder(), {
  port: 4200,
  host: 'localhost'
});
