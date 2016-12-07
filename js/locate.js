$(document).ready(function () {

    $(window).on('resize', function () {
        if ($(document.activeElement).prop('type') === 'text') {
            $("user_pin_eta").hide();
        } else {
            $("user_pin_eta").show();
        }
    });

    // XHR includes

    $.get("journey/at_modal.html", function (data) {
        $('body').append(data);
    });

    $.get("journey/user_pin.html", function (data) {
        $("#user_location_pin").html(data);
    });

    $.get("journey/call_taxi_ui.html", function (data) {
        $('body').append(data);

        $.get("journey/my_detailed_location_dialog.html", function (data) {
            $('body').append(data);
            init_main_map();
            init_detailed_location_dialog();
            init_call_taxi_ui();
        });

    });

    // End XHR includes

    $("#ride_later_button .start_button_pick").html("Pick me up");
    $("#ride_later_button .start_button_time").html("Later");

    /*
    if (window.location.protocol !== 'https:') {
        window.location = 'https://' + window.location.hostname + window.location.pathname + window.location.hash;
    }
    */

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

            $("#myalert").remove();

        }
        , threshold: 0

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

function reset_loading() {
    $("#loadingindicator").fadeOut();
}

function init_detailed_location_dialog() {

    $("#mydetailedlocation").swipe({
        swipeDown: function () {
            mydetailedlocation_close();
        }

    });

    $("#payment_go").click(function () {

        var at_content = `

        <nav onclick="payment_method('cash');"><img src="css/payment/cash-multiple.svg">Cash</nav>
        
        <nav onclick="payment_method('wallet');"><img src="css/payment/wallet.svg">Wallet</nav>
        
        <nav onclick="payment_method('creditcard');"><img src="css/payment/credit-card-multiple.svg">Credit Card</nav>
        
        <nav onclick="payment_method('corporate');"><img src="css/payment/domain.svg">Corporate</nav>

        `;

        document.getElementById("at_modal_content").innerHTML = at_content;
        document.getElementById("at_modal").style.display = "block";

    });

}

function payment_method(choice) {
    localStorage.setItem("payment_method", choice);
    document.getElementById("at_modal").style.display = "none";
    
    var userid = localStorage.getItem("userid");
    
    /*
    $.get("https://250taxi.com/db/stripe-payment/stripe_payment.php?a=" + a, function (data) {
        alert(data);
    });
    */

    if (choice == "wallet") {
        var payment_method_on_button = "css/payment/white/wallet.svg";
        var payment_method_on_button_text = "Wallet";
    }
    if (choice == "cash") {
        var payment_method_on_button = "css/payment/white/cash-multiple.svg";
        var payment_method_on_button_text = "Cash";
    }
    if (choice == "creditcard") {
        var payment_method_on_button = "css/payment/white/credit-card-multiple.svg";
        var payment_method_on_button_text = "Credit Card";
    }
    if (choice == "corporate") {
        var payment_method_on_button = "css/payment/white/domain.svg";
        var payment_method_on_button_text = "Corporate";
    }

    document.getElementById("payment_method_on_button").src = payment_method_on_button;

    document.getElementById("payment_method_on_button_text").innerHTML = payment_method_on_button_text;

}

function enter_coupon() {
    swal({
            title: ""
            , text: ""
            , type: "input"
            , showCancelButton: true
            , closeOnConfirm: false
            , inputPlaceholder: "Coupon Code"
        }
        , function (inputValue) {
            if (inputValue === false) return false;

            if (inputValue === "") {
                swal.showInputError("You need to write something!");
                return false
            }

            swal("Nice!", "You wrote: " + inputValue, "success");
        });
}