function journey_start_map() {
    journey_update_map();
    journey_updater = setInterval(function(){ 
        journey_update_map();
    }, 15000);
}
    
function journey_update_map() {
    
var driver_passenger_calculated_distance = document.getElementById('driver_passenger_calculated_distance').innerHTML;

driver_passenger_calculated_distance = parseInt(driver_passenger_calculated_distance);

if (driver_passenger_calculated_distance < 0.3) {
    
    var activity = localStorage.getItem('activity');
    
    if (activity == 'driver_has_accepted') {
    localStorage.setItem('activity','driver_has_arrived');

    var userid = localStorage.getItem('userid');
        
$.get( "http://250taxi.com/db/partner/taxi_comlink_journey.php?task=accepted&passenger_id="+userid+"",  function( data ) {

});
        
    var pickdriver_name = localStorage.getItem("pickdriver_name");
        
    var voice_enabled = localStorage.getItem("voice_enabled");
    if (voice_enabled == "On") {responsiveVoice.speak("Your driver "+pickdriver_name+" has arrived!");}
        
    document.getElementById('journey_status_dialog').style.display = "block";
    document.getElementById('journey_status_dialog').className = "animated fadeIn jd_yellow"
    document.getElementById('journey_status_dialog_window').className = "sdbox animated fadeInUp"
    document.getElementById('journey_status_dialog_title').innerHTML = "Driver has arrived";
    document.getElementById('journey_status_dialog_content').innerHTML = "<div>Do you have boarded the taxi?</div><br><div class='waves-effect waves-light jd_button' onclick='setTimeout(function(){ journey_has_boarded(); }, 1000);'>Yes</div><div class='waves-effect waves-light jd_button' onclick='setTimeout(function(){ journey_not_yet_boarded(); }, 1000);'>Not yet</div>";

    }
    
}

latitude = document.getElementById('lat').value;
longitude = document.getElementById('long').value;
    
pickdriver_id = localStorage.getItem("pickdriver_id");
    
$( "#driveroverlay_show_details" ).load( "http://250taxi.com/db/partner/taxi_comlink_driver_details.php?pickdriver_id="+pickdriver_id+"&passenger_lat="+latitude+"&passenger_long="+longitude+"", function() {

});
    
pickdriver_currentgpslat = document.getElementById('pickdriver_currentgpslat').innerHTML;
pickdriver_currentgpslong = document.getElementById('pickdriver_currentgpslong').innerHTML;
    
console.log("pickdriver_currentgpslat:"+pickdriver_currentgpslat+"\npickdriver_currentgpslong:"+pickdriver_currentgpslong+"\nlatitude:"+latitude+"\nlongitude:"+longitude+"");
    
var locations = [
    
['Me', latitude, longitude, 'userpinicon.png'],
['Driver', pickdriver_currentgpslat, pickdriver_currentgpslong, 'journey/journey_marker_driver.png'],

];

var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 13,
      disableDefaultUI: true,
      streetViewControl: false,
      center: new google.maps.LatLng(latitude, longitude),
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      styles: [{ featureType: "poi", elementType: "labels", stylers: [{ visibility: "off" }]}]
    });

    var infowindow = new google.maps.InfoWindow();

    var marker, i;

    for (i = 0; i < locations.length; i++) {
        
var iconimage = {
    url: locations[i][3],
    scaledSize: new google.maps.Size(90, 90), // scaled size
    origin: new google.maps.Point(0,0), // origin
    anchor: new google.maps.Point(43,90) // anchor
};
        
      marker = new google.maps.Marker({
        position: new google.maps.LatLng(locations[i][1], locations[i][2]),
        icon: iconimage,
        map: map
      });

      google.maps.event.addListener(marker, 'click', (function(marker, i) {
        return function() {
          infowindow.setContent(locations[i][0]);
          infowindow.open(map, marker);
        }
      })(marker, i));
    }
}

function journey_has_boarded() {
    
}
function journey_not_yet_boarded() {
    
    localStorage.setItem('activity','not_yet_boarded');
    
    document.getElementById('journey_status_dialog').className = "animated fadeOut";
    setTimeout(function(){
    document.getElementById('journey_status_dialog').style.display = "none";  
    }, 3000);

}