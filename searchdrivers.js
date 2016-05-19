function getfareestimate_close() {
	document.getElementById("getfareestimate").style.display = "none";
	document.getElementById("mydestination").style.display = "block";
	document.getElementById("citynavigator_start").style.display = "block";
}
$(document).ready( function() {
    
$( "#ride_now_button" ).click(function() {
localStorage.setItem("ride_start","now");
    
document.getElementById("detailedlocation_date_time_button").style.display = "none";
    
$("#taxirequest_detailedlocation").attr("placeholder", "Where are you standing?");
    
document.getElementById("pickup_booking_date").style.display = "none";

console.log("ride_start: now");
mydetailedlocation_show();
});
	
$( "#ride_later_button" ).click(function() {
localStorage.setItem("ride_start","later");
    
document.getElementById("detailedlocation_date_time_button").style.display = "block";
    
$("#taxirequest_detailedlocation").attr("placeholder", "Where will you be standing?");
    
document.getElementById("pickup_booking_date").style.display = "block";
    
console.log("ride_start: later");
mydetailedlocation_show();
});
    
$( "#call_now_button" ).click(function() {
    
showindicator();
    
document.getElementById("call_now_button").style.pointerEvents = "none";
    
console.log("Dial a 250 Taxi");
    
var userid = localStorage.getItem('userid');
    
var voice_enabled = localStorage.getItem("voice_enabled");
if (voice_enabled == "On") {responsiveVoice.speak("Call our customer care to send you a taxi. Please mention reference number 250" + userid+".");}

$.get( "dialataxi/dialataxi.html", function( data ) {
    
    hideindicator();
    
    var insert_node = document.createElement('div');
    insert_node.id = 'pickup_ext_loader';
    
    insert_node.innerHTML = data;
    document.body.appendChild(insert_node);
    
    var userid = localStorage.getItem("userid");
    document.getElementById("dialataxi_reference_number").innerHTML = "250" + userid;
    
    var pickup = localStorage.getItem("pickup");
    document.getElementById("dialataxi_pickup").innerHTML = pickup;
    
});
    
});


});

function close_dialataxi() {
    
    document.getElementById("call_now_button").style.pointerEvents = "all";

    var pickup_ext_loader_closer = document.getElementById("pickup_ext_loader");
    
    document.getElementById("dialataxi").className = "animated fadeOutLeft";
    
    setTimeout(function(){
    document.getElementsByTagName('body')[0].removeChild(pickup_ext_loader_closer);
    }, 1000);

}






function taxirequest_pickup_estimate() {
	
document.getElementById("inlocationfield").value =
document.getElementById("taxirequest_pickup_estimate").value;
	
}
function calltaxigo() {
    
document.getElementById("taxis_online_info").style.display = "block";
	
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

$( "#driverlist_scanner" ).load( "https://250taxi.com/db/partner/taxi_scanner.php?passenger_lat="+passenger_lat+"&passenger_long="+passenger_long+"", function() {

});
        getdriverslist_updater = setInterval(getdriverslist, 15000);
});
});
});
}   

function searchdrivers_x() {
    
document.getElementById("taxis_online_info").style.display = "block";
    
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

$( "#driverlist_scanner" ).load( "https://250taxi.com/db/partner/taxi_scanner.php?passenger_lat="+passenger_lat+"&passenger_long="+passenger_long+"", function() {
    
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
    
localStorage.setItem("destination",taxirequest_destination);
localStorage.setItem("destination_type","user_input");
    
document.getElementById("mydestination").style.display = "none";
document.getElementById("citynavigator_start").style.display = "none";

var ride_start = localStorage.getItem("ride_start");
	
if (ride_start == "now") {
    
alert("Please select a driver from the list to take you to "+taxirequest_destination+". If the driver is not available, we will find a different one for you.");
    
document.getElementById("driverlist").style.display = "block";    
}
if (ride_start == "later") {
confirm_booking();
}

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
    
$( "#citynavigatorlist" ).load( "https://250taxi.com/db/partner/city_navigator.php?passenger_lat="+passenger_lat+"&passenger_long="+passenger_long+"", function() {
    
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
	
var ride_start = localStorage.getItem("ride_start");
	
if (ride_start == "now") {
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
 
if (ride_start == "later") {
    
    confirm_booking();

}

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
		
		
        
        
$( "#driveroverlay_show_details" ).load( "https://250taxi.com/db/partner/taxi_comlink_driver_details.php?pickdriver_id="+pickdriver_id+"", function() {
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
    
localStorage.setItem("logupdate", ""+userid+"*"+driverid+"*request*User"+userid+" requested Driver"+driverid+".");
logupdate_v2();
    
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
    
    $.get( "https://250taxi.com/db/partner/taxi_comlink_journey.php?task=start&username="+username+"&pickdriver_id="+pickdriver_id+"&destination="+destination+"&destination_type="+destination_type+"&destination_lat="+destination_lat+"&destination_long="+destination_long+"&pickup="+pickup+"",  function( data ) {
        
    });

// setTimeout(function(){    
// $("#taxirequest_detailedlocation").focus();  
    
// Moved this to start map
    
// var voice_enabled = localStorage.getItem("voice_enabled");
// if (voice_enabled == "On") {responsiveVoice.speak("Tell us more info about where you are"); }
    
    
// $( "#mydetailedlocation" ).fadeIn( "slow", function() { 
// });
// }, 5000);

}
function detailedlocation_complete (){




    
var detailedlocation_date_time_button_content = document.getElementById("detailedlocation_date_time_button").innerHTML;
    
console.log(detailedlocation_date_time_button_content);
    
    
var ride_start = localStorage.getItem("ride_start");
if (ride_start == "later") {
if (detailedlocation_date_time_button_content == "Set date/time") {
    alert("Please set a pickup date and time.");
    return;
}
}
    
var username = localStorage.getItem("username");
var pickdriver_id = localStorage.getItem("pickdriver_id");
var detailedlocation = document.getElementById("taxirequest_detailedlocation").value;
    
var detailedlocation_length = detailedlocation.length;
    
if (detailedlocation_length > 2) {
    
localStorage.setItem("detailedlocation",detailedlocation);

$.get( "https://250taxi.com/db/partner/taxi_comlink_journey.php?task=detailedlocation&username="+username+"&pickdriver_id="+pickdriver_id+"&detailedlocation="+detailedlocation+"",  function( data ) {
    
calltaxigo();
mydetailedlocation_close ();
    
});
}
else {
    alert('Please describe where you are standing, so the driver can easily locate you.');
    
    setTimeout(function(){
    $("#taxirequest_detailedlocation").focus();
    }, 2000);                   
}

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


function mydetailedlocation_show() {
    
    var ride_start = localStorage.getItem("ride_start");
    
    var voice_enabled = localStorage.getItem("voice_enabled");
if (voice_enabled == "On") {responsiveVoice.speak("Where should we pick you up "+ride_start+"?");}
    
    var mydetailedlocation = document.getElementById("mydetailedlocation");
    var mydetailedlocation_dialog = document.getElementById("mydetailedlocation_dialog");
    
    mydetailedlocation.style.display = "block";
    mydetailedlocation.className = "animated fadeIn";
    mydetailedlocation_dialog.style.height = "300px";
    
    setTimeout(function(){ 
    mydetailedlocation_content.style.display = "block";
    mydetailedlocation_content.className = "animated fadeIn";
    }, 500);
    
    var pickup = localStorage.getItem("pickup");
    
    var pickup = pickup.substring(0, pickup.indexOf(','));
    
    document.getElementById("mydetailedlocation_street").innerHTML = pickup;
}

function mydetailedlocation_close() {
    var mydetailedlocation = document.getElementById("mydetailedlocation");
    var mydetailedlocation_dialog = document.getElementById("mydetailedlocation_dialog");
    var mydetailedlocation_content = document.getElementById("mydetailedlocation_content");
    
    mydetailedlocation_content.className = "animated fadeOut";
    
    mydetailedlocation_content.style.display = "none";
    
    mydetailedlocation_dialog.style.height = "0px";
    
    
    setTimeout(function(){
        mydetailedlocation.className = "animated fadeOut";
    }, 500);
    setTimeout(function(){
         mydetailedlocation.style.display = "none";
        
    }, 1300);

}














function confirm_booking() {
    
showindicator();
    
 var task = "booking";
    var userid = localStorage.getItem("userid");
    var pickup_date_time = document.getElementById("pickup_booking_date").value;
    var street = document.getElementById("inlocationfield").value;
    var landmark = document.getElementById("list_of_nearby_places").value;
    var detailed_location = document.getElementById("taxirequest_detailedlocation").value;
    var destination = localStorage.getItem("destination");
    
    $.get( "https://250taxi.com/db/book_later/book_taxi.php", {
        task: task,
        userid: userid,
        pickup_date_time: pickup_date_time,
        street: street,
        landmark: landmark,
        detailed_location: detailed_location,
        destination: destination
    } ).done(function( data ) {
        
        document.getElementById("searchdrivers").style.display = "none";
        document.getElementById("calltaxiui").style.display = "block";
        alert("We received your booking, customer care is about to call you in a few for a follow up.");
        
        hideindicator(); 
        
  });

}




