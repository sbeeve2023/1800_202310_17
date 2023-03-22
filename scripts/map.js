console.log("Running");

const map = L.map('map').setView([51.505, -0.09], 13);

const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

const marker = L.marker([51.5, -0.09]).addTo(map)
	.bindPopup('<b>Hello world!</b><br />I am a popup.').openPopup();

const circle = L.circle([51.508, -0.11], {
	color: 'red',
	fillColor: '#f03',
	fillOpacity: 0.5,
	radius: 500
}).addTo(map).bindPopup('I am a circle.');

const polygon = L.polygon([
	[51.509, -0.08],
	[51.503, -0.06],
	[51.51, -0.047]
]).addTo(map).bindPopup('I am a polygon.');


const popup = L.popup()
	.setLatLng([51.513, -0.09])
	.setContent('I am a standalone popup.')
	.openOn(map);

function onMapClick(e) {
	popup
		.setLatLng(e.latlng)
		.setContent(`You clicked the map at ${e.latlng.toString()}`)
		.openOn(map);
}

map.on('click', onMapClick);

L.GeoIP = L.extend({

	getPosition: function (ip) {
		var url = "https://freegeoip.net/json/";
		var result = L.latLng(0, 0);

		if (ip !== undefined) {
			url = url + ip;
		} else {
			//lookup our own ip address
		}

		var xhr = new XMLHttpRequest();
		xhr.open("GET", url, false);
		xhr.onload = function () {
			var status = xhr.status;
			if (status == 200) {
				var geoip_response = JSON.parse(xhr.responseText);
				result.lat = geoip_response.latitude;
				result.lng = geoip_response.longitude;
			} else {
				console.log("Leaflet.GeoIP.getPosition failed because its XMLHttpRequest got this response: " + xhr.status);
			}
		};
		xhr.send();
		return result;
	},

	centerMapOnPosition: function (map, zoom, ip) {
		var position = L.GeoIP.getPosition(ip);
		map.setView(position, zoom);
	}
});
L.control.locate().addTo(map);