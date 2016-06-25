function logupdate() {

logevent = localStorage.getItem("logupdate");

$.get( "https://250taxi.com/db/update_log.php?event="+logevent+"", function( logid ) {
console.log("Log Event created:" + logid);
});

}

function logupdate_v2() {

logevent = localStorage.getItem("logupdate");

$.get( "https://250taxi.com/db/update_log_v2.php?event="+logevent+"", function( logid ) {
console.log("Log Event v2 created:" + logid);
});

}