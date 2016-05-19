function request_timer_start() {    

var counter = 120;
itimer = setInterval(function(){
    
$(".second").val(counter).trigger("change");

    counter--;
    if(counter === 0) {
        clearInterval(itimer);
		alert("Timer for this driver expired. Our customer care center is searching for alternative drivers. Please stand by.");
        
        document.getElementById("pickdriver_request_timer").style.display = "none";
    }
}, 1000);

}