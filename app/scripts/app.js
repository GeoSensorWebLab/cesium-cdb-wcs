// Start with your ES5/6/7 script here.
// Import other files or use Browserify require statements.

$(function() {
  CESIUM_BASE_URL = "/";
  console.log("Loading Demo");

  var osm = Cesium.createOpenStreetMapImageryProvider({
      url: 'https://a.tile.openstreetmap.org/'
  });

  var WCSTerrainProvider = new Cesium.WCSTerrainProvider({
    service: "WCS",
    url: "/geoserver/wcs",
    layerName: "001_Elevation-S001-T001",
    waterMask: false
  });

  var initialPosition = new Cesium.Cartesian3.fromDegrees(-74, 40.6, 2631.082799425431);
  var initialOrientation = new Cesium.HeadingPitchRoll.fromDegrees(7.1077496389876024807, -31.987223091598949054, 0.025883251314954971306);
  var homeCameraView = {
      destination : initialPosition,
      orientation : {
          heading : initialOrientation.heading,
          pitch : initialOrientation.pitch,
          roll : initialOrientation.roll
      }
  };

  var viewer = new Cesium.Viewer('content', {
    baseLayerPicker: false,
    imageryProvider: osm,
    terrainProvider: WCSTerrainProvider,
    terrainExaggeration: 1.0
  });

  viewer.scene.camera.setView(homeCameraView);
});
