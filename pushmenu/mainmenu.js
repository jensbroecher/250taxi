$(document).ready(function() {
    
$( "#mainmenu_account" ).click(function() {
    
    var hotelcorporate = localStorage.getItem("hotelcorporate");
    
    if (hotelcorporate == "Yes") {
            document.getElementById("account_simple_table").style.display = "none";
            document.getElementById("account_button").style.display = "none";
            document.getElementById("account_details_info").style.display = "none";
    }
    
     $( "#account_overlay" ).fadeIn( "slow", function() {
         
        var username = localStorage.getItem("username");

        username = btoa(username);
         
$.get( "http://250taxi.com/db/account/get_details.php?task=phone&username="+username+"", function( data ) {
document.getElementById("account_phone").innerHTML = data;
});
$.get( "http://250taxi.com/db/account/get_details.php?task=name&username="+username+"", function( data ) {
document.getElementById("account_name").innerHTML = data;
});
$.get( "http://250taxi.com/db/account/get_details.php?task=email&username="+username+"", function( data ) {
document.getElementById("account_email").innerHTML = data;
});
         
document.getElementById("account_username").innerHTML = localStorage.getItem("username");
        
  });
});
    
$( "#mainmenu_services" ).click(function() {
    document.location.href = 'services.html';
});
    
$( "#mainmenu_wallet" ).click(function() {
    $( "#wallet_overlay" ).fadeIn( "slow", function() {
        
var balance_clientid = localStorage.getItem("userid");   
    
$( "#wallet_balance_amount" ).load( "http://250taxi.com/db/balance/get_balance.php?task=get_balance&userid="+balance_clientid+"", function() {
$( "#wallet_balance_currency" ).load( "http://250taxi.com/db/balance/get_balance.php?task=get_currency&userid="+balance_clientid+"", function() {
});
});
        
    });
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