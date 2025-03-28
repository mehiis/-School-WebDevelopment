let mapInitialized = false;

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
    var map = L.map('map').setView([60.17, 24.945831], 12);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 16,
      minZoom: 11,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    mapInitialized = true;
  }
}

export default {fetchData, distance, mapInit};
