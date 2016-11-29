var ang;
$(document).ready(function() {

trigger_check_if_map_loaded();
	
// Disabled for new update
// document.getElementById("loading_map_indicator").className = "lmp_visible";
	
function trigger_check_if_map_loaded() {
setTimeout(function(){
	check_if_map_loaded();
}, 2000);
}
	
function check_if_map_loaded() {
if ($("#loading_map_indicator").hasClass("lmp_visible")) {
	reloadPositionStart();
	audio_update_location();
	trigger_check_if_map_loaded();
}
}

function toRadians(deg){
	return deg * Math.PI / 180;
}

function toDegrees(rad){
	return rad * 180 / Math.PI;
}

var map;
/*
map = new google.maps.Map(document.getElementById('map'), {
     center: {lat: -1.957236, lng: 30.100284},
     zoom: 10,
     disableDefaultUI: true,
     streetViewControl: false
});
*/
    
document.getElementById("locationfieldholder").style.display = "none";
document.getElementById("locationfield").style.display = "none";
document.getElementById("inlocationfield").style.display = "none";
document.getElementById("loading_map_indicator").style.display = "block";
/*
var voice_enabled = localStorage.getItem("voice_enabled");
if (voice_enabled == "On") {responsiveVoice.speak("Loading map");}

var input = document.getElementById('taxirequest_destination');
var options = {
  componentRestrictions: {country: 'rw'}
};

var autocomplete = new google.maps.places.Autocomplete(input, options);   */
	
var input = document.getElementById('taxirequest_destination');
var input2 = document.getElementById('searchbyaddress');
var input3 = document.getElementById('taxirequest_pickup_estimate');

// var options = {
//  componentRestrictions: {country: 'rw'}
// };

autocomplete = new google.maps.places.Autocomplete(input, options);    
autocomplete = new google.maps.places.Autocomplete(input2, options); 
autocomplete = new google.maps.places.Autocomplete(input3, options);

});
   
function showindicator() {
document.getElementById("loadingindicator").className = "animated fadeIn";
document.getElementById("loadingindicator").style.display = "block";
document.getElementById("loading_reset").style.display = "none";
setTimeout(function(){
    document.getElementById("loading_reset").style.display = "block";
}, 5000);
}
function hideindicator() {
document.getElementById("loadingindicator").className = "animated fadeOut";
setTimeout(function(){
document.getElementById("loadingindicator").style.display = "none";
}, 1000);
}
function audio_update_location() {
  
var voice_enabled = localStorage.getItem("voice_enabled");
if (voice_enabled == "On") {responsiveVoice.speak("Locating you again");}    
}

var marker;
var infoWindow;
    
function reloadPositionStart() {
    reloadPosition();
    document.getElementById("locationbutton").className = 'menugpsblue';
    setTimeout(function(){document.getElementById("locationbutton").className = 'menugps';}, 1000);
    setTimeout(function(){document.getElementById("locationbutton").className = 'menugpsblue';}, 2000);
    setTimeout(function(){document.getElementById("locationbutton").className = 'menugps';}, 3000);
    setTimeout(function(){document.getElementById("locationbutton").className = 'menugpsblue';}, 4000);
    setTimeout(function(){document.getElementById("locationbutton").className = 'menugps';}, 5000);
    setTimeout(function(){document.getElementById("locationbutton").className = 'menugpsblue';}, 6000);
    setTimeout(function(){document.getElementById("locationbutton").className = 'menugps';}, 7000);
    setTimeout(function(){document.getElementById("locationbutton").className = 'menugpsblue';}, 8000);
    setTimeout(function(){document.getElementById("locationbutton").className = 'menugps';}, 8000);
}
    
function reloadPosition() {
navigator.geolocation.getCurrentPosition(
				displayPosition, 
				displayError, {
                enableHighAccuracy: true,
                maximumAge: 0
                }
			);
pos;
// console.log('reloaded: '+pos+'');
}
	
var app_or_web = localStorage.getItem("app_or_web");
/* if (app_or_web == "app") {
	function onDeviceReady() {
				navigator.geolocation.getCurrentPosition(
				displayPosition, 
				displayError, {
                enableHighAccuracy: false,
                maximumAge: 0
                }		
			);
	}
}
*/
//if (app_or_web == "web") {
				navigator.geolocation.getCurrentPosition(
				displayPosition, 
				displayError, {
                enableHighAccuracy: false,
                maximumAge: 0
                }		
			);
//}

var directionsDisplay = new google.maps.DirectionsRenderer({
    map: map,
    preserveViewport: true
  });
var directionsService = new google.maps.DirectionsService();

function distance(lat1, lon1, lat2, lon2, unit) {	
	//function for calculating distance between two coordinates
	var radlat1 = Math.PI * lat1/180
	var radlat2 = Math.PI * lat2/180
	var theta = lon1-lon2
	var radtheta = Math.PI * theta/180
	var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
	dist = Math.acos(dist);
	dist = dist * 180/Math.PI;
	dist = dist * 60 * 1.1515;
	if (unit=="K") { dist = dist * 1.609344 }
	if (unit=="N") { dist = dist * 0.8684 }
	return dist;
}

function displayPosition(position) {	
	document.getElementById("lat").value = position.coords.latitude;
  document.getElementById("long").value = position.coords.longitude;     			
  lat=position.coords.latitude;
	lng= position.coords.longitude;
			
            pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
           //tambaram
            //pos = new google.maps.LatLng("12.926146", "80.1144348");
            //cmbt
            //pos = new google.maps.LatLng("13.0702682","80.1860256");
            //thirumangalam
            //pos = new google.maps.LatLng("13.089499","80.196949")
											
			var options = {
				zoom: 18,
                disableDefaultUI: true,
                streetViewControl: false,
				center: pos,
				mapTypeId: google.maps.MapTypeId.ROADMAP,
			//	styles: [{ featureType: "poi", elementType: "labels", stylers: [{ visibility: "off" }]}]
			};
    
    
			var x = document.getElementById("map");
			x.innerHTML = "";
    
    
			var map = new google.maps.Map(document.getElementById("map"), options);
			geocodeLatLng(geocoder, map);
			//Script for getting distance from nearest landmark
			
			var service1 = new google.maps.places.PlacesService(map); 
			service1.nearbySearch({
			  location: pos,
			  radius: 100,
			  type: ['point_of_interest'],
			}, callback);
			var distanceFromPlace;
			function callback(results, status) {
				document.getElementById('list_of_nearby_places').innerHTML = "";
				// console.log(results[0]);console.log("Lat"+lat);console.log("LNG"+lng);
				$.each(results, function( index, value ) {
				  //alert( index + ": " + value );
				placeLat =results[index].geometry.location.lat();
				placeLng =results[index].geometry.location.lng();
				distanceFromPlaceInKm= distance(lat, lng, placeLat, placeLng, 'k');
				distanceFromPlace =	"<option value='"+Number((distanceFromPlaceInKm*1000).toFixed(1)) + " mtrs from " +results[index].name+"'>"+Number((distanceFromPlaceInKm*1000).toFixed(1)) + " mtrs from " +results[index].name+"</option>";
				// console.log(distanceFromPlace);	
				$('#list_of_nearby_places').append(distanceFromPlace);	
				});	
							
				/*placeLat =results[0].geometry.location.lat();
				placeLng =results[0].geometry.location.lng();
				distanceFromPlaceInKm= distance(lat, lng, placeLat, placeLng, 'k');
				distanceFromPlace =	Number((distanceFromPlaceInKm*1000).toFixed(1)) + " Metres from " +results[0].name;
				console.log(distanceFromPlace);	
				currentLoc = $("#inlocationfield").val();
				currentLoc = currentLoc + " ( " +distanceFromPlace + " ) " ;
				$("#inlocationfield").val(currentLoc); */
				//console.log(currentLoc);	
			}
			
			// Remove the current marker, if there is one
			//if (typeof(marker) != "undefined") marker.setMap(null);
			  p1=pos.lat(); 
       p2=pos.lng();
            
var iconimage = {
    url: "css/userpinicon.png", // url
    scaledSize: new google.maps.Size(90, 90), // scaled size
    origin: new google.maps.Point(0,0), // origin
    anchor: new google.maps.Point(43,90) // anchor
};



document.getElementById("locationfield").style.display = "block";
document.getElementById("locationfieldholder").style.display = "block";
document.getElementById("inlocationfield").style.display = "block";
    
document.getElementById("loading_map_indicator").style.display = "none";
document.getElementById("loading_map_indicator").className = "lmp_hidden";
            
			marker = new google.maps.Marker({
                draggable: true,
                // icon: "userpinicon.png",
                icon: iconimage,
zIndex: google.maps.Marker.MAX_ZINDEX + 1,
				position: new google.maps.LatLng(13.096220, 80.202757),
				map: map,
				title: "User location"
			});
	a();
			//moveMarker( map, marker, position.coords.latitude,position.coords.longitude);
var count=0; var markers = {}; var save_latLng = {}; var save_image = {}; var iconimage1 = {}; var calc_angle = 0; var dist_accuracy = []; var accuracy_tracker = {}; var speed = 50; var delay = 100;
var timerHandle = null;
var step = 50; // 5; // metres
var tick = 100; // milliseconds

var lat; var lng; var loc; var flightPath=[];
var polyline = null;
		function animateCircle(line) {
    var count = 0;
    window.setInterval(function() {
      count = (count + 1) % 200;

      var icons = line.get('icons');
      icons[0].offset = (count / 2) + '%';
      line.set('icons', icons);
  }, 200);

}

function set_position(lng, previous_lng, lat, previous_lat, angle2, taxi_id){
	imgUrl = replaceImage(lng, previous_lng, lat, previous_lat, angle2, taxi_id);
	var iconimage1 = {
		url: imgUrl, // url
		scaledSize: new google.maps.Size(60, 60), // scaled size
		origin: new google.maps.Point(0,0), // origin
		anchor: new google.maps.Point(30,30),// anchor
	};
	var taxi_marker = markers[taxi_id];
	taxi_marker.setIcon(iconimage1);
	var latlng = new google.maps.LatLng(previous_lat, previous_lng);
	taxi_marker.setPosition(latlng);
}

		var numDeltas = 100;
		var delay = 10; 
	function moveMarker1(taxi_id,list, lat, lng, previous_lat, previous_lng){
		if (window.move_count == 0){
			console.log("=========x zero");
		  lng = list[window.move_count][1];
		  previous_lat = previous_lat;
		  previous_lng = previous_lng;
			lat = list[window.move_count][0];
			set_position(lng, previous_lng, lat, previous_lat, angle2, taxi_id);
		} else{
			console.log("=====else part=====");
	    lng = list[window.move_count][1];
			previous_lng = list[window.move_count-1][1];
			lat = list[window.move_count][0];
			previous_lat = list[window.move_count-1][0];
			set_position(lng, previous_lng, lat, previous_lat, angle2, taxi_id);
		}
		if (window.move_count < list.length){
			window.move_count +=1;
			setTimeout( function() { moveMarker1(taxi_id,list, lat, lng, previous_lat, previous_lng); }, 1000 );
		}
	  // setTimeout( function() { set_position(lng, previous_lng, lat, previous_lat, angle2, taxi_id); }, 10 );
	}		

		function calculateAndDisplayRoute(directionsService, directionsDisplay,taxi_id) {
			directionsService.route({
			origin: markers[taxi_id].getPosition(),  // 
			destination: marker.getPosition(),  // 
			travelMode: google.maps.TravelMode.DRIVING
		  }, function(response, status) {
			if (status == google.maps.DirectionsStatus.OK) {
			  directionsDisplay.setDirections(response);
			} else {
			  window.alert('Directions request failed due to ' + status);
			}
		  });
			}
			
		
										var infobubble = new InfoBubble({
												  map: map,
												  position: new google.maps.LatLng(-32.0, 149.0),
												  shadowStyle: 1,
												  padding: 5,
                                                  minHeight: 48,
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
												var angle2;
												
function isLocationFree(search) {
  for (var i = 0, l = lookup.length; i < l; i++) {
    if (lookup[i][0] === search[0] && lookup[i][1] === search[1]) {
      return false;
    }
  }
  return true;
}
var l=0;

function angleCalculation(lng, previous_lng, lat, previous_lat, angle2) {
	var x = Math.sin(lng-previous_lng) * Math.cos(lat);
	var y = Math.cos(previous_lat)*Math.sin(lat) -
	    Math.sin(previous_lat)*Math.cos(lat)*Math.cos(lng-previous_lng);
	angle2 = Math.atan2(x, y)*(180/Math.PI);
	angle2 = Math.floor(angle2);
	angle2 = Math.round(angle2 / 10) * 10;
	if(angle2 >= 360) {
		angle2 = angle2 - 360;
		imgUrl = "taxi_icons/taxi_"+angle2+".svg";
	}
	else if (angle2 > 0 && angle2 < 360) {
		imgUrl="taxi_icons/taxi_"+angle2+".svg";
	}
	else {
		angle2 += 360;
		imgUrl="taxi_icons/taxi_"+angle2+".svg";	
	}
	return imgUrl;
}

function replaceImage (lng, previous_lng, lat, previous_lat, angle2, taxi_id) {
	imgUrl = angleCalculation(lng, previous_lng, lat, previous_lat, angle2);
	saveTaxiImage(taxi_id, imgUrl);
	return imgUrl;
}
function saveTaxiImage(taxi_id, imgUrl){
	save_image[taxi_id] = imgUrl;
	localStorage.setItem('save_image', JSON.stringify(save_image));
}

function splitValues(nextSegment){
	var regExp = /\(([^)]+)\)/;
	var matches = regExp.exec(nextSegment);
	return matches[1].split(",");
}

function findPolylineCoords(legs, lat, lng, previous_lat, previous_lng, polyline_array, imgUrl, taxi_id, angle2, bounds){
	for (i = 0; i < legs.length; i++) {
    var steps = legs[i].steps;
    for (j = 0; j < steps.length; j++) {
      var nextSegment = steps[j].path;
      //delete iconimage1;
      for (k = 0; k < nextSegment.length; k++) {
        polyline_array.push(splitValues(nextSegment[k]));
        bounds.extend(nextSegment[k]);
      	// if(nextSegment[k-1] != undefined){
      	// 	lat = splitValues(nextSegment[k])[0];
      	// 	lng = splitValues(nextSegment[k])[1];
      	// 	previous_lat = splitValues(nextSegment[k-1])[0];
      	// 	previous_lng = splitValues(nextSegment[k-1])[1];
      	// }
      	// else{
      	// 	lat = splitValues(nextSegment[k])[0];
      	// 	lng = splitValues(nextSegment[k])[1];
      	// }
      	//imgUrl = replaceImage(lng, previous_lng, lat, previous_lat, angle2, taxi_id);
      	//var iconimage1 = {
					//url: imgUrl, // url
					//scaledSize: new google.maps.Size(60, 60), // scaled size
					//origin: new google.maps.Point(0,0), // origin
					//anchor: new google.maps.Point(30,30),// anchor
				//};
				//var taxi_marker = markers[taxi_id];
				//taxi_marker.setIcon(iconimage1);
      	// console.log("=========image_url========="+imgUrl);
	  			//var latlng = new google.maps.LatLng(lat, lng);
				//taxi_marker.setPosition(latlng);
				//if (k==1){
				//return false;
				//}
      	//inc = 0;
				// deltaLat = (lat - previous_lat)/numDeltas;
				// console.log("==========deltaLat======"+deltaLat);
				// deltaLng = (lng - previous_lng)/numDeltas;
				// var position = [previous_lat, previous_lng];
				// moveMarker1(taxi_id,position,deltaLat,deltaLng,inc);
    //   	console.log("===lat===lng==="+lat+"===lng==="+lng);
    //   	console.log("====previous_lat==="+previous_lat+"===previous_lng==="+previous_lng);
    //   	var deltalat = (lat-previous_lat)/numDeltas;
    //   	var deltalng = (lng-previous_lng)/numDeltas;
    //   	console.log("======deltaLat====="+deltalat);
    //   	console.log("=======deltaLng====="+deltalng);
    //   	var position = [previous_lat, previous_lng];
    //   	var latlng = new google.maps.LatLng(lat, lng);
				
				// var inc = 0;

      //	startAnimation(taxi_id, latlng, deltalat, deltalng, position, inc);
    //   	imgUrl = replaceImage(lng, previous_lng, lat, previous_lat, angle2, taxi_id);
    //   	console.log("========image======"+imgUrl);
    //   	var iconimage1 = {
				// 	url: imgUrl, // url
				// 	scaledSize: new google.maps.Size(60, 60), // scaled size
				// 	origin: new google.maps.Point(0,0), // origin
				// 	anchor: new google.maps.Point(30,30),// anchor
				// };
				// markers[taxi_id].setIcon(iconimage1);
				// var latlng = new google.maps.LatLng(lat, lng);
				// markers[taxi_id].setPosition(latlng);
      }
    }
    //map.fitBounds(bounds);
    window.move_count = 0;
	moveMarker1(taxi_id, polyline_array, lat, lng, previous_lat, previous_lng);
	c = 1;
  }
  map.fitBounds(bounds);
  //console.log("========polyline_array=========="+polyline_array);
   //animateMarker(previous_lat, previous_lng, taxi_id, polyline_array, speed);
 // return polyline_array;
}

//var real_time_data = [[13.096885, 80.1998152,"online",18, 33.020999908447266],[13.0968667, 80.1996074,"online",18, 25.531999588012695],[13.0969616, 80.1994994,"online",18, 34.733001708984375],[13.0971207, 80.1993224,"online",18,57.31700134277344], [13.0972792, 80.1993256,"online",18,53.37099838256836],[13.0974804, 80.1995214,"online",18,42.83300018310547],[13.0975081, 80.1996155,"online",18,20],[13.0973574, 80.1997076,30],[13.0973099, 80.1997386,"online",18,27.84700122070312],[13.0974674, 80.1999658,"online",18,31.051000595092773],[13.0973342,80.1997275,"online",18,42.104000091552734],[13.0974227,80.1996533,"online",18,33.50699996948242],[13.0975001,80.1995712,"online",18,41.53499984741211],[13.0970631,80.1992542,"online",18,40.5],[13.0971768, 80.1993828,"online",18,45.381000518739883],[13.0968632,80.1996479,"online",18,25]]

window.real_time_data = [];

function a(){
	var lookup = [];		
	//$.get( "https://250taxi.com/db/journey/online_v2.php",  function( data ) {
	$.getJSON( "real_time_datas_17_11_2016.json", function( data ) {

		$.each(data, function(key, val){
		var real_time_data = val;
	 	for (var i = 0; i < real_time_data.length; i++) {
	 		console.log("=======function=====");
	  	// (function(i){
	  	// setTimeout(function(){
			// if(data !="[]"){ 
			// 	var array = JSON.parse(data);
			// 	window.real_time_data.push(array);
				var latprev = lat; var lngprev = lng; var flightPlanCoordinates;
				var counter = 0;
//var latLng_array = [[13.096966, 80.199534, 13.096966, 80.199665], [13.096966, 80.199665, 13.096942, 80.199998], [13.096942, 80.199998, 13.096903, 80.200124], [13.096903, 80.200124, 13.096822, 80.200151], [13.096822, 80.200151, 13.096699, 80.200159], [13.096699, 80.200159, 13.096568, 80.200159], [13.096568, 80.200159, 13.096388, 80.200151], [13.096388, 80.200151, 13.096331, 80.200116], [13.096331, 80.200116, 13.096341, 80.200009], [13.096341, 80.200009, 13.096341, 80.199805]];

//var latLng_array = [[13.097554, 80.200671, 13.097418, 80.200022], [13.097533, 80.199368, 13.097261, 80.199239], [13.096963, 80.199679, 13.096540, 80.200140], [13.096344, 80.199858, 13.096145, 80.199348]]
//real time data 
//var latLng_array = [[13.096885, 80.1998152, 13.0968648, 80.1998116], [13.0968667, 80.1996074, 13.0968648, 80.1998116], [13.0969616, 80.1994994, 13.0968667, 80.1996054], [13.0971207, 80.1993224, 13.0969625, 80.1994983], [13.0972792, 80.1993256, 13.0971223, 80.1993206], [13.0974804, 80.1995214, 13.0972808, 80.1993256], [13.0975081, 80.1996155, 13.0974824, 80.1995234], [13.0973574, 80.1997076, 13.0975084, 80.1996164], [13.0973099, 80.1997386, 13.0973559, 80.1997085], [13.0974674, 80.1999658, 13.0973559, 80.1997085]];
			/*************************** */
			//array.forEach(function(entry) {
			  // for (var i = 0; i < latLng_array.length; i++) {
			  // (function(i){
     //    setTimeout(function(){
				//delete iconimage1;
				var previous_lat;
				var previous_lng;
				var imgUrl;
				var angle = 0;
				// var l = entry;
				// var loc = l.split(",");
				 var dist;
				var loc = real_time_data[i];
				var accurate_coords;
				// lat = 13.097448; 
				// lng = 80.203300;

				// movement working code============
				// console.log("========array values======"+ latLng_array[i]);
				// lat = latLng_array[i][2];
				// lng = latLng_array[i][3];
				// status = "online";
				// taxi_id = 18;
				// accuracy = 50;
				// driverName = "test";
				// console.log("=====lat lng========="+lat);

				lat = 13.096331;//loc[0];
				lng = 80.199775;//loc[1];
				status = loc[2];
				taxi_id = loc[3];
				accuracy = loc[4];
				driverName = loc[5];
				driverSurname = loc[6];
				if( typeof markers[taxi_id] !== 'undefined' && status == "online"){
					lat = 13.096916;
					lng = 80.199678;
					previous_lat = markers[taxi_id].getPosition().lat();
					previous_lng = markers[taxi_id].getPosition().lng();
					var polyline_array = [];

					directionsService.route({
					    origin: new google.maps.LatLng(previous_lat,previous_lng),
					    destination: new google.maps.LatLng(lat,lng),
					    waypoints: [{
					      stopover: false,
					      location: new google.maps.LatLng(lat,lng)
					    }],
					    travelMode: google.maps.TravelMode.DRIVING
					  }, function(response, status) {
					    if (status === google.maps.DirectionsStatus.OK) {
					    	//setTimeout(function(){
					      directionsDisplay.setDirections(response);
					      // var polyline = new google.maps.Polyline({
					      //   path: [],
					      //   strokeColor: '#0000FF',
					      //   strokeWeight: 3
					      // });
					      var bounds = new google.maps.LatLngBounds();
					      
					      var legs = response.routes[0].legs;
					      console.log("========service response ========");
					      window.move_count = 0;
					      findPolylineCoords(legs, lat, lng, previous_lat, previous_lng, polyline_array, imgUrl, taxi_id, angle2, bounds);
					      sdfsdfsdf

					      //polyline.setMap(map);
					      //}, 100 * a);
					    } else {
					     // window.alert('Directions request failed due to ' + status);
					    }
					  });
				}

				var position = [previous_lat, previous_lng];
				var inc = 0;
				var deltaLat;
				var deltaLng;

				if( typeof markers[taxi_id] === 'undefined' && status=="online") {
					var pos = new google.maps.LatLng(lat, lng);
					markers[taxi_id] = new google.maps.Marker({
						position: pos,
						map: map,
						draggable: false,
						icon: iconimage1,
						id: taxi_id
					});	
				}
				else if( typeof markers[taxi_id] !== 'undefined' && status == "offline"){
					markers[taxi_id].setMap(null);
					delete markers[taxi_id]; 
				}
 			//});
// }, 5000 * i)//=======movement working code
//     }(i));
			}	
		//} 
	});	
});	
	//res_count += 1;			
}

// Start map updater
// map_updater = setInterval(a,500000); 
//map_updater = setInterval(a,50000000); 
			
function checkPolyline(taxi_id, position, lat, lng, previous_lat, previous_lng, inc){
	var latlng = new google.maps.LatLng(lat, lng);
	markers[taxi_id].setPosition(latlng);
	if(inc!=numDeltas){
		inc++;
		setTimeout( function() { checkPolyline(taxi_id,position,lat,lng,previous_lat,previous_lng,inc); }, 30 );
	}
}


            google.maps.event.addListener(marker, 'dragend', function (event) {
            document.getElementById("lat").value = event.latLng.lat();
            document.getElementById("long").value = event.latLng.lng();
            geocodeLatLng(geocoder, map);
            });

            // get coordinates from marker?
            google.maps.event.addListener(marker, 'dragend', function(evt){
            // document.getElementById('current').innerHTML = '<p>Marker dropped: Current Lat: ' +         evt.latLng.lat().toFixed(3) + ' Current Lng: ' + evt.latLng.lng().toFixed(3) + '</p>';
                
            pos = new google.maps.LatLng(evt.latLng.lat().toFixed(3),evt.latLng.lng().toFixed(3));
                
            // alert('Marker dropped: Current Lat: '+evt.latLng.lat().toFixed(3)+' Current Lng: '+evt.latLng.lng().toFixed(3)+' Pos: '+pos+'');
            
            geocodeLatLng(geocoder, map);
                
            });
                
			var contentString = "<b>Timestamp:</b> " + parseTimestamp(position.timestamp) + "<br/><b>User location:</b> lat " + position.coords.latitude + ", long " + position.coords.longitude + ", accuracy " + position.coords.accuracy;
			// Remove the current infoWindow, if there is one
			//console.log(position.coords.accuracy);
			
            if (typeof(infoWindow) != "undefined") infoWindow.setMap(null);
			infowindow = new google.maps.InfoWindow({
				content: contentString
			});
            
			// google.maps.event.addListener(marker, 'click', function() {
			//	infowindow.open(map,marker);
			// });
            
		}
		function moveMarker( map, marker,lat,lng ) {
    
    //delayed so you can see it move
    setTimeout( function(){ 
    
        marker.setPosition( new google.maps.LatLng( lat-0.10, lng-0.10 ) );
        map.panTo( new google.maps.LatLng(lat-0.10, lng-0.10) );
        
    }, 500 );

};
		function displayError(error) {
			var errors = { 
				1: 'Permission denied\n\nPlease allow 250 Taxi to locate you. You can change this in your browsers settings.',
				2: 'Position unavailable. 250TAXI was not able to find your current location.',
				3: 'Request timeout. It took too long to locate you. Please try again.'
			};
			alert("Error: " + errors[error.code]);
		}
		function parseTimestamp(timestamp) {
			var d = new Date(timestamp);
			var day = d.getDate();
			var month = d.getMonth() + 1;
			var year = d.getFullYear();
			var hour = d.getHours();
			var mins = d.getMinutes();
			var secs = d.getSeconds();
			var msec = d.getMilliseconds();
			return day + "." + month + "." + year + " " + hour + ":" + mins + ":" + secs + "," + msec;
		}
    
var geocoder = new google.maps.Geocoder;
    
function geocodeLatLng(geocoder, map) {

  // var input = String(pos);
    
  // var latlngStr = input.split(',', 2);
    
  // var latlng = {lat: parseFloat(latlngStr[0]), lng: parseFloat(latlngStr[1])};
    
  geocoder.geocode({'location': pos}, function(results, status) {
    if (status === google.maps.GeocoderStatus.OK) {
      if (results[1]) {
        // infowindow.setContent(results[1].formatted_address);
        // infowindow.open(map, marker);
		// console.log(results[0]);
		
        document.getElementById('inlocationfield').value = results[0].formatted_address;
		lat = results[0].geometry.location.lat();
		lng = results[0].geometry.location.lng();
          
        localStorage.setItem("pickup_lat",lat);
        localStorage.setItem("pickup_lng",lng);
          
		position = new google.maps.LatLng(lat, lng);

			//Script for getting distance between the nearest landmark and the user current location
			
			var place_service = new google.maps.places.PlacesService(map); 
			place_service.nearbySearch({
			  location: position,
			  radius: 100,
			  type: ['point_of_interest'],
			}, getPlace); 
			
			function getPlace(results, status) {				
				/*placeLat =results[0].geometry.location.lat();
				placeLng =results[0].geometry.location.lng();
				distanceFromPlaceInKm= distance(lat, lng, placeLat, placeLng, 'k');
				distanceFromPlace =	Number((distanceFromPlaceInKm*1000).toFixed(1)) + " Metres from " +results[0].name;
				console.log(distanceFromPlace);	
				currentLoc = $("#inlocationfield").val();
				currentLocation = currentLoc.split("(");
				currentLoc = currentLocation[0] + " ( " +distanceFromPlace + " ) " ;
				$("#inlocationfield").val(currentLoc); */
				
				document.getElementById('list_of_nearby_places').innerHTML = "";
				$.each(results, function( index, value ) {
				  //alert( index + ": " + value );
				  
				placeLat =results[index].geometry.location.lat();
				placeLng =results[index].geometry.location.lng();
				distanceFromPlaceInKm= distance(lat, lng, placeLat, placeLng, 'k');
				distanceFromPlace =	"<option value='"+Number((distanceFromPlaceInKm*1000).toFixed(1)) + " mtrs to " +results[index].name+"'>"+Number((distanceFromPlaceInKm*1000).toFixed(1)) + " mtrs to " +results[index].name+"</option>";
				// console.log(distanceFromPlace);	
				$('#list_of_nearby_places').append(distanceFromPlace);	
				//console.log(currentLoc);
				});				
			}
			
		pickup = results[0].formatted_address;  
		localStorage.setItem("pickup",pickup);
		// console.log("Pickup:" + pickup);
      } 
    else {
        // window.alert('No results found');
      }
    } 
    else {
      // window.alert('Geocoder failed due to: ' + status);
    }
  });
}

function gofullscreen() {
var elem = document.getElementById('pages');
elem.webkitRequestFullScreen();
}

jQuery(document).ready(function($) {
    
localStorage.setItem('activity','searching_address');
    
$('#searchbyaddress').blur(function () {
        document.getElementById("calltaxiui").style.display = "block";
    }).focus(function () {
        document.getElementById("calltaxiui").style.display = "none";
    })
    .keypress(function (e) {
        if (e.which == 13) {
            codeAddress();
        }
    });
    
$('#searchbyaddress_clear').click(function () {
        document.getElementById("searchbyaddress").value = "";
    });
    


$('.toggle-menu').jPushMenu();
    
document.getElementById("loadingindicator").className = "animated fadeOut";
setTimeout(function(){
document.getElementById("loadingindicator").style.display = "none";
}, 2000);
    
});


function hi(){    
    
// Update chat window

chat_enabled = localStorage.getItem("chat_enabled");

// Check if chat has been started

if (chat_enabled == "Yes") {
driverid = localStorage.getItem("pickdriver_id");
clientid = localStorage.getItem("userid");   

$( "#chat_load_messages" ).load( "https://250taxi.com/db/journey/chat.php?task=show_messages&driverid="+driverid+"&clientid="+clientid+"", function( data ) {
    
    // Check if there is a new chat message
    // var chat_new_from_client = document.getElementById("chat_new_from_client").innerHTML;
    var chat_new_from_driver = document.getElementById("chat_new_from_driver").innerHTML;
    // console.log(chat_new_from_client);
    
    if (chat_new_from_client == "1") {
        // console.log("New chat message from client");
    }
    if (chat_new_from_driver == "1") {
        // console.log("New chat message from driver");
        
            chat();

            
            $.get( "https://250taxi.com/db/journey/chat.php?task=clear_driver&driverid=" + driverid + "&clientid=" + clientid + "",  function( data ) {
             chataudio.play();   
            });

        
        
    }
    
});
}
    
// Report location
    
        var status_lat= document.getElementById('lat').value;
        var status_long = document.getElementById('long').value;
        var status_username = localStorage.getItem('username');
        var status_userid = localStorage.getItem('userid');
        var status_activity = localStorage.getItem('activity');
    
     var battery = navigator.battery || navigator.mozBattery;
if (battery) {
    // battery status for firefox 
        var device_battery = (battery.level * 100);
    localStorage.setItem('device_battery',device_battery);
} else if (navigator.getBattery) {
    //battery status for chrome
    navigator.getBattery().then(function(battery) {
        var device_battery = (battery.level * 100);
        localStorage.setItem('device_battery',device_battery);
    });
}
    
var status_battery = localStorage.getItem('device_battery');	
var pickup = localStorage.getItem("pickup");
    
$.get( "https://250taxi.com/db/status_user_v2.php", {
    status_lat: status_lat,
    status_long: status_long,
    status_userid: status_userid,
    status_activity: status_activity,
    status_battery: status_battery   
} ).done(function( data ) {
    
    // console.log("Status: " + data);
    
    document.getElementById("server_com").innerHTML = data;
    
    // check activity and show messages to client
    
    var activity = localStorage.getItem("activity");
 
    // Prevent multiple logins
    mlicheck();
    
   // if (activity == "searching_address" || activity == "driver_selected" || activity == "driver_has_arrived") {
        server_status_check = document.getElementById("server_status").innerHTML;  
        server_message_check = document.getElementById("server_message").innerHTML;
    
if (server_message_check > 0) {
    
var userid = localStorage.getItem("userid");
            
$.get( "https://250taxi.com/db/message.php?&task=confirm&userid="+userid+"&messageid="+server_message_check+"", function(responsetext) {  
    
// console.log("Reset notification: "+responsetext+"");
    
if (responsetext.includes("restart")) {
    setTimeout(function(){ 
        location.reload();
    }, 3000);
}
    
show_message(responsetext);

});
            
}

// console.log("Server Status: " + server_status_check);

        if(server_status_check == "accepted") {
           status_accepted(); 
        }
        if(server_status_check == "summary") {
           status_summary();
        }
        if(server_status_check == "driver_assigned") {
            driver_assigned();
        }
        
  //  }

});       
}
  
$(document).ready( function() {

    // Start Intervall
    setInterval(hi, 5000);
    hi();

});
    
function declined () {
    
var pickdriver_id = localStorage.getItem("pickdriver_id");
var username = localStorage.getItem("username");
    
localStorage.setItem('toast','The driver you have selected is busy at the moment, kindly choose another driver.');toast();

    $.get( "https://250taxi.com/db/partner/taxi_comlink_journey.php?task=declined&username="+username+"",  function( data ) {
        setTimeout(function(){
        showindicator();
        }, 5000);
        setTimeout(function(){
        alert("The driver you have selected is busy at the moment, kindly choose another driver.");
        location.reload();
        }, 6000);
    });

}

function taxis_online_info_load () {   

var lat = localStorage.getItem("pickup_lat");
var long = localStorage.getItem("pickup_lng");
    
$( "#taxis_online_info" ).load( "https://250taxi.com/db/partner/taxi_drivers_online.php?lat="+lat+"&long="+long+"", function() {});

}

$(document).ready(function() {
    
taxis_online_info_load();
    
$( "#taxis_online_info" ).click(function() {
    // document.getElementById("taxis_online_info").style.display = "none";
});
    
var taxis_online_info = setInterval(taxis_online_info_load, 15000);
    
var voice_enabled = localStorage.getItem("voice_enabled");
if (voice_enabled == "On") {
    $('#audio_choice_onoffswitch').prop('checked', true);   
}

        $( "#audio_choice" ).click(function() {
        var voice_enabled = document.getElementById('audio_choice_onoffswitch').checked;
    
        if (voice_enabled == false) {
            localStorage.setItem("voice_enabled","Off");
        }
        if (voice_enabled == true) {
            localStorage.setItem("voice_enabled","On");
        }
        });

}); 
 function driveroverlay_back_to_list_x() {
        
    // When you want to cancel it:
        clearInterval(journey_updater);
        journey_updater = 0;
        
    document.getElementById("driverlist").style.display = "block";
    document.getElementById("menubutton").style.display = "block";
    document.getElementById("locationfieldholder").style.display = "block";
    document.getElementById("locationbutton").style.display = "block";
    document.getElementById("searchdrivers").style.display = "block";
    
    document.getElementById("driveroverlay").style.display = "none";
    document.getElementById("driveroverlay_journey_start").style.display = "none";
    }
	
	    function cancel_reason_close() {
            


        
        showindicator();
        
        document.getElementById('driveroverlay_journey_cancel_dialog').style.display = 'none';
        document.getElementById('driveroverlay_journey_cancel_dialog').style.display = 'none';
        document.getElementById('driveroverlay_journey_cancel').style.display = 'none';
        
        var pickdriver_id = localStorage.getItem("pickdriver_id");
        var username = localStorage.getItem("username");
        
        var cancel_reason = localStorage.getItem("cancel_reason");
            
            
        var userid = localStorage.getItem('userid');
var driverid = localStorage.getItem("pickdriver_id");
localStorage.setItem("logupdate",""+userid+"*"+driverid+"*request cancelled*User"+userid+" cancelled journey with Driver"+driverid+" - Reason: "+cancel_reason+"");logupdate_v2();
            
            
            
        
        if(cancel_reason == "other") {
            cancel_reason = prompt("Please let the driver know why you cancel", "");
        }
        
         $.get( "https://250taxi.com/db/partner/taxi_comlink_journey.php?task=cancel&username="+username+"&pickdriver_id="+pickdriver_id+"&cancel_reason="+cancel_reason+"",  function( data ) {
        location.reload();
    });
        
    }
	
function logout() {
    
swal({   
    title: "Logout?",   
    text: "",
    type: "",
    showCancelButton: true,
    confirmButtonColor: "#DD6B55",
    confirmButtonText: "Yes",
    closeOnConfirm: true
}, function(){
    
    showindicator();
        
    var userid = localStorage.getItem('userid');     
    localStorage.setItem("logupdate",""+userid+"*0*logout*User"+userid+" logged out.");logupdate_v2();

    localStorage.removeItem('rememberuser');
    localStorage.removeItem('username');
    localStorage.removeItem('userid');
    localStorage.removeItem('randomclientid');
        
    setTimeout(function(){
        location.replace('index.html');    
    }, 3000);
    
});

}
	
$(document).ready(function() {
    
if((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i))) {
    console.log("We detected you are using an iPhone");
}
    
var overlay_shown = localStorage.getItem("overlay_shown");

if(overlay_shown == "Yes") {
    document.getElementById("overlay").style.display = "none";
}
if(overlay_shown !== "Yes") {
    document.getElementById("overlay").style.display = "block";
}
    
$( "#overlay" ).click(function() {
    localStorage.setItem("overlay_shown","Yes");
    $( "#overlay").fadeOut( "slow", function() {

    });
});
    
$( "#locationfield" ).click(function() {
    
    document.getElementById("locationfinderdialog").style.display = "block";
    
    // $( "#locationfinderdialog").slideDown( "slow", function() {
        $("#searchbyaddress").focus();
    // });
});

$( "#locationfinderdialog_x" ).click(function() {
    
    document.getElementById("taxis_online_info").style.display = "block";
    
    
    document.getElementById("locationfinderdialog").style.display = "none";
    // $( "#locationfinderdialog").slideUp( "slow", function() {

    // });
});

});
function codeAddress() {
    
var address = document.getElementById('searchbyaddress').value;
    
var addresslength = address.length;
    
if (addresslength > 2) {
    
    document.getElementById("locationfinderdialog").style.display = "block";
    // $( "#locationfinderdialog").slideUp( "slow", function() {});
    
}
else {
    alert("Please enter a search term!");
    return;
}
    
var city = ', Kigali';
var country = ', Rwanda';
var address = address;
    
document.getElementById('inlocationfield').value = address;
	
localStorage.setItem("pickup",address);
    
  geocoder.geocode( { 'address': address}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      pos = results[0].geometry.location;
    
      pos2box = String(pos);
    
      pos2box = pos2box.split(',',2);
        
    // alert(pos2box[0]);
    // alert(pos2box[1]);
    
    // var latlng = {lat: parseFloat(latlngStr[0]), lng: parseFloat(latlngStr[1])};
        
    var search_lat = pos2box[0];        
    var search_lat = search_lat.slice( 1 );     
    var search_long = pos2box[1];  
    var search_long = search_long.slice( 1 );  
    var search_long = search_long.substring(0, search_long.length - 1);
        
        document.getElementById("lat").value = search_lat;
        document.getElementById("long").value = search_long;
        position={coords:{latitude:search_lat,longitude:search_long}};
		displayPosition(position);
		/*
    var options = {
				zoom: 16,
                disableDefaultUI: true,
                streetViewControl: false,
				center: pos,
				mapTypeId: google.maps.MapTypeId.ROADMAP,
                styles: [{ featureType: "poi", elementType: "labels", stylers: [{ visibility: "off" }]}]
			};
    
   var map = new google.maps.Map(document.getElementById("map"), options);
        
    // alert(pos);
        
    // Remove the current marker, if there is one
			if (typeof(marker) != "undefined") marker.setMap(null);
            
var iconimage = {
    url: "userpinicon.png", // url
    scaledSize: new google.maps.Size(90, 90), // scaled size
    origin: new google.maps.Point(0,0), // origin
    anchor: new google.maps.Point(43,90) // anchor
};
       
marker2 = new google.maps.Marker({
                draggable: true,
                icon: iconimage,
				position: pos,
				map: map,
				title: "User location"
			});
        
google.maps.event.addListener(marker2, 'dragend', function (event) {
            document.getElementById("lat").value = event.latLng.lat();
            document.getElementById("long").value = event.latLng.lng();
});
        

google.maps.event.addListener(marker2, 'dragend', function(evt){

pos = new google.maps.LatLng(evt.latLng.lat().toFixed(3),evt.latLng.lng().toFixed(3));
                
geocodeLatLng(geocoder, map);
    
});
        
        */
        
    } /*
    else {
      alert('Geocode was not successful for the following reason: ' + status);
    }*/
  });
}    