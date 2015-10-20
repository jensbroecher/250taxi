$(document).ready(function() {
    
$( "#mainmenu_services" ).click(function() {
    document.location.href = 'services.html';
});
    
$( "#mainmenu_help" ).click(function() {
$( "#pagestarget" ).load( "http://250taxi.com/appcontent/help.php", function() {
  $( "#pages" ).fadeIn( "slow", function() {
    
  });
});
});
    
$( "#mainmenu_becomedriver" ).click(function() {
$( "#pagestarget" ).load( "http://250taxi.com/appcontent/becomedriver.php", function() {
  $( "#pages" ).fadeIn( "slow", function() {
    
  });
});
});
    
$( "#mainmenu_corporate" ).click(function() {
$( "#pagestarget" ).load( "http://250taxi.com/appcontent/corporate.php", function() {
  $( "#pages" ).fadeIn( "slow", function() {
    
  });
});
});
    
$( "#mainmenu_about" ).click(function() {
window.open('https://www.facebook.com/250taxi', '_system');
});
    
});