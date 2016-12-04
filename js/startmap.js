var ang;
$(document).ready(function () {

    trigger_check_if_map_loaded();

    // Disabled for new update
    // document.getElementById("loading_map_indicator").className = "lmp_visible";

    function trigger_check_if_map_loaded() {
        setTimeout(function () {
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

    function toRadians(deg) {
        return deg * Math.PI / 180;
    }

    function toDegrees(rad) {
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

    var options = {
        componentRestrictions: {
            country: 'rw'
        }
    };

    autocomplete = new google.maps.places.Autocomplete(input, options);

    autocomplete2 = new google.maps.places.Autocomplete(input2, options);

    autocomplete3 = new google.maps.places.Autocomplete(input3, options);

});

function showindicator() {
    document.getElementById("loadingindicator").className = "animated fadeIn";
    document.getElementById("loadingindicator").style.display = "block";
    document.getElementById("loading_reset").style.display = "none";
    setTimeout(function () {
        document.getElementById("loading_reset").style.display = "block";
    }, 5000);
}

function hideindicator() {
    document.getElementById("loadingindicator").className = "animated fadeOut";
    setTimeout(function () {
        document.getElementById("loadingindicator").style.display = "none";
    }, 1000);
}

function audio_update_location() {

    var voice_enabled = localStorage.getItem("voice_enabled");
    if (voice_enabled == "On") {
        responsiveVoice.speak("Locating you again");
    }
}

var marker;
var infoWindow;

function reloadPositionStart() {
    reloadPosition();
    document.getElementById("locationbutton").className = 'menugpsblue';
    setTimeout(function () {
        document.getElementById("locationbutton").className = 'menugps';
    }, 1000);
    setTimeout(function () {
        document.getElementById("locationbutton").className = 'menugpsblue';
    }, 2000);
    setTimeout(function () {
        document.getElementById("locationbutton").className = 'menugps';
    }, 3000);
    setTimeout(function () {
        document.getElementById("locationbutton").className = 'menugpsblue';
    }, 4000);
    setTimeout(function () {
        document.getElementById("locationbutton").className = 'menugps';
    }, 5000);
    setTimeout(function () {
        document.getElementById("locationbutton").className = 'menugpsblue';
    }, 6000);
    setTimeout(function () {
        document.getElementById("locationbutton").className = 'menugps';
    }, 7000);
    setTimeout(function () {
        document.getElementById("locationbutton").className = 'menugpsblue';
    }, 8000);
    setTimeout(function () {
        document.getElementById("locationbutton").className = 'menugps';
    }, 8000);
}

function reloadPosition() {
    navigator.geolocation.getCurrentPosition(
        displayPosition
        , displayError, {
            enableHighAccuracy: true
            , maximumAge: 0
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
    displayPosition
    , displayError, {
        enableHighAccuracy: false
        , maximumAge: 0
    }
);
//}

var directionsDisplay = new google.maps.DirectionsRenderer;
//var directionsDisplay = new google.maps.DirectionsRenderer({
//   map: map,
//   preserveViewport: true
// });
var directionsService = new google.maps.DirectionsService();

function distance(lat1, lon1, lat2, lon2, unit) {
    //function for calculating distance between two coordinates
    var radlat1 = Math.PI * lat1 / 180
    var radlat2 = Math.PI * lat2 / 180
    var theta = lon1 - lon2
    var radtheta = Math.PI * theta / 180
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist);
    dist = dist * 180 / Math.PI;
    dist = dist * 60 * 1.1515;
    if (unit == "K") {
        dist = dist * 1.609344
    }
    if (unit == "N") {
        dist = dist * 0.8684
    }
    return dist;
}

function displayPosition(position) {

    document.getElementById("lat").value = position.coords.latitude;
    document.getElementById("long").value = position.coords.longitude;

    lat = position.coords.latitude;
    lng = position.coords.longitude;

    pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

    var options = {
        zoom: 18
        , disableDefaultUI: true
        , streetViewControl: false
        , center: pos
        , mapTypeId: google.maps.MapTypeId.ROADMAP
    , };


    var x = document.getElementById("map");
    x.innerHTML = "";


    var map = new google.maps.Map(document.getElementById("map"), options);
    geocodeLatLng(geocoder, map);



    //Add listener to detect autocomplete selection
    google.maps.event.addListener(autocomplete2, 'place_changed', function () {

        place = autocomplete2.getPlace();
        console.log(place);

        var newlatlong = new google.maps.LatLng(place.geometry.location.lat(), place.geometry.location.lng());

        map.setCenter(newlatlong);

        $("#locationfinderdialog").slideUp();

        show_top_ui();

    });





    //Script for getting distance from nearest landmark

    var service1 = new google.maps.places.PlacesService(map);
    service1.nearbySearch({
        location: pos
        , radius: 100
        , type: ['point_of_interest']
    , }, callback);
    var distanceFromPlace;

    function callback(results, status) {
        document.getElementById('list_of_nearby_places').innerHTML = "";
        $.each(results, function (index, value) {
            
            placeLat = results[index].geometry.location.lat();
            placeLng = results[index].geometry.location.lng();
            
            distanceFromPlaceInKm = distance(lat, lng, placeLat, placeLng, 'k');
            
            distanceFromPlace = "<option value='" + Number((distanceFromPlaceInKm * 1000).toFixed(1)) + "  " + results[index].name + "'>" + results[index].name + " (" + Number((distanceFromPlaceInKm * 1000).toFixed(1)) + ")</option>";
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
    p1 = pos.lat();
    p2 = pos.lng();

    document.getElementById("locationfield").style.display = "block";
    document.getElementById("locationfieldholder").style.display = "block";
    document.getElementById("inlocationfield").style.display = "block";

    document.getElementById("loading_map_indicator").style.display = "none";
    document.getElementById("loading_map_indicator").className = "lmp_hidden";

    a();
    //moveMarker( map, marker, position.coords.latitude,position.coords.longitude);
    var count = 0;
    var markers = {};
    var save_latLng = {};
    var save_image = {};
    var iconimage1 = {};
    var calc_angle = 0;
    var dist_accuracy = [];
    var accuracy_tracker = {};
    var speed = 50;
    var delay = 100;
    var timerHandle = null;
    var step = 50; // 5; // metres
    var tick = 100; // milliseconds

    var lat;
    var lng;
    var loc;
    var flightPath = [];
    var polyline = null;

    function animateCircle(line) {
        var count = 0;
        window.setInterval(function () {
            count = (count + 1) % 200;

            var icons = line.get('icons');
            icons[0].offset = (count / 2) + '%';
            line.set('icons', icons);
        }, 200);

    }

    function set_position(angle2, taxi_id, taxiDatas) {
        imgUrl = replaceImage(taxiDatas[taxi_id].lng, taxiDatas[taxi_id].previous_lng, taxiDatas[taxi_id].lat, taxiDatas[taxi_id].previous_lat, angle2, taxi_id);
        var iconimage1 = {
            url: imgUrl, // url
            scaledSize: new google.maps.Size(60, 60), // scaled size
            origin: new google.maps.Point(0, 0), // origin
            anchor: new google.maps.Point(30, 30), // anchor
        };
        var taxi_marker = markers[taxi_id];
        taxi_marker.setIcon(iconimage1);
        var latlng = new google.maps.LatLng(taxiDatas[taxi_id].previous_lat, taxiDatas[taxi_id].previous_lng);
        taxi_marker.setPosition(latlng);
    }

    var numDeltas = 100;
    var delay = 10;

    function calculateAndDisplayRoute(directionsService, directionsDisplay, taxi_id) {
        directionsService.route({
            origin: markers[taxi_id].getPosition(), // 
            destination: marker.getPosition(), // 
            travelMode: google.maps.TravelMode.DRIVING
        }, function (response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(response);
            } else {
                window.alert('Directions request failed due to ' + status);
            }
        });
    }


    var infobubble = new InfoBubble({
        map: map
        , position: new google.maps.LatLng(-32.0, 149.0)
        , shadowStyle: 1
        , padding: 5
        , minHeight: 48
        , color: '#ffffff'
        , backgroundColor: '#3f9eb9'
        , borderRadius: 5
        , arrowSize: 10
        , borderWidth: 1
        , borderColor: '#3f9eb9'
        , disableAutoPan: true
        , hideCloseButton: false
        , arrowPosition: 30
        , backgroundClassName: 'transparent'
        , arrowStyle: 2
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
    var l = 0;

    function angleCalculation(lng, previous_lng, lat, previous_lat, angle2) {
        var x = Math.sin(lng - previous_lng) * Math.cos(lat);
        var y = Math.cos(previous_lat) * Math.sin(lat) -
            Math.sin(previous_lat) * Math.cos(lat) * Math.cos(lng - previous_lng);
        angle2 = Math.atan2(x, y) * (180 / Math.PI);
        angle2 = Math.floor(angle2);
        angle2 = Math.round(angle2 / 10) * 10;
        if (angle2 >= 360) {
            angle2 = angle2 - 360;
            imgUrl = "taxi_icons/taxi_" + angle2 + ".svg";
        } else if (angle2 > 0 && angle2 < 360) {
            imgUrl = "taxi_icons/taxi_" + angle2 + ".svg";
        } else {
            angle2 += 360;
            imgUrl = "taxi_icons/taxi_" + angle2 + ".svg";
        }
        return imgUrl;
    }

    function replaceImage(lng, previous_lng, lat, previous_lat, angle2, taxi_id) {
        imgUrl = angleCalculation(lng, previous_lng, lat, previous_lat, angle2);
        return imgUrl;
    }

    function splitValues(nextSegment) {
        var regExp = /\(([^)]+)\)/;
        var matches = regExp.exec(nextSegment);
        return matches[1].split(",");
    }

    function moveTaxi(taxi_id, list, taxiDatas) {
        if (list[window.move_count - 1] != undefined) {
            taxiDatas[taxi_id].lng = list[window.move_count][1];
            taxiDatas[taxi_id].previous_lng = list[window.move_count - 1][1];
            taxiDatas[taxi_id].lat = list[window.move_count][0];
            taxiDatas[taxi_id].previous_lat = list[window.move_count - 1][0];
            set_position(angle2, taxi_id, taxiDatas);
        } else {
            taxiDatas[taxi_id].lng = list[window.move_count][1];
            taxiDatas[taxi_id].lat = list[window.move_count][0];
            set_position(angle2, taxi_id, taxiDatas);
        }
        if (window.move_count < (list.length - 1)) {
            window.move_count += 1;
            setTimeout(function () {
                moveTaxi(taxi_id, list, taxiDatas);
            }, 100);
        }
    }

    function findPolylineCoords(legs, polyline_array, imgUrl, taxi_id, angle2, bounds, taxiDatas) {
        window.polyline_array = [];
        for (i = 0; i < legs.length; i++) {
            var steps = legs[i].steps;
            for (j = 0; j < steps.length; j++) {
                var nextSegment = steps[j].path;
                for (k = 0; k < nextSegment.length; k++) {
                    window.polyline_array.push(splitValues(nextSegment[k]));
                    bounds.extend(nextSegment[k]);
                }
            }
        }
        window.move_count = 0;
        moveTaxi(taxi_id, window.polyline_array, taxiDatas);
    }

    function callDirectionApi(taxi_id, angle2, imgUrl, taxiDatas) {
        taxiDatas[taxi_id].previous_lat = markers[taxi_id].getPosition().lat();
        taxiDatas[taxi_id].previous_lng = markers[taxi_id].getPosition().lng();
        window.polyline_array = [];

        //Direction service api call to find the route and steps of coordinates between starting and destination point
        directionsService.route({
            origin: new google.maps.LatLng(taxiDatas[taxi_id].previous_lat, taxiDatas[taxi_id].previous_lng)
            , destination: new google.maps.LatLng(taxiDatas[taxi_id].lat, taxiDatas[taxi_id].lng)
            , waypoints: [{
                stopover: false
                , location: new google.maps.LatLng(taxiDatas[taxi_id].lat, taxiDatas[taxi_id].lng)
    }]
            , travelMode: google.maps.TravelMode.DRIVING
        }, function (response, status) {
            if (status === google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(response);
                var bounds = new google.maps.LatLngBounds();
                var legs = response.routes[0].legs;
                window.move_count = 0;
                findPolylineCoords(legs, window.polyline_array, imgUrl, taxi_id, angle2, bounds, taxiDatas);
            }
        });
    }

    window.real_time_data = [];

    function a() {
        var lookup = [];
        $.get("https://250taxi.com/db/journey/online_v2.php", function (data) {
            if (data != "[]") {
                var array = JSON.parse(data);
                window.real_time_data.push(array);
                var latprev = lat;
                var lngprev = lng;
                var flightPlanCoordinates;
                var counter = 0;
                /*************************** */
                array.forEach(function (entry) {
                    var imgUrl;
                    var angle = 0;
                    var l = entry;
                    var loc = l.split(",");
                    var dist;
                    var accurate_coords;

                    lat = loc[0];
                    lng = loc[1];
                    status = loc[2];
                    taxi_id = loc[3];
                    accuracy = loc[4];
                    driverName = loc[5];
                    driverSurname = loc[6];
                    var taxiDatas = {};
                    taxiDatas[taxi_id] = {
                        "lat": lat
                        , "lng": lng
                    };
                    if (typeof markers[taxi_id] !== 'undefined' && status == "online") {
                        callDirectionApi(taxi_id, angle2, imgUrl, taxiDatas);
                    }

                    if (typeof markers[taxi_id] === 'undefined' && status == "online") {
                        var pos = new google.maps.LatLng(lat, lng);
                        imgUrl = "taxi_icons/taxi_" + angle + ".svg";
                        var iconimage1 = {
                            url: imgUrl, // url
                            scaledSize: new google.maps.Size(60, 60), // scaled size
                            origin: new google.maps.Point(0, 0), // origin
                            anchor: new google.maps.Point(30, 30), // anchor
                        };
                        markers[taxi_id] = new google.maps.Marker({
                            position: pos
                            , map: map
                            , draggable: false
                            , icon: iconimage1
                            , id: taxi_id
                        });
                    } else if (typeof markers[taxi_id] !== 'undefined' && status == "offline") {
                        markers[taxi_id].setMap(null);
                        delete markers[taxi_id];
                    }
                    /**********************/
                    if (typeof markers[taxi_id] !== 'undefined') {
                        var arg;
                        var contentString = '<div style="color:white;">&nbsp;<b>' + driverName + '</b><IMG BORDER="0" ALIGN="Left" WIDTH="40" SRC="https://www.250taxi.com/driverpics/' + taxi_id + '.jpg" onError="this.src = \'https://www.250taxi.com/app/no-user-image.gif\'"></div>';
                        var currentmarker = markers[taxi_id];
                        google.maps.event.addListener(currentmarker, 'click', (function (currentmarker, arg) {
                            return function () {
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

    // Start map updater
    map_updater = setInterval(a, 20000);

    google.maps.event.addListener(map, 'dragstart', function (event) {
        document.getElementById("user_pin_eta").style.width = "0px";
        document.getElementById("user_pin_eta").style.height = "0px";
        document.getElementById("user_pin_eta").style.marginLeft = "25px";
        document.getElementById("user_pin_eta").style.marginTop = "10px";
        document.getElementById("user_pin_eta").style.zIndex = "9";
        // setTimeout(function() {
        // document.getElementById("user_pin_eta").style.opacity = "0";          
        // },1000);

        $("#eta").hide();
        $("#eta_min").hide();
        $("#dro").hide();

    });

    google.maps.event.addListener(map, 'dragend', function (event) {

        taxis_online_info_load();

        document.getElementById("user_pin_eta").style.width = "160px";
        document.getElementById("user_pin_eta").style.height = "32px";
        document.getElementById("user_pin_eta").style.marginTop = "-4px";
        document.getElementById("user_pin_eta").style.marginLeft = "-55px";
        document.getElementById("user_pin_eta").style.zIndex = "11";
        // document.getElementById("user_pin_eta").style.opacity = "1";

        $("#eta").fadeIn();
        $("#eta_min").fadeIn();
        $("#dro").fadeIn("slow");

        var c = map.getCenter();

        var clat = c.lat();
        var clng = c.lng();

        console.log("user center clat:");
        console.log(clat);
        console.log("user center clng:");
        console.log(clng);

        document.getElementById("lat").value = clat;
        document.getElementById("long").value = clng;

        geocodeLatLng(geocoder, map);

    });

    // get coordinates from marker?
    google.maps.event.addListener(marker, 'dragend', function (evt) {
        // document.getElementById('current').innerHTML = '<p>Marker dropped: Current Lat: ' +         evt.latLng.lat().toFixed(3) + ' Current Lng: ' + evt.latLng.lng().toFixed(3) + '</p>';

        pos = new google.maps.LatLng(evt.latLng.lat().toFixed(3), evt.latLng.lng().toFixed(3));

        // alert('Marker dropped: Current Lat: '+evt.latLng.lat().toFixed(3)+' Current Lng: '+evt.latLng.lng().toFixed(3)+' Pos: '+pos+'');

        geocodeLatLng(geocoder, map);

    });

    var contentString = "<b>Timestamp:</b> " + parseTimestamp(position.timestamp) + "<br/><b>User location:</b> lat " + position.coords.latitude + ", long " + position.coords.longitude + ", accuracy " + position.coords.accuracy;
    // Remove the current infoWindow, if there is one
    //console.log(position.coords.accuracy);

    if (typeof (infoWindow) != "undefined") infoWindow.setMap(null);
    infowindow = new google.maps.InfoWindow({
        content: contentString
    });

    // google.maps.event.addListener(marker, 'click', function() {
    //	infowindow.open(map,marker);
    // });

}

function moveMarker(map, marker, lat, lng) {

    //delayed so you can see it move
    setTimeout(function () {

        marker.setPosition(new google.maps.LatLng(lat - 0.10, lng - 0.10));
        map.panTo(new google.maps.LatLng(lat - 0.10, lng - 0.10));

    }, 500);

};

function displayError(error) {
    var errors = {
        1: 'Permission denied\n\nPlease allow 250 Taxi to locate you. You can change this in your browsers settings.'
        , 2: 'Position unavailable. 250TAXI was not able to find your current location.'
        , 3: 'Request timeout. It took too long to locate you. Please try again.'
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

    geocoder.geocode({
        'location': map.getCenter()
    }, function (results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
            if (results[1]) {

                // infowindow.setContent(results[1].formatted_address);
                // infowindow.open(map, marker);

                document.getElementById('inlocationfield').value = results[0].formatted_address;

                var lat = results[0].geometry.location.lat();
                var lng = results[0].geometry.location.lng();

                localStorage.setItem("pickup_lat", lat);
                localStorage.setItem("pickup_lng", lng);

                position = new google.maps.LatLng(lat, lng);

                //Script for getting distance between the nearest landmark and the user current location

                var place_service = new google.maps.places.PlacesService(map);
                place_service.nearbySearch({
                    location: position
                    , radius: 100
                    , type: ['point_of_interest']
                , }, getPlace);

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
                    $.each(results, function (index, value) {
                        //alert( index + ": " + value );

                        placeLat = results[index].geometry.location.lat();
                        placeLng = results[index].geometry.location.lng();
                        
                        distanceFromPlaceInKm = distance(lat, lng, placeLat, placeLng, 'k');
                        
                        distanceFromPlace = "<option value='" + results[index].name + " (" + Number((distanceFromPlaceInKm * 1000).toFixed(1)) + ")'>" + results[index].name + " (" + Number((distanceFromPlaceInKm * 1000).toFixed(1)) + " Metres)</option>";
                        
                        // console.log(distanceFromPlace);	
                        
                        $('#list_of_nearby_places').append(distanceFromPlace);
                        //console.log(currentLoc);
                        
                    });
                }

                // pickup = results[0].formatted_address;
                
                var pickup = $("#inlocationfield").val();
                localStorage.setItem("pickup", pickup);
                console.log("Pickup:" + pickup);
                
            } else {
                // window.alert('No results found');
            }
        } else {
            // window.alert('Geocoder failed due to: ' + status);
        }
    });
}

function gofullscreen() {
    var elem = document.getElementById('pages');
    elem.webkitRequestFullScreen();
}

jQuery(document).ready(function ($) {

    localStorage.setItem('activity', 'searching_address');

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

    $('#searchbyaddress_back').click(function () {
        $("#locationfinderdialog").slideUp();
        show_top_ui();
    });


    $('.toggle-menu').jPushMenu();

    document.getElementById("loadingindicator").className = "animated fadeOut";
    setTimeout(function () {
        document.getElementById("loadingindicator").style.display = "none";
    }, 2000);

});


function hi() {

    // Update chat window

    chat_enabled = localStorage.getItem("chat_enabled");

    // Check if chat has been started

    if (chat_enabled == "Yes") {
        driverid = localStorage.getItem("pickdriver_id");
        clientid = localStorage.getItem("userid");

        $("#chat_load_messages").load("https://250taxi.com/db/journey/chat.php?task=show_messages&driverid=" + driverid + "&clientid=" + clientid + "", function (data) {

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


                $.get("https://250taxi.com/db/journey/chat.php?task=clear_driver&driverid=" + driverid + "&clientid=" + clientid + "", function (data) {
                    chataudio.play();
                });



            }

        });
    }

    // Report location

    var status_lat = document.getElementById('lat').value;
    var status_long = document.getElementById('long').value;
    var status_userid = localStorage.getItem('userid');
    var status_activity = localStorage.getItem('activity');

    var battery = navigator.battery || navigator.mozBattery;
    if (battery) {
        // battery status for firefox 
        var device_battery = (battery.level * 100);
        localStorage.setItem('device_battery', device_battery);
    } else if (navigator.getBattery) {
        //battery status for chrome
        navigator.getBattery().then(function (battery) {
            var device_battery = (battery.level * 100);
            localStorage.setItem('device_battery', device_battery);
        });
    }

    var status_battery = localStorage.getItem('device_battery');
    var pickup = localStorage.getItem("pickup");

    $.get("https://250taxi.com/db/status_user_v2.php", {
        status_lat: status_lat
        , status_long: status_long
        , status_userid: status_userid
        , status_activity: status_activity
        , status_battery: status_battery
    }).done(function (data) {

        // console.log("Status: " + data);

        document.getElementById("server_com").innerHTML = data;

        // check activity and show messages to client

        var activity = localStorage.getItem("activity");

        // if (activity == "searching_address" || activity == "driver_selected" || activity == "driver_has_arrived") {
        server_status_check = document.getElementById("server_status").innerHTML;
        server_message_check = document.getElementById("server_message").innerHTML;

        if (server_message_check > 0) {

            var userid = localStorage.getItem("userid");

            $.get("https://250taxi.com/db/message.php?&task=confirm&userid=" + userid + "&messageid=" + server_message_check + "", function (responsetext) {

                // console.log("Reset notification: "+responsetext+"");

                if (responsetext.includes("restart")) {
                    setTimeout(function () {
                        location.reload();
                    }, 3000);
                }

                show_message(responsetext);

            });

        }

        // console.log("Server Status: " + server_status_check);

        if (server_status_check == "accepted") {
            status_accepted();
        }
        if (server_status_check == "summary") {
            status_summary();
        }
        if (server_status_check == "driver_assigned") {
            driver_assigned();
        }

        //  }

    });
}

$(document).ready(function () {

    // Start Intervall
    setInterval(hi, 5000);
    hi();

});

function declined() {

    var pickdriver_id = localStorage.getItem("pickdriver_id");
    var userid = localStorage.getItem("userid");

    localStorage.setItem('toast', 'The driver you have selected is busy at the moment, kindly choose another driver.');
    toast();

    $.get("https://250taxi.com/db/partner/taxi_comlink_journey_v3.php?task=declined&userid=" + userid + "", function (data) {
        setTimeout(function () {
            showindicator();
        }, 5000);
        setTimeout(function () {
            alert("The driver you have selected is busy at the moment, kindly choose another driver.");
            location.reload();
        }, 6000);
    });

}

function taxis_online_info_load() {

    var lat = localStorage.getItem("pickup_lat");
    var long = localStorage.getItem("pickup_lng");

    $.get("https://250taxi.com/db/partner/taxi_drivers_online_v2.php?lat=" + lat + "&long=" + long + "", function (data) {

        var taxi_drivers_online_data = data.split(",");

        var drivers_online = taxi_drivers_online_data[0];
        var eta = taxi_drivers_online_data[1];
        
        if (drivers_online == "0") {
            var content = "<div id='dro'>No drivers</div>";  
        }
        else if (drivers_online == "1") {
            var content = "<div id='eta'>" + eta + "</div><div id='eta_min'>MIN</div><div id='dro'>" + drivers_online + " driver  online</div>";
        }
        else {
           var content = "<div id='eta'>" + eta + "</div><div id='eta_min'>MIN</div><div id='dro'>" + drivers_online + " drivers online</div>";  
        }

        $("#user_pin_eta").html(content);

        mlicheck();

    });

}

$(document).ready(function () {

    taxis_online_info_load();

    $("#taxis_online_info").click(function () {
        // document.getElementById("taxis_online_info").style.display = "none";
    });

    var taxis_online_info = setInterval(taxis_online_info_load, 30000);

    var voice_enabled = localStorage.getItem("voice_enabled");
    if (voice_enabled == "On") {
        $('#audio_choice_onoffswitch').prop('checked', true);
    }

    $("#audio_choice").click(function () {
        var voice_enabled = document.getElementById('audio_choice_onoffswitch').checked;

        if (voice_enabled == false) {
            localStorage.setItem("voice_enabled", "Off");
        }
        if (voice_enabled == true) {
            localStorage.setItem("voice_enabled", "On");
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
    var userid = localStorage.getItem("userid");

    var cancel_reason = localStorage.getItem("cancel_reason");


    var userid = localStorage.getItem('userid');
    var driverid = localStorage.getItem("pickdriver_id");
    localStorage.setItem("logupdate", "" + userid + "*" + driverid + "*request cancelled*User" + userid + " cancelled journey with Driver" + driverid + " - Reason: " + cancel_reason + "");
    logupdate_v2();




    if (cancel_reason == "other") {
        cancel_reason = prompt("Please let the driver know why you cancel", "");
    }

    $.get("https://250taxi.com/db/partner/taxi_comlink_journey.php?task=cancel&userid=" + userid + "&pickdriver_id=" + pickdriver_id + "&cancel_reason=" + cancel_reason + "", function (data) {
        location.reload();
    });

}

function logout() {

    swal({
        title: ""
        , text: "Are you sure you want to sign out?"
        , type: ""
        , showCancelButton: true
        , confirmButtonColor: "#DD6B55"
        , confirmButtonText: "Yes"
        , closeOnConfirm: true
    }, function () {

        showindicator();

        localStorage.clear();
        sessionStorage.clear();

        setTimeout(function () {
            location.replace('index.html');
        }, 15000);

    });

}

$(document).ready(function () {

    if ((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i))) {
        console.log("We detected you are using an iPhone");
    }

    var overlay_shown = localStorage.getItem("overlay_shown");

    if (overlay_shown == "Yes") {
        document.getElementById("overlay").style.display = "none";
    }
    if (overlay_shown !== "Yes") {
        document.getElementById("overlay").style.display = "block";
    }

    $("#overlay").click(function () {
        localStorage.setItem("overlay_shown", "Yes");
        $("#overlay").fadeOut("slow", function () {

        });
    });

    $("#locationfield").click(function () {

        hide_top_ui();

        $("#locationfinderdialog").slideDown("slow", function () {
            $("#searchbyaddress").focus();
        });

    });

});

function hide_top_ui() {
    $("#locationbutton").hide();
    $("#locationfieldholder").hide();
    $("#menubutton").hide();
    $("#menubtn_hitzone").hide();
}

function show_top_ui() {
    $("#locationbutton").show();
    $("#locationfieldholder").show();
    $("#menubutton").show();
    $("#menubtn_hitzone").show();
}

function codeAddress() {

    var address = document.getElementById('searchbyaddress').value;
    var addresslength = address.length;

    if (addresslength > 2) {
        // document.getElementById("locationfinderdialog").style.display = "block";
        $("#locationfinderdialog").slideUp("slow", function () {});
    } else {

        swal("", "Please enter a search term!", "");
        return;

    }

    document.getElementById('inlocationfield').value = address;

    localStorage.setItem("pickup", address);

    geocoder.geocode({
        'address': address
    }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            pos = results[0].geometry.location;

            console.log(results[0]);

            swal("", "" + pos + "", "");

            pos2box = String(pos);
            pos2box = pos2box.split(',', 2);

            var search_lat = pos2box[0];
            var search_lat = search_lat.slice(1);

            var search_long = pos2box[1];
            var search_long = search_long.slice(1);
            var search_long = search_long.substring(0, search_long.length - 1);

            document.getElementById("lat").value = search_lat;
            document.getElementById("long").value = search_long;

            position = {
                coords: {
                    latitude: search_lat
                    , longitude: search_long
                }
            };
            displayPosition(position);
        }
    });
}