// Start with your ES5/6/7 script here.
// Import other files or use Browserify require statements.

$(function() {
  CESIUM_BASE_URL = "/";
  console.log("Loading Demo");

  var osm = Cesium.createOpenStreetMapImageryProvider({
      url : 'https://a.tile.openstreetmap.org/'
  });
  var viewer = new Cesium.Viewer('content', {
    imageryProvider: osm,
    baseLayerPicker: false
  });
});
