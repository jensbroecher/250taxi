function summary() {
	alert("Thank you for using 250 Taxi. We hope you enjoyed our service. Please rate your journey to help us improve.");
	document.getElementById("pages").style.display = "block";
	$( "#pagestarget" ).load( "https://250taxi.com/appcontent/client/ratings.php", function() {
	});
}