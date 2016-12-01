swal.setDefaults({
    confirmButtonColor: 'indianred'
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

    $.ajax({
        type: "GET"
        , url: "https://250taxi.com/db/afri_registration.php"
        , data: "phone=" + phone + "&how_found=" + reg_how_found_select + "&task=reg&email=" + email + "&phoneisvalidated=" + phoneisvalidated + "&last_name=" + last_name + "&first_name=" + first_name + "&password=" + password
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