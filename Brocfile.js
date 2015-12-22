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

// This builds all the Javascript Templates (JST) into JS files where the
// templates have been wrapped in functions using underscore's template system.
var templates = templateBuilder('app/templates', {
  extensions: ['jst'],
  outputFile: 'templates.js',
  compile: function(string) {
    return _.template(string, { variable: "obj" }).source;
  }
});

var views = jade('app/views');

module.exports = mergeTrees([styles, scripts, views, templates]);
