const inputText = document.querySelector("input");
const submuitBtn = document.querySelector("button");
const locationHeading = document.querySelector(".locat");
const addressHeading = document.querySelector(".address");
const ispHeading = document.querySelector(".isp");
const utcHeading = document.querySelector(".utc");
const mapId = document.getElementById("map");

const APIKEY = `
https://geo.ipify.org/api/v1?apiKey=at_aG9VlAfj8evlm9jsaeBBSRUsXtBOe&ipAddress=${inputText.value}
`;

async function getApi() {
	const response = await fetch(APIKEY);
	const responseData = await response.json();
	renderData(responseData);
	drawMap(responseData);
	console.log(responseData);
}

submuitBtn.addEventListener("click", function (e) {
	e.preventDefault();
	getApi();
});
function renderData(data) {
	addressHeading.innerHTML = data.ip;
	locationHeading.innerHTML = `${data.location.city}<br>  ${data.location.region} <br>  ${data.location.postalCode}`;
	utcHeading.innerHTML = `UTC${data.location.timezone}`;
	ispHeading.innerHTML = `${data.isp}`;
}

function drawMap(coordinates) {
	var mymap = L.map("map").setView(
		[coordinates.location.lat, coordinates.location.lng],
		13
	);
    L.tileLayer(
			"https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
			{
				attribution:
					'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
				maxZoom: 18,
				id: "mapbox/streets-v8",
				tileSize: 512,
				zoomOffset: -1,
				accessToken:
					"pk.eyJ1IjoiZGF2aW5jaWNvZGUiLCJhIjoiY2tvZWJjbmcxMDNxODJvbGFoZWJud3MxbCJ9.zmBWhh-ID62bQqXhH5ly5w",
			}
		).addTo(mymap);
	var marker = L.marker([
		coordinates.location.lat,
		coordinates.location.lng,
	]).addTo(mymap);
}

// mapbox.mapbox - streets - v8;
