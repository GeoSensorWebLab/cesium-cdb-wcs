# CDB Demo

This application is a demo to integrate data from CDB with the Cesium.js 3D library.

Primarily, it uses the [WCSTerrainProvider](https://github.com/xlhomme/WCSTerrainProvider) extension to read elevation data from GeoServer. GeoServer is generating the WCS using CDB (see [cdb-to-wcs](https://github.com/GeoSensorWebLab/cdb-to-wcs)). OpenStreetMap data is "draped" on the elevation data to provide features.

## Development Environment

The app is JavaScript and builds using [Node.js](https://nodejs.org/) 6. To start, install the base Node packages:

    $ npm install

Now you can start the local development server:

    $ node preview.js

That's all. The server is now running at [http://localhost:4200/](http://localhost:4200/).

## License

MIT License

## Authors

James Badger <jpbadger@ucalgary.ca>
