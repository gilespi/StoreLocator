if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(success);
}

function success(position) {
  let lat = position.coords.latitude;
  let lng = position.coords.longitude;

  map = L.map('map', { center: [lat, lng], zoom: 10 });

  layer.addTo(map);
}

const layer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
});

let iconOption = {
  iconUrl: 'img/marker-1.png',
  iconSize: [40, 40],
};

let icon = L.icon(iconOption);

async function getStores() {
  const response = await fetch('/api/v2/stores');
  const data = await response.json();
  const features = data.data.map((leaflet) => {
    return {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [
          leaflet.geometry.coordinates[0],
          leaflet.geometry.coordinates[1],
        ],
      },
      properties: {
        name: leaflet.name,
        address: leaflet.geometry.formattedAddress,
        webaddress: leaflet.web,
        phone: leaflet.phone,
      },
    };
  });

  const featureCollection = {
    type: 'FeatureCollection',
    features: features,
  };

  const layer = L.geoJSON(featureCollection, {
    onEachFeature: function (feature, layer) {
      const popupContent = `
        <h2>${feature.properties.name}</h2>
        <p>${feature.properties.address}</p>
        <a href="${feature.properties.webaddress}">${feature.properties.webaddress}</p>
        <a href=Tel: "${feature.properties.phone}">Tel: ${feature.properties.phone}</a>`;
      layer.bindPopup(popupContent);
    },
    pointToLayer: function (feature, latlng) {
      return L.marker(latlng, { icon: icon });
    },
  }).addTo(map);
}

getStores();
