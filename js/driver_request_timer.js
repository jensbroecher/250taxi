function request_timer_start() {    

var counter = 60;
itimer = setInterval(function(){
    
$(".second").val(counter).trigger("change");

    counter--;
    if(counter === 0) {
        clearInterval(itimer);
		alert("We are still searching for drivers near you. Please stand by.");
        
        search_alternatives();
        
        var userid = localStorage.getItem('userid');
        var driverid = localStorage.getItem("pickdriver_id");
        localStorage.setItem("logupdate",""+userid+"*"+driverid+"*timer_expired*Timer expired, searching alternative drivers");logupdate_v2();
        
        document.getElementById("pickdriver_request_timer").style.display = "none";
    }
}, 1000);

}