function complete_social_login() {

    var login_type = localStorage.getItem("login_type");

    if (login_type == "facebook") {
        var sign_in_email = localStorage.getItem("facebook_email");
        var sign_in_name = localStorage.getItem("facebook_name");
    }
    if (login_type == "google") {
        var sign_in_email = localStorage.getItem("google_email");
        var sign_in_name = localStorage.getItem("google_name");
    }

    // Check if account with that E-Mail exists already

    $.get("https://250taxi.com/db/check_user.php?task=check_email&email=" + sign_in_email + "", function (result) {

        console.log("Social Login - E-Mail registered?");
        console.log(result);

        if (result == "account_found") {
            social_login_go();
        }
        if (result == "account_not_found") {
            social_register_go();
        }

    });

}

function social_login_go() {

    var login_type = localStorage.getItem("login_type");

    if (login_type == "facebook") {
        var sign_in_email = localStorage.getItem("facebook_email");
        var sign_in_name = localStorage.getItem("facebook_name");
    }
    if (login_type == "google") {
        var sign_in_email = localStorage.getItem("google_email");
        var sign_in_name = localStorage.getItem("google_name");
    }

    var randomclientid = Math.floor(Math.random() * 1000000000);
    localStorage.setItem("randomclientid", randomclientid);

    var battery = navigator.battery || navigator.mozBattery;
    if (battery) {
        // battery status for firefox 
        var device_battery = (battery.level * 100);
        localStorage.setItem("device_battery", device_battery);
    } else if (navigator.getBattery) {
        //battery status for chrome
        navigator.getBattery().then(function (battery) {
            var device_battery = (battery.level * 100);
            localStorage.setItem("device_battery", device_battery);
        });
    }

    var device_model = localStorage.getItem("device_model");
    var device_platform = localStorage.getItem("device_platform");
    var device_version = localStorage.getItem("device_version");
    var device_uuid = localStorage.getItem("device_uuid");
    var device_battery = localStorage.getItem("device_battery");

    $.get("https://250taxi.com/db/check_user.php?task=getuserid&email=" + sign_in_email + "", function (userid) {

        localStorage.setItem("userid", userid);
        localStorage.setItem("rememberuser", "Yes");

        localStorage.setItem("rememberuser", "Yes");

        localStorage.removeItem("hotelcorporate");

        localStorage.setItem("logupdate", "" + userid + "*0*login*User " + sign_in_email + " (" + userid + ") logged in trough social media.");
        logupdate_v2();

        $.get("https://250taxi.com/db/account/set_randomclientid.php?&userid=" + userid + "&randomclientid=" + randomclientid + "&device_model=" + device_model + "&device_platform=" + device_platform + "&device_version=" + device_version + "&device_uuid=" + device_uuid + "&device_battery=" + device_battery + "", function (data) {

            document.location.href = 'gotostart.html';

        });

    });


}

function social_register_go() {

    var login_type = localStorage.getItem("login_type");

    if (login_type == "facebook") {
        var sign_in_email = localStorage.getItem("facebook_email");
        var sign_in_name = localStorage.getItem("facebook_name");
    }
    if (login_type == "google") {
        var sign_in_email = localStorage.getItem("google_email");
        var sign_in_name = localStorage.getItem("google_name");
    }

    swal("", "" + sign_in_name + ", you're not yet registered with Afritaxi. \n\nPlease tell as your phone number and pick a password.");

    $("#reg_start").load("reg/mainmenu.html", function () {

        var name_from_social_split = sign_in_name.split(" ");

        document.getElementById("first_name").value = name_from_social_split[0];
        document.getElementById("last_name").value = name_from_social_split[1];

        document.getElementById("email").value = sign_in_email;

        Materialize.updateTextFields();

        document.getElementById("reg_start").style.height = "100%";
        if (document.getElementById("close_reg_start_arrow")) {
            document.getElementById("close_reg_start_arrow").style.marginLeft = "10px";
        }

    });

    location.href = "#registration";
    localStorage.setItem("reg_start_open", "Yes");

}