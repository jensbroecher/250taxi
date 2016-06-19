$(document).ready(function () {

    if (window.location.protocol !== 'https:') {
        window.location = 'https://' + window.location.hostname + window.location.pathname + window.location.hash;
    }

    $("#expanded_customer_care_close").swipe({
        swipeRight: function () {

            $("#customercarebuttonside").draggable("enable");

            document.getElementById("customercarebuttonside").className = "addtrans";

            document.getElementById("customercarebuttonside").style.backgroundSize = "50% auto";
            document.getElementById("customercarebuttonside").style.backgroundPosition = "32px center";

            document.getElementById("swipehand").style.display = "block";

            document.getElementById("customercarebuttonside").style.width = "70px";
            document.getElementById("customercarebuttonside").style.marginLeft = "0px";
            document.getElementById("expanded_customer_care").style.display = "none";
            document.getElementById("customercarebuttonside").style.backgroundPosition = "32px center";

        }

    });



    $("#customercarebuttonside").swipe({
        swipeLeft: function () {

            customercarebuttonside_animate();

        }

    });



    var count = 0;

    $("#pushmenu").swipe({
        swipeLeft: function (event, direction, distance, duration, fingerCount) {



            console.log("You swiped " + direction + " " + ++count + " times ");
            $('.jPushMenuBtn,body,.cbp-spmenu').removeClass('disabled active cbp-spmenu-open cbp-spmenu-push-toleft cbp-spmenu-push-toright');
        }
        , threshold: 0



    });

    $("#mydetailedlocation").swipe({
        swipeDown: function () {
            mydetailedlocation_close();
        }

    });



});

$(function () {

    var dragCheck = false;

    $('#customercarebuttonside').draggable({
        revert: false
        , axis: "y"
        , scroll: false
        , containment: "parent"
        , start: function () {
            $('#expanded_customer_care_close').off('click');
            document.getElementById("customercarebuttonside").className = "";
        }
        , drag: function () {
            // On drag set that flag to true
            dragCheck = true;
        }
        , stop: function () {
            // On stop of dragging reset the flag back to false
            dragCheck = false;
            // customercarebuttonside_animate();
            setTimeout(function () {

            }, 1);
        }
    });

    // Then instead of using click use mouseup, and on mouseup only fire if the flag is set to false
    $('#customercarebuttonside').bind('mouseup', function () {
        if (dragCheck == false) {
            customercarebuttonside_animate();
        }
    });

});




function customercarebuttonside_animate() {

    $("#customercarebuttonside").draggable("disable");

    document.getElementById("customercarebuttonside").style.backgroundSize = "0% auto";
    document.getElementById("customercarebuttonside").style.backgroundPosition = "center right";

    document.getElementById("swipehand").style.display = "none";

    document.getElementById("customercarebuttonside").style.width = "150px";
    document.getElementById("customercarebuttonside").style.marginLeft = "-80px";
    document.getElementById("customercarebuttonside").className = "addtrans";


    document.getElementById("expanded_customer_care").style.display = "block";

}

function customercare_call() {

    var app_or_web = localStorage.getItem("app_or_web");

    if (app_or_web == "web") {
        location.href = "tel:+250783000096";
    }
    if (app_or_web == "app") {
        window.open('tel:+250783000096', '_system', 'location=yes');
    }

}

function customercare_sms() {

    var app_or_web = localStorage.getItem("app_or_web");

    if (app_or_web == "web") {
        location.href = "sms:+250783000096";
    }
    if (app_or_web == "app") {
        window.open('sms:+250783000096', '_system', 'location=yes');
    }

}

function customercare_whatsapp() {
    if ((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i))) {
        location.href = "whatsapp://abid?+250736733747";
    } else {
        var app_or_web = localStorage.getItem("app_or_web");
        if (app_or_web == "web") {
            location.href = "intent://send/+250736733747#Intent;scheme=smsto;package=com.whatsapp;action=android.intent.action.SENDTO;end";
        }
    }
    if (app_or_web == "app") {
        window.open('intent://send/+250736733747#Intent;scheme=smsto;package=com.whatsapp;action=android.intent.action.SENDTO;end', '_system', 'location=yes');
    }
}


document.ontouchmove = function (event) {

    var isTouchMoveAllowed = true
        , target = event.target;

    while (target !== null) {
        if (target.classList && target.classList.contains('disable-scrolling')) {
            isTouchMoveAllowed = false;
            break;
        }
        target = target.parentNode;
    }

    if (!isTouchMoveAllowed) {
        event.preventDefault();
    }

};
$(document).ready(function () {

    setTimeout(function () {
        document.getElementById("calltaxiui").style.opacity = "1";
    }, 2000);

    setTimeout(function () {
        document.getElementById("calltaxiui").style.webkitFilter = "brightness(2)";
    }, 4000);

    setTimeout(function () {
        document.getElementById("calltaxiui").style.webkitFilter = "brightness(1)";
    }, 4300);

});

function parseDate(from) {
    from = from.replace('T', ' ').replace(/-/g, '/');
    return new Date(from);
}

function pickup_booking_date_check() {
    var pickup_booking_date_time = document.getElementById("pickup_booking_date").value;

    pickup_booking_date_time = parseDate(pickup_booking_date_time);






    var date_for_button = dateFormat(pickup_booking_date_time, "mmmm d - h:MM TT");

    // alert(date_for_button);


    document.getElementById("detailedlocation_date_time_button").innerHTML = date_for_button;

    document.getElementById("ddtest").value = date_for_button;

}

function change_account(action) {

    if (action == "assistance") {

        var clientid = localStorage.getItem("userid");

        $.get("https://250taxi.com/db/change_account.php?task=email&userid=" + clientid + "", function (data) {
            alert('Customer care will contact you soon.');
        });

        document.getElementById("account_button").style.display = "none";
        document.getElementById("account_button_after_click").style.display = "block";

    }

}

function submit_card_details() {
    var a = $("#payment-form").serialize();
    var a = $("#stripeToken").val();
    // alert(12);
    $.get("https://250taxi.com/app/stripe-payment/stripe_payment.php?a=" + a, function (data) {
        alert(data);
    });
}