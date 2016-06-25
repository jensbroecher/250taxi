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

var options = {
 componentRestrictions: {country: 'rw'}
};

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
console.log('reloaded: '+pos+'');
}

document.addEventListener("deviceready", onDeviceReady, false);
	
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

var directionsDisplay = new google.maps.DirectionsRenderer;
var directionsService = new google.maps.DirectionsService;
function distance(lat1, lon1, lat2, lon2, unit) {	//function for calculating distance between two coordinates
	var radlat1 = Math.PI * lat1/180
	var radlat2 = Math.PI * lat2/180
	var theta = lon1-lon2
	var radtheta = Math.PI * theta/180
	var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
	dist = Math.acos(dist)
	dist = dist * 180/Math.PI
	dist = dist * 60 * 1.1515
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
				console.log(results[0]);console.log("Lat"+lat);console.log("LNG"+lng);
				$.each(results, function( index, value ) {
				  //alert( index + ": " + value );
				placeLat =results[index].geometry.location.lat();
				placeLng =results[index].geometry.location.lng();
				distanceFromPlaceInKm= distance(lat, lng, placeLat, placeLng, 'k');
				distanceFromPlace =	"<option value='"+Number((distanceFromPlaceInKm*1000).toFixed(1)) + " mtrs from " +results[index].name+"'>"+Number((distanceFromPlaceInKm*1000).toFixed(1)) + " mtrs from " +results[index].name+"</option>";
				console.log(distanceFromPlace);	
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
				position: pos,
				map: map,
				title: "User location"
			});
	a();
			//moveMarker( map, marker, position.coords.latitude,position.coords.longitude);
var count=0; var markers = {}; var iconimage1 = {}; var lat; var lng; var loc; var flightPath=[];
		function animateCircle(line) {
    var count = 0;
    window.setInterval(function() {
      count = (count + 1) % 200;

      var icons = line.get('icons');
      icons[0].offset = (count / 2) + '%';
      line.set('icons', icons);
  }, 200);

}

		
		var numDeltas = 100;
		var delay = 10; 
		function moveMarker1(taxi_id,position,deltalat,deltalng,inc){
			if(typeof position !== 'undefined'){
			deltaLat=deltalat;deltaLng=deltalng;
			position=position;
			position[0] += deltaLat;
			position[1] += deltaLng;
			var latlng = new google.maps.LatLng(position[0], position[1]);
			var key=taxi_id;
			var q=markers[key];
			if(typeof q !== 'undefined'){
			q.setPosition(latlng);
			}
			if(inc!=numDeltas){
				inc++;
				setTimeout( function() { moveMarker1(taxi_id,position,deltalat,deltalng,inc); }, 10 );
			}
			}
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

function a(){
	var lookup = [];		
$.get( "https://250taxi.com/db/journey/online_v2.php",  function( data ) {
if(data !="[]"){ 
var array = JSON.parse(data);
										 										 
var latprev=lat; var lngprev=lng; var flightPlanCoordinates;
var counter=0;

/*************************** */
array.forEach(function(entry) {
    delete iconimage1;
	var l=entry;
	var loc=l.split(",");
		lat=loc[0];
		lng=loc[1];
		status=loc[2];
		taxi_id=loc[3];





		accuracy=loc[4];
		driverName=loc[5];
		driverSurname=loc[6];
		var previous_lat;
		var previous_lng;var imgUrl;
		
		var angle=0;
		if( typeof markers[taxi_id] !== 'undefined' ){
		 previous_lat = markers[taxi_id].getPosition().lat();
		 previous_lng = markers[taxi_id].getPosition().lng();

		// $.get( "https://250taxi.com/ios/angle.php? // lat="+lat+"&lng="+lng+"&previous_lat="+previous_lat+"&previous_lng="+previous_lng,  function( data ) {
			//console.log(data);
		//	ang=data;
			//$("#angle").val(ang);   
			//console.log(ang);
										  
		//	}); 

			var B = {
				x : lat,
			  y : lng
			};

			var A = {
				x : previous_lat,
			  y : previous_lng
			};
			 angle2 = ( ( ( -(Math.atan2((A.x-B.x),(A.y-B.y))*(180/Math.PI)) % 360) + 360) % 360);
			 angle2= angle2 +60;

		}
		
			
/*if (taxi_id.match("^o")) {
			   // do this if begins with o
			//console.log(taxi_id);
			angle2=Math.floor((Math.random() * 36) + 1); 
			angle2=angle2 * 10;
			} */

			
angle2 = Math.floor(angle2);    
	
angle2 = Math.round(angle2 / 10) * 10;
	
// console.log("Angle:" +angle2);
	
// imgUrl="https://250taxi.com/ios/test.php?a="+angle2;
	
if (angle2 > 360) {
	console.log("360 exceeded");
	angle2_s = angle2.toString();
	angle2_s = angle2_s.substring(1);
	angle2 = parseInt(angle2_s);
}
if (taxi_id.match("^o")) {
angle2=Math.floor((Math.random() * 36) + 1); angle2=angle2 * 10;
imgUrl="taxi/taxi_"+angle2+".svg";
}
else{
imgUrl="taxi/taxi_"+angle2+".svg";
}
  //console.log(angle2 +","+ taxi_id);  

var iconimage1 = {
 url: imgUrl, // url
	//path: 'M -1,0 A 1,1 0 0 0 -3,0 1,1 0 0 0 -1,0M 1,0 A 1,1 0 0 0 3,0 1,1 0 0 0 1,0M -3,3 Q 0,5 3,3',
	//rotation: angle2,
    scaledSize: new google.maps.Size(60, 60), // scaled size
    origin: new google.maps.Point(0,0), // origin
    anchor: new google.maps.Point(43,90),// anchor
	
};/*if( typeof markers[taxi_id] !== 'undefined'){
markers[taxi_id].setMap(null); delete markers[taxi_id]; } */
		var position = [previous_lat, previous_lng];
		//var numDeltas = 100;
		//var delay = 30; //milliseconds
		var inc = 0;
		var deltaLat;
		var deltaLng;

		function transition(result){
			inc = 0;
			deltaLat = (result[0] - position[0])/numDeltas;
			deltaLng = (result[1] - position[1])/numDeltas;
			moveMarker();
		}
		
		function moveMarker(){
			//alert(position);
			console.log(position);
			position[0] += deltaLat;
			position[1] += deltaLng;
			var latlng = new google.maps.LatLng(position[0], position[1]);
			var key=taxi_id;
			var q=markers[key];
			if(typeof q !== 'undefined'){
			q.setPosition(latlng);
			}
			if(inc!=numDeltas){
				inc++;
				setTimeout(moveMarker, delay);
			}
		}
		if( typeof markers[taxi_id] !== 'undefined'){
			dis = distance(lat, lng, previous_lat, previous_lng, 'K'); console.log(dis/1000);
			disInMetres=dis*1000;
			if(disInMetres > 10){
				markers[taxi_id].setIcon(iconimage1);
			}
		}
		if( typeof markers[taxi_id] === 'undefined' && status=="online") {

/*
var i=0;
var search =lat+","+lng;
var a= lookup.indexOf(search); var lat1=lat; var lng1=lng;
if (a != "-1"){ i=100;
 //lat =parseFloat(lat) + parseFloat('0.1');
 lng =parseFloat(lng) + parseFloat('0.5');
}
lookup.push(lat1+","+lng1); */
				var pos = new google.maps.LatLng(lat, lng);
				markers[taxi_id] = new google.maps.Marker({
				position: pos,
				map: map,
				//zIndex: i,
				draggable: false,
				icon: iconimage1,
                // title: "Taxi"+taxi_id+"angle"+angle2,
				// title: "Taxi"+taxi_id+"",
				id: taxi_id
				});	
		}
		else if( typeof markers[taxi_id] !== 'undefined' && status=="offline"){
			markers[taxi_id].setMap(null);
			
			delete markers[taxi_id]; 
		}
		else if( typeof markers[taxi_id] !== 'undefined' && status=="online"){
			//markers[taxi_id].setPosition( new google.maps.LatLng( lat, lng ) );
			var result = [lat, lng];
			taxi_marker=markers[taxi_id];
			//transitionArr[taxi_id](result);
			inc = 0;
			deltaLat = (result[0] - position[0])/numDeltas;
			deltaLng = (result[1] - position[1])/numDeltas;
//var angle=$("#angle").val();
//var angl=angle;//alert(angle); 
//console.log(ang);

//imgUrl="https://250taxi.com/ios/test.php?a="+ang;

			if(accuracy<50){
			moveMarker1(taxi_id,position,deltaLat,deltaLng,inc);
			}

			
		}

		/**********************/
			if( typeof markers[taxi_id] !== 'undefined'){
			var arg;
			var contentString = '<div style="color:white;">&nbsp;<b>'+driverName+'</b><IMG BORDER="0" ALIGN="Left" WIDTH="40" SRC="https://www.250taxi.com/driverpics/'+taxi_id+'.jpg" onError="this.src = \'https://www.250taxi.com/app/no-user-image.gif\'"></div>';
			var currentmarker=markers[taxi_id];
			google.maps.event.addListener(currentmarker, 'click', (function(currentmarker, arg) {
               return function() {				   
						infobubble.setContent(contentString);
						infobubble.open(map, currentmarker);
                }
            })(currentmarker, arg)); 
		   }
		/**********************/
	
});
	
	} 
				});				

			}

// Starte map updater
map_updater = setInterval(a,10000); 
			

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
		console.log(results[0]);
		
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
				console.log(distanceFromPlace);	
				$('#list_of_nearby_places').append(distanceFromPlace);	
				//console.log(currentLoc);
				});				
			}
			
		pickup = results[0].formatted_address;  
		localStorage.setItem("pickup",pickup);
		console.log("Pickup:" + pickup);
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
        console.log("New chat message from driver");
        
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
    
console.log("Reset notification: "+responsetext+"");
    
if (responsetext.includes("restart")) {
    setTimeout(function(){ 
        location.reload();
    }, 3000);
}
    
show_message(responsetext);

});
            
}

console.log("Server Status: " + server_status_check);

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
        
showindicator();
        
var userid = localStorage.getItem('userid');     
localStorage.setItem("logupdate",""+userid+"*0*logout*User"+userid+" logged out.");logupdate_v2();

    localStorage.removeItem('rememberuser');
    localStorage.removeItem('username');
        
    setTimeout(function(){
        document.location.href = 'index.html';    
    }, 3000);

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
    
    // document.getElementById("taxis_online_info").style.display = "none";
    
    $( "#locationfinderdialog").slideDown( "slow", function() {
        $("#searchbyaddress").focus();
    });
});

$( "#locationfinderdialog_x" ).click(function() {
    
    document.getElementById("taxis_online_info").style.display = "block";
    
    $( "#locationfinderdialog").slideUp( "slow", function() {

    });
});

});
function codeAddress() {
    
var address = document.getElementById('searchbyaddress').value;
    
var addresslength = address.length;
    
if (addresslength > 2) {
    $( "#locationfinderdialog").slideUp( "slow", function() {});
    
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
