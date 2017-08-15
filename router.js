var express = require('express');
var path    = require('path');
var proxy   = require('http-proxy');

var config = require('./config');

var WCSproxy = proxy.createProxyServer({
  auth: config.wcs.username + ':' + config.wcs.password,
  changeOrigin: true,
  secure: true,
  target: config.wcs.url
});

// Use express's Router to catch all routes and handle them by sending the
// index path to the watcher.
var router = express.Router();
router.get('/wcs*', function(req, res) {
  WCSproxy.web(req, res);
});

router.get('/*', function(req, res, next) {
  // Check for resource requests and redirect to the index file for them
  if (path.extname(req.path).length > 0) {
    next();
  } else {
    req.url = "/index.html";
    next();
  }
});

module.exports = router;
