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
  
  /****************/
  var numDeltas = 100;
		var delay = 10; 
		function moveMarker3(name,position,deltalat,deltalng,inc){
			//alert(name+","+position+","+deltalat+","+deltalng+","+inc)
			if(typeof position !== 'undefined'){
			deltaLat=deltalat;deltaLng=deltalng;
			position=position;
			position[0] += deltaLat;
			position[1] += deltaLng;
			var latlng = new google.maps.LatLng(position[0], position[1]);
			//var key=name;
			var q=driverMarker;
			if(typeof q !== 'undefined'){
			q.setPosition(latlng);
			}
			if(inc!=numDeltas){
				inc++;
				setTimeout( function() { moveMarker3(name,position,deltalat,deltalng,inc); }, 30 );
			}
			}
		}var driverMarker;
				var infobubble2 = new InfoBubble({
												  map: map,
												  position: new google.maps.LatLng(-32.0, 149.0),
												  shadowStyle: 1,
												  padding: 5,
												  color: '#ffffff',
												  backgroundColor: '#3f9eb9',
												  borderRadius: 5,
												  arrowSize: 10,
												  borderWidth: 1,
												  borderColor: '#3f9eb9',
												  disableAutoPan: true,
												  hideCloseButton: false,
												  arrowPosition: 30,
												  backgroundClassName: 'transparent',
												  arrowStyle: 2
												});
		driverAnimation();
		
function driverAnimation(){
pickdriver_id = localStorage.getItem("pickdriver_id");
    
$( "#driveroverlay_show_details" ).load( "http://250taxi.com/db/partner/taxi_comlink_driver_details.php?pickdriver_id="+pickdriver_id+"&passenger_lat="+latitude+"&passenger_long="+longitude+"", function() {

});
    
pickdriver_currentgpslat = document.getElementById('pickdriver_currentgpslat').innerHTML;
pickdriver_currentgpslong = document.getElementById('pickdriver_currentgpslong').innerHTML;
pickdriver_accuracy = document.getElementById('pickdriver_accuracy').innerHTML;
pickdriver_name = document.getElementById('pickdriver_name').innerHTML;
    
console.log("pickdriver_currentgpslat:"+pickdriver_currentgpslat+"\npickdriver_currentgpslong:"+pickdriver_currentgpslong+"\npickdriver_id:"+pickdriver_id+"");

var locations1 = [
['Driver', pickdriver_currentgpslat, pickdriver_currentgpslong, 'journey/journey_marker_driver.png',pickdriver_accuracy],
];
var lat=locations1[0][1];var lng=locations1[0][2];var driver_accuracy=locations1[0][4];
var previous_lat;var previous_lng;
		if( typeof driverMarker !== 'undefined'){
		 previous_lat = driverMarker.getPosition().lat();
		 previous_lng = driverMarker.getPosition().lng();
		}
		var position = [previous_lat, previous_lng];
		var inc = 0;
		var deltaLat;
		var deltaLng;
		console.log(pickdriver_currentgpslat+","+pickdriver_currentgpslong);
 var iconimage2 = {
    url: "http://250taxi.com/app/journey/journey_marker_driver.png", // url
    scaledSize: new google.maps.Size(90, 90), // scaled size
    origin: new google.maps.Point(0,0), // origin
    anchor: new google.maps.Point(43,90) // anchor
};
if( typeof driverMarker === 'undefined'){
	console.log("DRiver");
driverMarker = new google.maps.Marker({
        position: new google.maps.LatLng(locations1[0][1], locations1[0][2]),
        icon: iconimage2,
        map: map,
		title:"Taxi",
		draggable:false 
      });
}else if( typeof driverMarker !== 'undefined'){

		   var result1 = [lat, lng];
		   inc = 0;
			deltaLat = (result1[0] - position[0])/numDeltas;
			deltaLng = (result1[1] - position[1])/numDeltas;
			if(driver_accuracy<50){
			moveMarker3(name,position,deltaLat,deltaLng,inc);
			}
	   }
	   if( typeof marker['Driver'] !== 'undefined'){
			var arg;
			var contentString = '<div style="color:white;">&nbsp;<b>'+pickdriver_name+'</b><IMG BORDER="0" ALIGN="Left" WIDTH="40" SRC="http://www.250taxi.com/driverpics/'+pickdriver_id+'.jpg" onError="this.src = \'http://www.250taxi.com/app/no-user-image.gif\'"></div>';
			var currentmarker=marker['Driver'];
			google.maps.event.addListener(currentmarker, 'click', (function(currentmarker, arg) {
               return function() {				   
						infobubble2.setContent(contentString);
						infobubble2.open(map, currentmarker);
                }
            })(currentmarker, arg)); 
		   }
  }
  setInterval(function(){ driverAnimation();}, 15000);
	
	/*******************/
	
  directionsDisplay.setMap(map);
  calculateAndDisplayRoute(directionsService, directionsDisplay);
}

function calculateAndDisplayRoute(directionsService, directionsDisplay) {
    
var route_lat = document.getElementById('lat').value;
var route_lng = document.getElementById('long').value;
    
var places_lat = localStorage.getItem('places_lat');
var places_lng = localStorage.getItem('places_long');

var journey_map_origin_latlng = new google.maps.LatLng(route_lat,route_lng);
//var journey_map_places_latlng = new google.maps.LatLng(places_lat,places_lng);

 var journey_map_places_latlng = localStorage.getItem('destination');
// var journey_map_destination = journey_map_destination +' Kigali';
 //console.log(journey_map_origin_latlng+","+journey_map_places_latlng);
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