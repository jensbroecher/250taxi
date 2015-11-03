$(document).ready( function() {
    
$( "#searchdrivers_x" ).click(function() {
    
document.getElementById("citynavigator").style.display = "none";
document.getElementById("searchdrivers").style.display = "none";
document.getElementById("driverlist").style.display = "none";

document.getElementById("citynavigator_start").style.display = "block";
document.getElementById("mydestination").style.display = "block";

$( "#calltaxiui" ).fadeIn( "slow", function() {});

});
    
$( "#calltaxiui" ).click(function() {
    
  $( "#calltaxiui" ).fadeOut( "slow", function() {
    $( "#searchdrivers" ).fadeIn( "slow", function() {
        
var passenger_lat = document.getElementById("lat").value;
var passenger_long = document.getElementById("long").value;

// console.log(passenger_lat);
// console.log(passenger_long);

$( "#driverlist_scanner" ).load( "http://250taxi.com/db/partner/taxi_scanner.php?passenger_lat="+passenger_lat+"&passenger_long="+passenger_long+"", function() {
    
});
        setInterval(getdriverslist, 15000);
  });
  });
    
});
    
});
function getdriverslist() {
    
var passenger_lat = document.getElementById("lat").value;
var passenger_long = document.getElementById("long").value;

$( "#driverlist_scanner" ).load( "http://250taxi.com/db/partner/taxi_scanner.php?passenger_lat="+passenger_lat+"&passenger_long="+passenger_long+"", function() {
    
});
}
function getdriversskipdestination() {
    
document.getElementById("mydestination").style.display = "none";
document.getElementById("citynavigator_start").style.display = "none";
    
  $( "#driverlist" ).fadeIn( "slow", function() {     
        });   
    
}
function getdrivers() {

var taxirequest_destination = document.getElementById('taxirequest_destination').value;
    
localStorage.setItem("taxirequest_destination",taxirequest_destination);
    
var taxirequest_destination_length = taxirequest_destination.length;
    
if (taxirequest_destination_length > 2) {
    
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








