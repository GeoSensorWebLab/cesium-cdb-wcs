# Template: Broccoli App

This repository is a template for starting a JavaScript Single Page Application using Broccoli as the build tool. It supports ES6/ES7 through Babel, and Sass through node-sass. Pages are built using Jade templates. JST templates are compiled automatically using Underscore.

Also see the branches for this repository for versions that include Bootstrap/Font-Awesome, or Backbone/Marionette.

## Getting Started

1. Edit the `package.json` file to update the application name, license, repository, etc.
2. Update the `index.jade` file for the application's title and layout
3. Add in other libraries using NPM, import them using `Brocfile.js`, and include them from `index.jade`
4. Update LICENSE if necessary
5. Update this README to explain your application, how to get it running in development, and how to deploy it
6. Push the repository to Bitbucket

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
