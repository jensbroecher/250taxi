$(document).ready(function() {
    
$( "#mainmenu_help" ).click(function() {

$( "#pagestarget" ).load( "http://250taxi.com/appcontent/help.php", function() {
  $( "#pages" ).fadeIn( "slow", function() {
    // Animation complete
  });
});
  
});
    
});