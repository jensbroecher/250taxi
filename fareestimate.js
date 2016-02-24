function get_fare_estimate() {
	
	showindicator();
	
	var taxirequest_destination = document.getElementById("taxirequest_destination").value;
	
	localStorage.setItem('destination',taxirequest_destination);
	
	localStorage.setItem('destination_type','user_input');
	
	localStorage.setItem('activity','fare_estimate');
	
	var pickup_location = document.getElementById("inlocationfield").value;

	
	taxirequest_destination_length = taxirequest_destination.length;
	
	if (taxirequest_destination_length < 6) {
		alert("Please enter a destination!");
		hideindicator();
		return;
	}
	if (taxirequest_destination_length > 6) {
		document.getElementById("getfareestimate").style.display = "block";
		document.getElementById("mydestination").style.display = "none";
		document.getElementById("citynavigator_start").style.display = "none";
	}
	
	
	$.get( "http://250taxi.com/db/journey/gestimate.php?origins="+pickup_location+"&destinations="+taxirequest_destination+"", function( data ) {
		
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
	
	localStorage.setItem("gestimatedistance", newtext);
		
	getgooglefareestimate();
 
	console.log("New Distance: " + newtext);
	console.log("New Time: " + newtime);
		
	document.getElementById("getfareestimate_pickup").innerHTML = pickup_location;
	document.getElementById("getfareestimate_destination").innerHTML = taxirequest_destination;
	document.getElementById("getfareestimate_distance").innerHTML = newtext;
	document.getElementById("getfareestimate_time").innerHTML = newtime;
		
	console.log("Pickup location: "+pickup_location+"\nDestination: "+taxirequest_destination+"\nDistance:  "+newtext+"km\nTime:  "+newtime+" min");
	
});
	
}

function getgooglefareestimate() {
	
$.get( "http://250taxi.com/db/partner/get_fare_setting.php", function( fare_setting ) {
	
gestimatedistance = localStorage.getItem("gestimatedistance");
	
// alert("gestimatedistance: " +gestimatedistance);
	
gcostestimate = gestimatedistance * fare_setting + 1000;

// total = Math.ceil(total);
gcostestimate = Math.ceil(gcostestimate/100)*100;

// alert("gcostestimate: " + gcostestimate);
    
if (gcostestimate < 1500) {
    gcostestimate = 1500;
}
	
document.getElementById("getfareestimate_price").innerHTML = "" + gcostestimate +" RWF";
	
});
	
}