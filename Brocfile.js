// This is the Brocfile. It sets up all the assets from the input JS/CSS/images
// and so on and converts them to static assets in the output directory or
// preview server.
var _ = require('underscore');
var babel = require('broccoli-babel-transpiler');
var browserify = require('broccoli-browserify');
var compileSass = require('broccoli-sass');
var funnel = require('broccoli-funnel');
var jade = require('broccoli-jade');
var mergeTrees = require('broccoli-merge-trees');
var templateBuilder = require('broccoli-template-builder');

var sassDir = 'app/styles';
var scripts = 'app/scripts';

// Covert main.scss stylesheet to app.css stylesheet in output directory
var styles = compileSass([sassDir], 'main.scss', 'app.css');

// Process all the JavaScript.
// First we use babel to convert the ES6 to ES5 for web browsers.
scripts = babel(scripts);
// Then use browserify to handle any `require` statements and automatically
// insert the required library inline.
scripts = browserify(scripts, {
  entries: ['./app.js'],
  outputFile: 'app.js'
});

// Copy scripts to output directory
var backbone = funnel('node_modules/backbone', {
  destDir: 'scripts',
  files: ['backbone-min.js', 'backbone-min.map']
});

var jquery = funnel('node_modules/jquery/dist', {
  destDir: 'scripts'
});

var json2 = funnel('node_modules/json2/lib/JSON2/static', {
  destDir: 'scripts',
  files: ['json2.js']
});

var marionette = funnel('node_modules/backbone.marionette/lib', {
  destDir: 'scripts',
  files: ['backbone.marionette.js', 'backbone.marionette.map']
});

var q = funnel('node_modules/q', {
  destDir: 'scripts',
  files: ['q.js']
});

var underscore = funnel('node_modules/underscore', {
  destDir: 'scripts',
  files: ['underscore-min.js', 'underscore-min.map']
});

// This builds all the Javascript Templates (JST) into JS files where the
// templates have been wrapped in functions using underscore's template system.
var templates = templateBuilder('app/templates', {
  extensions: ['jst'],
  outputFile: 'templates.js',
  compile: function(string) {
    return _.template(string, { variable: "obj" }).source;
  }
});

// Copy Font Awesome files to output directory
var faFonts = funnel('node_modules/font-awesome/fonts', {
  destDir: 'fonts'
});
var faStyles = funnel('node_modules/font-awesome/css', {
  destDir: 'styles'
});

// Copy bootstrap files to output directory
var bootstrapStyles = funnel('node_modules/bootstrap/dist/css', {
  destDir: 'styles'
});

var views = jade('app/views');

module.exports = mergeTrees([styles, scripts, views, templates,
  backbone,
  bootstrapStyles,
  faFonts,
  faStyles,
  jquery,
  json2,
  marionette,
  q,
  underscore
]);
