var express = require('express');
var path    = require('path');

// Use express's Router to catch all routes and handle them by sending the
// index path to the watcher.
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

module.exports = router;
