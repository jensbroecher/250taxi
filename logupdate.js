function logupdate() {

logevent = localStorage.getItem("logupdate");

$.get( "http://250taxi.com/db/update_log.php?event="+logevent+"", function( logid ) {
console.log("Log Event created:" + logid);
});

}