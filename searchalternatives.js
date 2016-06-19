function search_alternatives() {
    
    var userid = localStorage.getItem('userid');
    var pickdriver_id = localStorage.getItem("pickdriver_id");
    
    var pickup_lat = localStorage.getItem('pickup_lat');
    var pickup_lng = localStorage.getItem('pickup_lng');
    
    $.get( "https://250taxi.com/db/requests/taxi_alternatives.php", { 
    pickup_lat: pickup_lat,
    pickup_lng: pickup_lng,
    userid: userid,
    pickdriverid: pickdriver_id
    }).done(function( requestids ) {
        // alert(requestids);
    });
    
}