function complete_registration() {

pin = document.getElementById('pin').value;
phone = document.getElementById('phone').value.replace(/^[0]+/g,"");
    
var a = Math.floor(1000 + Math.random() * 9000);
console.log(a);
a = a.toString();
a = a.substring(-2);

email = document.getElementById('email').value;
    
first_name = document.getElementById('first_name').value;
last_name = document.getElementById('last_name').value;
    
localStorage.setItem('first_name',first_name);
localStorage.setItem('last_name',last_name);
    
username = first_name;
username = username.toLowerCase();
localStorage.setItem('username',username);
    
localStorage.setItem('phoneisvalidated','No');storeindb();

}
    
function storeindb() {

var phoneisvalidated = localStorage.getItem('phoneisvalidated');

    $.ajax({
        type: "GET",
        url: "https://250taxi.com/db/registration.php",
       data:       "phone="+phone+"&how_found="+reg_how_found_select+"&task=reg&email="+email+"&phoneisvalidated="+phoneisvalidated+"&gps_lat=&gps_long=&last_name="+last_name+"&first_name="+first_name+"&username="+username+"&address=&country=&city=&operator=&pin="+pin ,
        success: function(html){
            // alert('Registration successful! Welcome to the 250 Taxi experience '+first_name+' '+last_name+', where we connect you with the closest taxi to you. You will receive an E-Mail with your account details. Enjoy your ride!\n\nFor more info call 0783000096.');			
			
			localStorage.setItem("rememberuser", "Yes");
            localStorage.removeItem("hotelcorporate");
            localStorage.setItem("username", username);
            
            localStorage.setItem("logupdate", "0*0*registration*" + first_name + " " + last_name + " completed registration.");
            logupdate_v2();
            
            var randomclientid = Math.floor(Math.random() * 1000000000);
            localStorage.setItem("randomclientid",randomclientid);
            console.log(randomclientid);
			
			var device_model = "iPhone";
			
			$.get("https://250taxi.com/db/check-username-login.php?task=getuserid&username=" + username + "", function(userid) {
				 
			localStorage.setItem("userid", userid);
			
			$.get("https://250taxi.com/db/account/set_randomclientid.php?&userid=" + userid + "&randomclientid=" + randomclientid + "&device_model=" + device_model + "", function(data) {
				
				

            document.location.href = 'gotostart.html';
				
				
				

            });
				 
			 });
	
        }
    });   
}

function viewterms() {
    document.getElementById("viewterms").style.display = "block";
    $( "#viewtermsinside" ).load( "https://250taxi.com/termsandconditions.php" );
}