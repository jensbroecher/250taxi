$(document).ready( function() {
    
$( "#searchdrivers_x" ).click(function() {
   $( "#searchdrivers" ).fadeOut( "slow", function() {
       $( "#calltaxiui" ).fadeIn( "slow", function() {
        });
    });
});
    
$( "#calltaxiui" ).click(function() {
    
  $( "#calltaxiui" ).fadeOut( "slow", function() {
    $( "#searchdrivers" ).fadeIn( "slow", function() {
    
  });
  });
    
});
    
});