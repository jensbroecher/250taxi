$(document).ready( function() {
    
$( "#searchdrivers_x" ).click(function() {
   $( "#searchdrivers" ).fadeOut( "slow", function() {
       $( "#calltaxiui" ).fadeIn( "slow", function() {
        });
    });
    
$( "#driverlist" ).fadeOut( "slow", function() {
    $( "#citynavigator_start" ).fadeIn( "slow", function() {});
    $( "#mydestination" ).fadeIn( "slow", function() {});
});
    
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
function citynavigator() {
    alert('City');
}
function getdrivers() {

var taxirequest_destination = document.getElementById('taxirequest_destination').value;
    
localStorage.setItem("taxirequest_destination",taxirequest_destination);
    
var taxirequest_destination_length = taxirequest_destination.length;
    
if (taxirequest_destination_length > 4) {
    
$( "#mydestination" ).fadeOut( "slow", function() {
        $( "#driverlist" ).fadeIn( "slow", function() {
            



            
        });
    });

$( "#citynavigator_start" ).fadeOut( "slow", function() {});

}
else {
    alert("Please enter a destination!");
    return;
}
   
}