const map = L.map('map').setView([49.24831, -123.063011], 13);

const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);


const parkMark = L.markerClusterGroup();

$.getJSON("https://opendata.vancouver.ca/api/records/1.0/search/?dataset=parks&q=&rows=216", function (data) {
	data.records.forEach(function (data) {
		var parkMarker = L.marker(data.fields.googlemapdest).bindPopup(data.fields.name);
		parkMark.addLayer(parkMarker);
	});
});


const markers = L.markerClusterGroup({
	maxClusterRadius: 50,
	iconCreateFunction: function (cluster) {
		var sum = 0;
		var count = 0;
		cluster.getAllChildMarkers().forEach(function (marker) {
			sum += parseInt(marker.options.rating);
			count++;
		});
		var avgRating = Math.round((sum / count) * 10) / 10;

		// Create a div icon with the average rating as the content
		return L.divIcon({
			html: '<div class="cluster-icon" style="background-color: rgb(0, 0, ' + (12 * (20 - avgRating)) + '); border-radius: 50%; width: 30px; height: 30px; line-height: 30px; text-align: center; color: white;">' + avgRating + '</div>',
			className: 'my-custom-cluster-icon',
		});
	}
});
db.collection("reviews").get().then(function (review) {
	review.forEach(function (doc) {
		let click = "<p type='button' onClick='navigate(" + doc.data().latitude + ", " + doc.data().longitude + ")'>Navigate</p>";
		var marker = L.marker([doc.data().latitude, doc.data().longitude], { rating: doc.data().rating, id: doc })
			.bindPopup('Review: ' + doc.data().rating + "/5" + "\nComment: " + doc.data().comment
				+ click)
		markers.addLayer(marker);

	})
})
map.addLayer(parkMark);
map.addLayer(markers);

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
		var position = L.geoLet;
		map.setView(position, zoom);
	}
});
L.control.locate().addTo(map);



var router = L.Routing.control({
	geocoder: L.Control.Geocoder.nominatim(),
	router: new L.Routing.graphHopper('19a2eebb-26c4-4271-8194-2585fce8a66c'),
	profile: "foot"
}).addTo(map);

function navigate(lat, long) {
	navigator.geolocation.getCurrentPosition(function (location) {
		console.log(L.geoLet)
		let lat2 = location.coords.latitude;
		let long2 = location.coords.longitude;
		router.spliceWaypoints(1, 1, L.latLng(lat, long));
		router.spliceWaypoints(0, 1, L.latLng(lat2, long2));
	})
}