# Template: Broccoli App

This repository is a template for starting a JavaScript Single Page Application using Broccoli as the build tool. It supports ES6/ES7 through Babel, and Sass through node-sass. Pages are built using Jade templates. JST templates are compiled automatically using Underscore.

By default, the following libraries are included:

* Backbone
* Bootstrap
* Font Awesome
* JQuery
* JSON2
* Leaflet
* Marionette
* Q
* Underscore

To remove them, edit `package.json` and `Brocfile.js`.

## Getting Started

1. Edit the `package.json` file to update the application name, license, repository, etc.
2. Update the `index.jade` file for the application's title and layout
3. Add in other libraries using NPM, import them using `Brocfile.js`, and include them from `index.jade`
4. Update LICENSE if necessary
5. Update this README to explain your application, how to get it running in development, and how to deploy it
6. Push the repository to Bitbucket

## Upgrading Templates

The template used to use Underscore for the templates, but the broccoli plugins are way outdated. Instead, use [Handlebars](http://handlebarsjs.com) templates.

1. Install handlebars `npm install --save handlebars`
2. Load Handlebars in `Brocfile.js` using `loadLibrary` helper
3. Upgrade `Brocfile.js` to use Handlebars/concat, and load templates into scripts instead of final mergeTree node
4. Replace `jst` template files with `hbs` files
5. Replace `window.JST` usage in JS files with `window.App.Templates`

## Development Environment

The app is JavaScript and builds using [Node.js](https://nodejs.org/). To start, install the base Node packages:

    $ npm install

Now you can start the local development server:

    $ node preview.js

That's all. The server is now running at [http://localhost:4200/](http://localhost:4200/).

## License

MIT License

## Authors

James Badger <jpbadger@ucalgary.ca>
