function getfareestimate_close() {
	document.getElementById("getfareestimate").style.display = "none";
	document.getElementById("mydestination").style.display = "block";
	document.getElementById("citynavigator_start").style.display = "block";
}
$(document).ready( function() {
    
$( "#calltaxiui" ).click(function() { 
calltaxigo();
});

});

function taxirequest_pickup_estimate() {
	
document.getElementById("inlocationfield").value =
document.getElementById("taxirequest_pickup_estimate").value;
	
}
function calltaxigo() {
	
document.getElementById("taxirequest_pickup_estimate").value = document.getElementById("inlocationfield").value;
    
localStorage.setItem('activity','destination_screen');
    
$( "#mydetailedlocation" ).fadeOut( "slow", function() {
    
  $( "#calltaxiui" ).fadeOut( "slow", function() {

    $( "#searchdrivers" ).fadeIn( "slow", function() {

var voice_enabled = localStorage.getItem("voice_enabled");
if (voice_enabled == "On") {responsiveVoice.speak("Please choose your destination");}
        
var passenger_lat = document.getElementById("lat").value;
var passenger_long = document.getElementById("long").value;

// console.log(passenger_lat);
// console.log(passenger_long);

$( "#driverlist_scanner" ).load( "http://250taxi.com/db/partner/taxi_scanner.php?passenger_lat="+passenger_lat+"&passenger_long="+passenger_long+"", function() {

});
        getdriverslist_updater = setInterval(getdriverslist, 15000);
});
});
});
}   

function searchdrivers_x() {
    
document.getElementById("citynavigator").style.display = "none";
document.getElementById("searchdrivers").style.display = "none";
document.getElementById("driverlist").style.display = "none";

document.getElementById("citynavigator_start").style.display = "block";
document.getElementById("mydestination").style.display = "block";

$( "#calltaxiui" ).fadeIn( "slow", function() {});

}
function getdriverslist() {
    
$( "#taxis_online_info" ).fadeOut( "slow", function() {});
    
var passenger_lat = document.getElementById("lat").value;
var passenger_long = document.getElementById("long").value;

$( "#driverlist_scanner" ).load( "http://250taxi.com/db/partner/taxi_scanner.php?passenger_lat="+passenger_lat+"&passenger_long="+passenger_long+"", function() {
    
});
}
function getdriversskipdestination() {
    
localStorage.setItem('activity','driver_list');
    
localStorage.setItem("destination","Not specified");
localStorage.setItem("destination_type","user_input");
    
document.getElementById("mydestination").style.display = "none";
document.getElementById("citynavigator_start").style.display = "none";
    
  $( "#driverlist" ).fadeIn( "slow", function() {     
        });   
    
}
function getdrivers() {
	
document.getElementById("getfareestimate").style.display = "none";
    
localStorage.setItem('activity','driver_list');

var taxirequest_destination = document.getElementById('taxirequest_destination').value;

var taxirequest_destination = taxirequest_destination.split(', Kigali')[0]+'';

localStorage.setItem("destination",taxirequest_destination);
localStorage.setItem("taxirequest_destination",taxirequest_destination);
    
var taxirequest_destination_length = taxirequest_destination.length;
    
if (taxirequest_destination_length > 2) {
    
var voice_enabled = localStorage.getItem("voice_enabled");
if (voice_enabled == "On") {responsiveVoice.speak("Please choose a driver to take you to "+taxirequest_destination+"");}
    
localStorage.setItem("destination",taxirequest_destination);
localStorage.setItem("destination_type","user_input");
    
document.getElementById("mydestination").style.display = "none";
document.getElementById("citynavigator_start").style.display = "none";

$( "#driverlist" ).fadeIn( "slow", function() {});

}
else {
    alert("Please enter a destination!");
    return;
}
   
}













function citynavigator() {
    
localStorage.setItem('activity','city_navigator');
    
$( "#citynavigator_category option:selected" ).text();
    
var passenger_lat = document.getElementById("lat").value;
var passenger_long = document.getElementById("long").value;
    
$( "#citynavigatorlist" ).load( "http://250taxi.com/db/partner/city_navigator.php?passenger_lat="+passenger_lat+"&passenger_long="+passenger_long+"", function() {
    
$('#citynavigator_category').find('option:eq(0)').prop('selected', true);
    
    $( ".religious" ).wrapAll( "<div class='drawer Religious'>");
    $( ".shopping" ).wrapAll( "<div class='drawer Shopping'>");
    $( ".hotels" ).wrapAll( "<div class='drawer Hotels'>");
    $( ".restaurants" ).wrapAll( "<div class='drawer Restaurants'>");
    $( ".police" ).wrapAll( "<div class='drawer Police'>");
    $( ".banks" ).wrapAll( "<div class='drawer Banks'>");
    $( ".forex" ).wrapAll( "<div class='drawer Forex'>");
    $( ".insurance" ).wrapAll( "<div class='drawer Insurance'>");
    $( ".petrol" ).wrapAll( "<div class='drawer Petrol'>");
    $( ".schools" ).wrapAll( "<div class='drawer Schools'>");
    $( ".hospitals" ).wrapAll( "<div class='drawer Hospitals'>");
    $( ".pharmacies" ).wrapAll( "<div class='drawer Pharmacies'>");
    $( ".sights" ).wrapAll( "<div class='drawer Sights'>");
    $( ".government" ).wrapAll( "<div class='drawer Government'>");
    $( ".clubs" ).wrapAll( "<div class='drawer Clubs'>");
    
    $( "#citynavigator_category" ).change(function() {
    var citynavigator_category = $( "#citynavigator_category option:selected" ).text();
    // alert (citynavigator_category);
        
    $('.drawer').hide();
    $('.' + citynavigator_category).fadeIn('slow');
});
    
});
    
    document.getElementById("citynavigator_start").style.display = "none";
    document.getElementById("mydestination").style.display = "none";
    
    $( "#citynavigator" ).fadeIn( "slow", function() {});
}


function goplaces() {
    
localStorage.setItem('activity','driver_list');
    
var places_name = localStorage.getItem("places_name");
    
localStorage.setItem("destination",places_name);
localStorage.setItem("destination_type","city_navigator");

document.getElementById("citynavigator").style.display = "none";
$( "#driverlist" ).fadeIn( "slow", function() {
    var activeuser = localStorage.getItem("activeuser");
    
var voice_enabled = localStorage.getItem("voice_enabled");
if (voice_enabled == "On") {responsiveVoice.speak("Choose a driver to take you to "+places_name+"");}
});

}

function pickdriver() {
    
    localStorage.setItem('activity','driver_details');
    
var voice_enabled = localStorage.getItem("voice_enabled");
if (voice_enabled == "On") {responsiveVoice.speak("Press the pick me now button to notify this taxi");}
    
    document.getElementById("driverlist").style.display = "none";
    document.getElementById("menubutton").style.display = "none";
    document.getElementById("locationfieldholder").style.display = "none";
    document.getElementById("locationbutton").style.display = "none";
    document.getElementById("searchdrivers").style.display = "none";
    
    $( "#driveroverlay" ).fadeIn( "slow", function() {
        
        var pickdriver_id = localStorage.getItem("pickdriver_id");
		
		
        
        
$( "#driveroverlay_show_details" ).load( "http://250taxi.com/db/partner/taxi_comlink_driver_details.php?pickdriver_id="+pickdriver_id+"", function() {
journey_start_map();
});
        
        $( "#driveroverlay_journey_start" ).fadeIn( "slow", function() {});
    });
}

function pickdriver_request_start () {
	
	request_timer_start();
	
	document.getElementById("pickdriver_request_timer").style.display = "block";
    
    localStorage.setItem('activity','driver_selected');
    
var driverid = localStorage.getItem("pickdriver_id");
var userid = localStorage.getItem('userid');

localStorage.setItem("logupdate","User <span class='log_userid'>"+userid+"</span> is waiting for driver <span class='log_driverid'>"+driverid+"</span> to accept");logupdate();
    
var voice_enabled = localStorage.getItem("voice_enabled");
if (voice_enabled == "On") {responsiveVoice.speak("Waiting for the driver to accept");}
    
    document.getElementById("driveroverlay_back_to_list").style.display = "none";
    document.getElementById("driveroverlay_journey_start").style.pointerEvents = "none";
    setTimeout(function(){
    document.getElementById("driveroverlay_journey_start").className = "waves-effect waves-dark animated zoomOut";
    }, 700);
    setTimeout(function(){
        document.getElementById("driveroverlay_journey_start").style.display = "none";
        document.getElementById("driveroverlay_journey_cancel").style.display = "block";
        document.getElementById("driveroverlay_journey_cancel").className = "waves-effect waves-dark animated zoomIn"; 
    }, 2000);
    
    var pickdriver_id = localStorage.getItem("pickdriver_id");
    
    if (localStorage.getItem("username") === null) {
        alert("An error occured. Please log in again.")
        logout();
    }
    
    var username = localStorage.getItem("username");
    var destination = localStorage.getItem("destination");
    var destination_type = localStorage.getItem("destination_type");
    
    if (destination_type == "city_navigator") {
    var destination_lat = localStorage.getItem("places_lat");
    var destination_long = localStorage.getItem("places_long");   
    }
    
    // alert(pickdriver_id);
    
	var pickup = localStorage.getItem("pickup");
    
    $.get( "http://250taxi.com/db/partner/taxi_comlink_journey.php?task=start&username="+username+"&pickdriver_id="+pickdriver_id+"&destination="+destination+"&destination_type="+destination_type+"&destination_lat="+destination_lat+"&destination_long="+destination_long+"&pickup="+pickup+"",  function( data ) {
        
    });

setTimeout(function(){    
$("#taxirequest_detailedlocation").focus();  
    
var voice_enabled = localStorage.getItem("voice_enabled");
if (voice_enabled == "On") {responsiveVoice.speak("Tell us more info about where you are"); }
    
    
$( "#mydetailedlocation" ).fadeIn( "slow", function() { 
});
}, 5000);

}
function detailedlocation_complete (){
    
var username = localStorage.getItem("username");
var pickdriver_id = localStorage.getItem("pickdriver_id");
var detailedlocation = document.getElementById("taxirequest_detailedlocation").value;
    
var detailedlocation_length = detailedlocation.length;
    
if (detailedlocation_length > 2) {

$.get( "http://250taxi.com/db/partner/taxi_comlink_journey.php?task=detailedlocation&username="+username+"&pickdriver_id="+pickdriver_id+"&detailedlocation="+detailedlocation+"",  function( data ) {
    
$( "#mydetailedlocation" ).fadeOut( "slow", function() { 

});
    
});
}
else {
    alert('Please describe where you are standing, so the driver can easily locate you.');
}

}
function detailedlocation_complete_skip (){
$( "#mydetailedlocation" ).fadeOut( "slow", function() { 

});
}
function pickdriver_request_cancel () { 
	 document.getElementById("driveroverlay_journey_cancel_dialog").style.display = "block";  
     document.getElementById("pickdriver_request_timer").style.display = "none";    
}
function pickdriver_request_cancel_confirmed () {
    
showindicator();
    
var driverid = localStorage.getItem("pickdriver_id");
var userid = localStorage.getItem('userid');

localStorage.setItem("logupdate","User <span class='log_userid'>"+userid+"</span> cancelled journey with <span class='log_driverid'>"+driverid+"</span>");logupdate();

alert("Request for driver cancelled!");
    
setTimeout(function(){ 
    location.reload();
}, 3000);   

}


































function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10)
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.text(minutes + ":" + seconds);

        if (--timer < 0) {
            // alert("ende");
            // timer = duration;
            document.getElementById("time5min").style.display = "none";
            document.getElementById("instantscreen_customer_care").style.display = "block";   
        }
    }, 1000);
}
function call_customer_care() {
    window.open("tel:+250727500250","_self");
}

function start5mintimer() {

localStorage.setItem('activity','customer_care_waiting');
document.getElementById("instantscreen").style.display = "block";
    
jQuery(function ($) {
    var fiveMinutes = 60 * 0.1,
        display = $('#time5min');
    startTimer(fiveMinutes, display);
});
}