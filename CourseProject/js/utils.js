let mapInitialized = false;
const map = L.map('map').setView([60.17, 24.945831], 12);
let layerGroup = L.layerGroup();

var restaurantIcon = L.icon({
  iconUrl: 'img/restaurant-icon.png',
  //shadowUrl: 'leaf-shadow.png',

  iconSize: [38, 95], // size of the icon
  //shadowSize:   [50, 64], // size of the shadow
  iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
  shadowAnchor: [4, 62], // the same for the shadow
  popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
});

var userIcon = L.icon({
  iconUrl: 'img/you-icon.png',
  //shadowUrl: 'leaf-shadow.png',

  iconSize: [38, 95], // size of the icon
  //shadowSize:   [50, 64], // size of the shadow
  iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
  shadowAnchor: [4, 62], // the same for the shadow
  popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
});

async function fetchData(url, options) {
  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error('Fetch data error in utils.js. Fetch data not ok! :(');
  }

  const json = await response.json(); //get body and turn to json object
  return json;
}

function distance(startPoint, endPoint) {
  return Math.sqrt(
    Math.pow(endPoint[0] - startPoint[0], 2) +
      Math.pow(endPoint[1] - startPoint[1], 2)
  );
}
function mapInit() {
  if (!mapInitialized) {
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 16,
      minZoom: 4,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    mapInitialized = true;
  }
}

function mapAddRestaurantToMap(location) {
  if (map.hasLayer(layerGroup)) {
    // Clear layer group
    layerGroup.clearLayers();

    // Or you may remove entire layer from the map
    // This will help you reduce rendering issues
    map.removeLayer(layerGroup);
  }

  const marker = L.marker(location, {icon: restaurantIcon}).addTo(map);
  marker.addTo(layerGroup);
  map.invalidateSize();

  map.addLayer(layerGroup);

  map.panTo(location);
}

function mapAddUserToMap(location) {
  L.marker(location, {icon: userIcon}).addTo(map);
  map.invalidateSize();
}

function mapClearMarkers() {
  layerGroup.clearLayers();
}

function checkForWhiteSpace(str) {
  return str.indexOf(' ') >= 0;
}

export default {
  fetchData,
  distance,
  mapInit,
  mapAddRestaurantToMap,
  mapClearMarkers,
  mapAddUserToMap,
  checkForWhiteSpace,
};
