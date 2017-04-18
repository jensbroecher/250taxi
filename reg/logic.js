// XHR includes

$.get("journey/at_overlay.html", function (data) {
    $('body').append(data);

    $("#at_ol_title").html("Select Country");

    var country = localStorage.getItem("country");

    console.log("Selected Country: " + country);

    if (country == "Rwanda") {
        // document.body.className = "body_other";
    } else {
        // document.body.className = "body_other";
    }

    if (localStorage.getItem("country")) {

    } else {

        var at_content = "<img id=\"at_ol_logo\" src=\"css/menu_afri_logo.png\"><div id=\"at_ol_country_display\"><div class=\"at_ol_country_select\" id=\"at_ol_rwanda\">Rwanda</div><div class=\"at_ol_country_select\" id=\"at_ol_zambia\">Zambia</div></div>";

        $("#at_ol").show();
        $("#at_ol_content").html(at_content);

        $(".at_ol_country_select").click(function () {

            var country_select_id = $(this).html();

            localStorage.setItem("country", country_select_id);

            var country_name = country_select_id.toUpperCase();

            swal({
                    title: ""
                    , text: "Select " + country_name + "?"
                    , type: ""
                    , showCancelButton: true
                    , confirmButtonText: "OK"
                    , closeOnConfirm: true
                }
                , function () {
                    $("#at_ol").hide();

                    if (country_select_id == "Rwanda") {
                        document.body.className = "body_rwanda";
                    } else {
                        document.body.className = "body_other";
                    }
                
                });

        });

    }

});

function complete_registration() {

    password = document.getElementById('password').value;
    phone = document.getElementById('phone').value.replace(/^[0]+/g, "");
    email = document.getElementById('email').value;

    first_name = document.getElementById('first_name').value;
    last_name = document.getElementById('last_name').value;

    localStorage.setItem('first_name', first_name);
    localStorage.setItem('last_name', last_name);

    localStorage.setItem('phoneisvalidated', 'No');

    storeindb();

}

function storeindb() {

    var phoneisvalidated = localStorage.getItem('phoneisvalidated');
    var country = localStorage.getItem('country');

    $.ajax({
        type: "GET"
        , url: "https://250taxi.com/db/afri_registration.php"
        , data: "phone=" + phone + "&how_found=" + reg_how_found_select + "&task=reg&email=" + email + "&phoneisvalidated=" + phoneisvalidated + "&last_name=" + last_name + "&first_name=" + first_name + "&country=" + country + "&password=" + password
        , success: function (userid) {

            localStorage.setItem("rememberuser", "Yes");
            localStorage.removeItem("hotelcorporate");

            localStorage.setItem("logupdate", "0*0*registration*" + first_name + " " + last_name + " - " + email + " - " + phone + " completed registration.");
            logupdate_v2();

            var randomclientid = Math.floor(Math.random() * 1000000000);
            localStorage.setItem("randomclientid", randomclientid);
            console.log(randomclientid);

            localStorage.setItem("userid", userid);

            $.get("https://250taxi.com/db/account/set_randomclientid.php?&userid=" + userid + "&randomclientid=" + randomclientid + "", function (data) {

                document.location.href = 'gotostart.html';

            });

        }
    });
}

function viewterms() {
    document.getElementById("viewterms").style.display = "block";
    $("#viewtermsinside").load("https://250taxi.com/termsandconditions.php");
}