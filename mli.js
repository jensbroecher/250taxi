function mlicheck() {

    var userid = localStorage.getItem("userid");

    $.get("http://250taxi.com/db/account/get_randomclientid.php?&userid=" + userid + "", function (data) {

        var randomclientid = localStorage.getItem("randomclientid");
        
        if (randomclientid == data) {

        } else {
            console.log("Forced logout");
            localStorage.removeItem("rememberuser");
            localStorage.removeItem("status");
            localStorage.removeItem("activity");
            location.href = "forcedout.html";
        }

    });
}
