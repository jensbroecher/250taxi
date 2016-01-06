function journey_mode_map() {
    
clearInterval(journey_updater);
clearInterval(getdriverslist_updater);
localStorage.setItem("chat_enabled","No");
    
  var directionsDisplay = new google.maps.DirectionsRenderer;
  var directionsService = new google.maps.DirectionsService;
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 16,
    disableDefaultUI: true,
    streetViewControl: false,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    styles: [{ featureType: "poi", elementType: "labels", stylers: [{ visibility: "off" }]}]
  });
  directionsDisplay.setMap(map);
  calculateAndDisplayRoute(directionsService, directionsDisplay);
}

function calculateAndDisplayRoute(directionsService, directionsDisplay) {
    
var route_lat = document.getElementById('lat').value;
var route_lng = document.getElementById('long').value;
    
var places_lat = localStorage.getItem('places_lat');
var places_lng = localStorage.getItem('places_long');

var journey_map_origin_latlng = new google.maps.LatLng(route_lat,route_lng);
var journey_map_places_latlng = new google.maps.LatLng(places_lat,places_lng);

// var journey_map_destination = localStorage.getItem('destination');
// var journey_map_destination = journey_map_destination +' Kigali';
 
// alert('Calculating route to: '+journey_map_destination+'');
   
var selectedMode = 'DRIVING';

directionsService.route({
    origin: journey_map_origin_latlng,      
    destination: journey_map_places_latlng,
    travelMode: google.maps.TravelMode[selectedMode]
  }, function(response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(response);
    } else {
        justshowmap();
      // window.alert('Directions request failed due to ' + status);
    }
  });
}
function justshowmap() {
    alert('No route found for this destination.');
}