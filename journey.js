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
    
    $.get( "http://250taxi.com/db/partner/taxi_comlink_journey.php?task=accepted&passenger_id="+userid+"",      function( data ) {});
        
    var pickdriver_name = localStorage.getItem("pickdriver_name");
        
    var voice_enabled = localStorage.getItem("voice_enabled");
    if (voice_enabled == "On") {responsiveVoice.speak("Your driver "+pickdriver_name+" has arrived!");}
        
    document.getElementById('journey_status_dialog').style.display = "block";
    document.getElementById('journey_status_dialog').className = "animated fadeIn jd_yellow"
    document.getElementById('journey_status_dialog_window').className = "sdbox animated fadeInUp"
    document.getElementById('journey_status_dialog_title').innerHTML = "Driver has arrived";
    document.getElementById('journey_status_dialog_content').innerHTML = "<div>Have you boarded the taxi?</div><br><div class='waves-effect waves-light jd_button' onclick='setTimeout(function(){ journey_has_boarded(); }, 1000);'>Yes</div><br><div class='waves-effect waves-light jd_button' onclick='setTimeout(function(){ journey_not_yet_boarded(); }, 1000);'>Not yet</div>";

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

localStorage.setItem('activity','has_boarded');
    
driverid = localStorage.getItem("pickdriver_id");
clientid = localStorage.getItem("userid");
    
localStorage.setItem("logupdate","User <span class='log_userid'>"+clientid+"</span> boarded with driver <span class='log_driverid'>"+driverid+"</span>");logupdate();
    
console.log("Start Journey!"); 
    
$.get( "http://250taxi.com/db/journey/journey_mode.php?task=taxi_boarded&passenger_id="+clientid+"&pickdriver_id="+driverid+"",  function( journey_id ) {
    console.log("Journey ID: " + journey_id);
    localStorage.setItem("journey_id",journey_id);
    journey_start_fare();
}); 
    
}
function journey_not_yet_boarded() {
    
    localStorage.setItem('activity','not_yet_boarded');
    
    document.getElementById('journey_status_dialog').className = "animated fadeOut";
    setTimeout(function(){
    document.getElementById('journey_status_dialog').style.display = "none";  
    }, 3000);
    
    setTimeout(function(){
        show_driver_has_arrived_again();
    }, 60000);

}

function show_driver_has_arrived_again() {

document.getElementById('journey_status_dialog').style.display = "block";
document.getElementById('journey_status_dialog').className = "animated fadeIn"
document.getElementById('journey_status_dialog_window').className = "sdbox animated fadeInUp"
document.getElementById('journey_status_dialog_title').innerHTML = "Boarded yet?";
document.getElementById('journey_status_dialog_content').innerHTML = "<div>Can't find the taxi? You can chat with the driver or give him a call.</div><br><div class='waves-effect waves-light jd_button' onclick='setTimeout(function(){ journey_has_boarded(); }, 1000);'>Yes</div><br><div class='waves-effect waves-light jd_button' onclick='setTimeout(function(){ journey_not_yet_boarded(); }, 1000);'>Not yet</div>";
}

function call() {
    
var userid = localStorage.getItem('userid');
var driverid = localStorage.getItem("pickdriver_id");
var phonenumber = localStorage.getItem("phonenumber");
    
localStorage.setItem("logupdate","User <span class='log_userid'>"+userid+"</span> calls phone  "+phonenumber+" of driver <span class='log_driverid'>"+driverid+"</span>");logupdate();
    
window.open("tel:"+phonenumber+"","_self");
}

$(document).ready(function () {
 
    $( "#chat_message_send_button" ).click(function() {
        chat_send_message();
    });

    $("#chat_message_input").keyup(function (e) {
        if (e.keyCode == 13) {
        chat_send_message();
        }
    });

});

function chat() {
    
localStorage.setItem("chat_window_status","open");
    
var userid = localStorage.getItem('userid');
var driverid = localStorage.getItem("pickdriver_id");
    
localStorage.setItem("logupdate","User <span class='log_userid'>"+userid+"</span> started chatting with  driver <span class='log_driverid'>"+driverid+"</span>");logupdate();
    
    document.getElementById("chat_overlay").className = "animated fadeInUp"
    document.getElementById("chat_overlay").style.display = "block";
}
function close_chat() {
    
localStorage.setItem("chat_window_status","closed");
    
    document.getElementById("chat_overlay").className = "animated fadeOutDown"
    setTimeout(function(){
    document.getElementById("chat_overlay").style.display = "none";
    }, 800);
}

function chat_send_message() {
    var chat_message = document.getElementById("chat_message_input").value;
    
if (/^\s*$/.test(chat_message)) {
    console.log("Only whitespace. Message blocked.");
    var chataudio = new Audio('sound/error.mp3');chataudio.play();
    return;
}

            driverid = localStorage.getItem("pickdriver_id");
            clientid = localStorage.getItem("userid");

            $.get("http://250taxi.com/db/journey/chat.php?task=send_message&driverid=" + driverid + "&clientid=" + clientid + "&message=" + chat_message + "&origin=client", function (data) {
                
            });

            document.getElementById("chat_message_input").value = "";

            $("#chat_load_messages").load("http://250taxi.com/db/journey/chat.php?task=show_messages&driverid=" + driverid + "&clientid=" + clientid + "", function (data) {
               
            });
}

function journey_start_fare() {
   console.log("Let's go!");
    document.getElementById("journey_status_dialog").style.display = "none";
    document.getElementById("driveroverlay_show_details").style.display = "none";
    document.getElementById("journey_accepted_panel").style.display = "none";
    document.getElementById("journey_fare_display").style.display = "block";
    
    document.getElementById("journey_fare_display_destination_target").innerHTML = localStorage.getItem("destination");
    
    var journey_fare_check = setInterval(journey_fare_load, 15000);
    
    journey_mode_map();
}
function journey_fare_load() {
    
var journey_id = localStorage.getItem("journey_id");
var journey_id = "journey_"+journey_id+"";
var journey_id = window.btoa(journey_id);

$("#journey_fare_load").load("http://250taxi.com/db/journey/get_total_distance.php?journey_id=" + journey_id + "", function (data) {

document.getElementById("journey_fare_display_km_count").innerHTML = localStorage.getItem("journey_total_distance");

document.getElementById("journey_fare_display_fare_count").innerHTML = localStorage.getItem("journey_total_cost");

});

}