function checkNetConnection(){
 jQuery.ajaxSetup({async:true});
 re="";
 r=Math.round(Math.random() * 10000);
 $.get("http://enunua.com/gormahia/on.php",{subins:r},function(d){

 document.getElementById("offline").className = "animated fadeOut";
setTimeout(function(){
 document.getElementById('offline').style.display = 'none';
}, 1000);

 }).error(function(){
  re=false;
  
  document.getElementById("offline").className = "animated fadeIn";
  document.getElementById('offline').style.display = 'block';
  
 });
 return re;
}
	







function showindicator() {
document.getElementById("loadingindicator").className = "animated fadeIn";
document.getElementById("loadingindicator").style.display = "block";
}

function hideindicator() {
document.getElementById("loadingindicator").className = "animated fadeOut";
setTimeout(function(){
	document.getElementById("loadingindicator").style.display = "none";
}, 1000);
}

function letsgo() {
	showindicator();
	setTimeout(function(){
	document.location.href = 'mainmenu.html';
	}, 1500);
}
function logingo() {
	showindicator();
	setTimeout(function(){
	document.location.href = 'login.html';
	}, 1500);
}
function loginforgot() {
	document.getElementById("loginscreenstart").style.display = "none";
	document.getElementById("loginscreenforgot").style.display = "block";
	document.getElementById("loginscreenforgot").className = "animated fadeIn";
}
function loginforgotcancel() {
	document.getElementById("loginscreenstart").style.display = "block";
	document.getElementById("loginscreenforgot").style.display = "none";
	document.getElementById("loginscreenstart").className = "animated fadeIn";
}

$( document ).ready(function() {
    
setInterval(function(){ 
checkNetConnection();
}, 3000);

  function success(position) {
    var latitude  = position.coords.latitude;
    var longitude = position.coords.longitude;
	
	localStorage.setItem('latitude', latitude);
	localStorage.setItem('longitude', longitude);
	
  };

  function error() {
    
  };

navigator.geolocation.getCurrentPosition(success, error);
	
lang = localStorage.getItem('lang');
if(lang == 'eng') {
	$(".eng").removeClass("eng");
}
if(lang == 'fra') {
	$(".fra").removeClass("fra");
}
});

function registermenu() {
	document.getElementById("mainmenu").className = "nicewindow animated fadeOut";
	setTimeout(function(){
	document.getElementById("mainmenu").style.display = "none";
}, 1000);
	document.getElementById('reg_start').style.display = 'block';
}

function gobacktomain() {
	document.getElementById('reg_start').style.display = 'none';
	document.getElementById("mainmenu").style.display = "block";
	document.getElementById("mainmenu").className = "nicewindow animated fadeIn";
}

function gostartreg() {
    var submenutyoe = localStorage.getItem('submenutype');
	document.getElementById('sub_'+submenutyoe+'').style.display = 'none';
    document.getElementById("reg_start").style.display = "block";
}

function reg_step_1_complete() {
    document.getElementById('reg_start').style.display = 'none';
    document.getElementById('reg_company').style.display = 'block';
}
function reg_step_2_complete() {
    document.getElementById('reg_company').style.display = 'none';
    document.getElementById('reg_complete').style.display = 'block';
}
function gobackto_reg_start() {
    document.getElementById('reg_start').style.display = 'block';
    document.getElementById('reg_company').style.display = 'none';
}
function gobackto_reg_company() {
    document.getElementById('reg_company').style.display = 'block';
    document.getElementById('reg_complete').style.display = 'none';
}































function complete_registration() {

lat = localStorage.getItem('latitude');
long = localStorage.getItem('longitude');

pin = document.getElementById('pin').value;
    


phone = document.getElementById('phone').value.replace(/^[0]+/g,"");
countrycode = document.getElementById('countrycode').value;

// alert(phone);
    
phone =''+countrycode+''+phone+'';
    
phonesms = phone.replace(/\+/g, '');
    
// alert(phonesms);
    
var a = Math.floor(1000 + Math.random() * 9000);
console.log(a);
a = a.toString();
a = a.substring(-2);

localStorage.setItem('smskey',a);

document.getElementById("smsgateway").src = "http://imghttp.fortytwotele.com/api/current/send/message.php?username=ubdream&password=Ubdream2016&to="+phonesms+"&from=250%20Taxi&route=G1&message=Welcome%20to%20250%20taxi.%20Your%20activation%20code%20is%20"+a+"";

email = document.getElementById('email').value;
    
first_name = document.getElementById('first_name').value;
last_name = document.getElementById('last_name').value;
    
localStorage.setItem('first_name',first_name);
localStorage.setItem('last_name',last_name);
    
address = document.getElementById('address').value;
    
username = document.getElementById('username').value;
localStorage.setItem('username',username);
console.log(username);
    
country = localStorage.getItem('countrychoice');

console.log(country);

if (country === 'city_drc') {
console.log('Congo');
country = 'Congo';
    
city = $("#city_drc option:selected").text();
}
else if (country === 'city_rwanda') {
console.log('Rwanda');
country = 'Rwanda';

city = $("#city_rwanda option:selected").text();
}
else if (country === 'city_uganda') {
console.log('Uganda');
country = 'Uganda';
    
city = $("#city_uganda option:selected").text();
}
else if (country === 'city_burundi') {
console.log('Burundi');
country = 'Burundi';
    
city = $("#city_burundi option:selected").text();
}
else if (country === 'city_other') {
console.log('Other');
country = 'Other';

city = document.getElementById('city_other').value;
}

// SMS Validation überspringen
// document.getElementById('reg_smsvalidationwindow').style.display = 'block';
// document.getElementById('reg_complete').style.display = 'none';
    
localStorage.setItem('phoneisvalidated','No');showindicator();storeindb();

}

function checksmscode() {
    
smskey = localStorage.getItem('smskey');
smskeyuser = document.getElementById('smscode').value;
    
// alert(smskey);
// alert(smskeyuser);
    
if (smskey == smskeyuser) {
    localStorage.setItem('phoneisvalidated','Yes');
    console.log('SMS code correct.');
    alert('SMS code correct. Thank you for validating your number!');
    storeindb();
    showindicator();
}
else {
    alert('SMS code incorrect, please check your SMS.');
    localStorage.setItem('phoneisvalidated','No');
}
    
phoneisvalidated = localStorage.getItem('phoneisvalidated');
console.log(phoneisvalidated);

}
    
function storeindb() {
    
operator = $('#operator option:selected').val();
// alert(operator);

var phoneisvalidated = localStorage.getItem('phoneisvalidated');
// alert(phoneisvalidatednow);

    $.ajax({
        type: "GET",
        url: "http://250taxi.com/db/registration.php",
        data:       "phone="+phone+"&task=reg&email="+email+"&phoneisvalidated="+phoneisvalidated+"&gps_lat="+lat+"&gps_long="+long+"&last_name="+last_name+"&first_name="+first_name+"&username="+username+"&address="+address+"&country="+country+"&city="+city+"&operator="+operator+"&pin="+pin ,
        success: function(html){
            alert('Registration successful! Welcome to the 250 Taxi experience '+first_name+' '+last_name+', where we connect you with the closest taxi to you. You will receive an E-Mail with your account details. Enjoy your ride!\n\nFor more info call 0783000096.');
            // document.location.href = 'login.html';
			
			
			localStorage.setItem("rememberuser", "Yes");
            localStorage.removeItem("hotelcorporate");
            localStorage.setItem("username", username);
            
            localStorage.setItem("logupdate", "User " + username + " - " + first_name + " " + last_name + "</span> completed registration");
            
            var randomclientid = Math.floor(Math.random() * 1000000000);
            localStorage.setItem("randomclientid",randomclientid);
            console.log(randomclientid);
			
			                                     var battery = navigator.battery || navigator.mozBattery;
			if (battery) {
    // battery status for firefox 
        var device_battery = (battery.level * 100);
    localStorage.setItem("device_battery",device_battery);
			} else if (navigator.getBattery) {
    //battery status for chrome
    navigator.getBattery().then(function(battery) {
        var device_battery = (battery.level * 100);
        localStorage.setItem("device_battery",device_battery);
    });
}
                                    
                             

                                    var device_model = localStorage.getItem("device_model");
                                    var device_platform = localStorage.getItem("device_platform");
                                    var device_version = localStorage.getItem("device_version");
                                    var device_uuid = localStorage.getItem("device_uuid");
                                    var device_battery = localStorage.getItem("device_battery");
			
			 $.get("http://250taxi.com/db/check-username-login.php?task=getuserid&username=" + username + "", function(userid) {
				 
			localStorage.setItem("userid", userid);
			
			$.get("http://250taxi.com/db/account/set_randomclientid.php?&userid=" + userid + "&randomclientid=" + randomclientid + "&device_model=" + device_model + "&device_platform=" + device_platform + "&device_version=" + device_version + "&device_uuid=" + device_uuid + "&device_battery=" + device_battery + "", function(data) {
                                        document.location.href = '../gotostart.html';

            });
				 
			 });
	
        }
    });   
}


function viewterms() {
    document.getElementById("viewterms").style.display = "block";
    $( "#viewtermsinside" ).load( "http://250taxi.com/termsandconditions.php" );
}