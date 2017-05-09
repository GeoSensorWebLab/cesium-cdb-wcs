# Change Log

A list of changes and fixes for each release.

## App Template v2.0.0

* Upgrade defaults to Node v6.10 (LTS) and NPM 4
* Upgrade minor libraries:
    * Babel to 6.24
    * Backbone and Marionette
    * browserify to 14.3.0
    * commander to 2.9.0
    * express, connect-gzip-static
    * sass to 4.5.2
    * tiny-lr
* Upgrade broccoli to 0.16.8, and then to v1.0+
* Replace broccoli-browserify (not maintained) with broccoli-watchify (maintained)
* Fix libraries being included out of order by `broccoli-concat`
* Replace underscore with Handlebars templates, as `broccoli-handlebars-precompiler` is maintained
* Upgrade helpers, Brocfile, and serving scripts to use new Broccoli plugin API
* Replace jade with pug (newer name/version)

## App Template v1.0.0

* Add basic libraries that are commonly used in my static web apps: Bootstrap, Font Awesome, Backbone/Marionette, jQuery, Q, Underscore
* Support JS templates using Underscore templates
* Build a stream-lined system for loading libraries from `node_modules` in the `Brocfile` using a helper script
