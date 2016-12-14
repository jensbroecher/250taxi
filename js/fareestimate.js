function taxirequest_pickup_estimate() {
	
document.getElementById("inlocationfield").value =
document.getElementById("taxirequest_pickup_estimate").value;
	
}
function get_fare_estimate() {
	
	taxirequest_pickup_estimate();
	
	showindicator();
	
	var taxirequest_destination = document.getElementById("taxirequest_destination").value;
	
	localStorage.setItem('destination',taxirequest_destination);
    localStorage.setItem('destination_name',taxirequest_destination);
	
	localStorage.setItem('destination_type','user_input');
	
	localStorage.setItem('activity','fare_estimate');
	
	var pickup_location = document.getElementById("inlocationfield").value;

	taxirequest_destination_length = taxirequest_destination.length;
	
	if (taxirequest_destination_length < 6) {
		swal("","Please enter a destination!","");
		hideindicator();
		return;
	}
	if (taxirequest_destination_length > 6) {
		document.getElementById("getfareestimate").style.display = "block";
		document.getElementById("mydestination").style.display = "none";
		document.getElementById("citynavigator_start").style.display = "none";
	}
	
	
	$.get( "https://250taxi.com/db/journey/gestimate.php?origins="+pickup_location+"&destinations="+taxirequest_destination+"", function( data ) {
		
	hideindicator();

var googledistancexml = data;
	
	xmlDoc = $.parseXML( googledistancexml ),
  	$xml = $( xmlDoc ),
	$title = $xml.find("text");
	
	var xmlout = $title.text();
	var xmlout2 = $title.text();
	
	console.log("XML: " + xmlout);
	
	var newtext = xmlout.substring(xmlout.lastIndexOf("s")+1,xmlout.lastIndexOf("km"));	
	var newtext = newtext.trim();
		
	var newtime = xmlout2.substring(xmlout2.lastIndexOf(">")+1,xmlout2.lastIndexOf("mins"));
	var newtime = newtime.trim();
        
    if (newtext == "") {
        $("#getfareestimate").hide();
        swal("","We could not calculate the fare for this route. Please change pickup or destination locations.","");
    }
	
	localStorage.setItem("gestimatedistance", newtext);
		
	getgooglefareestimate();
 
	console.log("New Distance: " + newtext);
	console.log("New Time: " + newtime);
		
	document.getElementById("getfareestimate_pickup").innerHTML = pickup_location;
        
	document.getElementById("getfareestimate_destination").innerHTML = taxirequest_destination;

    $("#airport_parking_notice").remove();

    if( (taxirequest_destination.indexOf("Airport") !== -1) ||  (pickup_location.indexOf("Airport") !== -1) ) {
        $( "#getfareestimate_distance_holder" ).append( "<div id='airport_parking_notice'><br><b>Please note:</b> Airport parking ticket<br>fee not included.</div>" );
    }
        
	document.getElementById("getfareestimate_distance").innerHTML = "" + newtext + " km - Aprox. " + newtime + " Min.";
        
	
	console.log("Pickup location: "+pickup_location+"\nDestination: "+taxirequest_destination+"\nDistance:  "+newtext+"km\nTime:  "+newtime+" min");
	
});
	
}

function getgooglefareestimate() {
    
var userid = localStorage.getItem("userid");
	
$.get( "https://250taxi.com/db/partner/fare_setting_v2.php?task=&userid="+userid+"", function( fare_setting ) {
    
var fare_setting_db = fare_setting.split("/");

var fare_setting = fare_setting_db[0];
var fare_setting_first_km = fare_setting_db[1];
var fare_setting_currency = fare_setting_db[2];
var fare_price_range = fare_setting_db[3];
    
var fare_setting = parseInt(fare_setting);
var fare_setting_first_km = parseInt(fare_setting_first_km);
var fare_price_range = parseInt(fare_price_range);
	
gestimatedistance = localStorage.getItem("gestimatedistance");
	
// alert("gestimatedistance: " +gestimatedistance);
	
gcostestimate = gestimatedistance * fare_setting + fare_setting_first_km;

// total = Math.ceil(total);
    
// Round up for Rwanda
if (fare_setting_currency == "RWF") {
gcostestimate = Math.ceil(gcostestimate/100)*100;
}

// alert("gcostestimate: " + gcostestimate);
    
if (gcostestimate < 1500) {
    // gcostestimate = 1500;
}
if (isNaN(gcostestimate)) {
    swal("","We could not calculate the fare for this route. Please change pickup or destination locations.","");
    
    document.getElementById("taxirequest_destination").value = "";
    
	getfareestimate_close();
}
    
var gcostestimate_plus1000 = gcostestimate + fare_price_range;
	
document.getElementById("getfareestimate_price").innerHTML = "" + gcostestimate +" - " + gcostestimate_plus1000 +" "+fare_setting_currency+"";
    
localStorage.setItem("destination_fare_estimate","" + gcostestimate +" - " + gcostestimate_plus1000 +" "+fare_setting_currency+"");

localStorage.setItem("destination_distance_estimate",gestimatedistance);

});
	
}