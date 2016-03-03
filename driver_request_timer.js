function startRequestTimer(duration_request, display_request) {
    var timer_request = duration_request, minutes_request, seconds_request;
    var timer_interval = setInterval(function () {
        minutes_request = parseInt(timer_request / 60, 10)
        seconds_request = parseInt(timer_request % 60, 10);

        minutes_request = minutes_request < 10 ? "0" + minutes_request : minutes_request;
        seconds_request = seconds_request < 10 ? "0" + seconds_request : seconds_request;

        display_request.text(minutes_request + ":" + seconds_request);

        if (--timer_request < 0) {
            document.getElementById("pickdriver_request_timer").style.display = "none";
            console.log("Timer has expired, please cancel request and choose another driver.");
			clearInterval(timer_interval);
        }
    }, 1000);
}
function request_timer_start() {    
jQuery(function ($) {
    var Minutes = 600 * 0.1,
        display_here = $('#pickdriver_request_timer_timer');
    startRequestTimer(Minutes, display_here);
});
}