var googleapi = {
    setToken: function(data) {
        //Cache the token
        localStorage.access_token = data.access_token;
        //Cache the refresh token, if there is one
        localStorage.refresh_token = data.refresh_token || localStorage.refresh_token;
        //Figure out when the token will expire by using the current
        //time, plus the valid time (in seconds), minus a 1 minute buffer
        var expiresAt = new Date().getTime() + parseInt(data.expires_in, 10) * 1000 - 60000;
        localStorage.expires_at = expiresAt;
    },
    authorize: function(options) {
        var deferred = $.Deferred();

        //Build the OAuth consent page URL
        var authUrl = 'https://accounts.google.com/o/oauth2/auth?' + $.param({
            client_id: options.client_id,
            redirect_uri: options.redirect_uri,
            response_type: 'code',
            scope: options.scope
        });

        //Open the OAuth consent page in the InAppBrowser
        var authWindow = window.open(authUrl, '_blank', 'location=no,toolbar=no');

        //The recommendation is to use the redirect_uri "urn:ietf:wg:oauth:2.0:oob"
        //which sets the authorization code in the browser's title. However, we can't
        //access the title of the InAppBrowser.
        //
        //Instead, we pass a bogus redirect_uri of "http://localhost", which means the
        //authorization code will get set in the url. We can access the url in the
        //loadstart and loadstop events. So if we bind the loadstart event, we can
        //find the authorization code and close the InAppBrowser after the user
        //has granted us access to their data.
        authWindow.addEventListener('loadstart', googleCallback);
        function googleCallback(e){
            var url = (typeof e.url !== 'undefined' ? e.url : e.originalEvent.url);
            var code = /\?code=(.+)$/.exec(url);
            var error = /\?error=(.+)$/.exec(url);

            if (code || error) {
                //Always close the browser when match is found
                authWindow.close();
            }

            if (code) {
                //Exchange the authorization code for an access token
                $.post('https://accounts.google.com/o/oauth2/token', {
                    code: code[1],
                    client_id: options.client_id,
                    client_secret: options.client_secret,
                    redirect_uri: options.redirect_uri,
                    grant_type: 'authorization_code'
                }).done(function(data) {
                    googleapi.setToken(data);
                    deferred.resolve(data);
                }).fail(function(response) {
                    deferred.reject(response.responseJSON);
                });
            } else if (error) {
                //The user denied access to the app
                deferred.reject({
                    error: error[1]
                });
            }
        }

        return deferred.promise();
    },
    getToken: function(options) {
        var deferred = $.Deferred();

        if (new Date().getTime() < localStorage.expires_at) {
            deferred.resolve({
                access_token: localStorage.access_token
            });
        } else if (localStorage.refresh_token) {
            $.post('https://accounts.google.com/o/oauth2/token', {
                refresh_token: localStorage.refresh_token,
                client_id: options.client_id,
                client_secret: options.client_secret,
                grant_type: 'refresh_token'
            }).done(function(data) {
                googleapi.setToken(data);
                deferred.resolve(data);
            }).fail(function(response) {
                deferred.reject(response.responseJSON);
            });
        } else {
            deferred.reject();
        }

        return deferred.promise();
    },
    userInfo: function(options) {
        return $.getJSON('https://www.googleapis.com/oauth2/v1/userinfo', options);
    }
};

var app = {
    client_id: '1006498509511-tr3oa7961ib6bno994v1svksdhlihhlh.apps.googleusercontent.com',
    client_secret: 'U06r5XYLvlSmJgt6jF_r7Nhw',
    redirect_uri: 'http://localhost',
    scope: 'https://www.googleapis.com/auth/userinfo.email',

    init: function() {
        $('#google_login').on('click', function() {
            localStorage.setItem("google_login_button_clicked","Yes");
            app.onLoginButtonClick();
        });

        //Check if we have a valid token
        //cached or if we can get a new
        //one using a refresh token.
        googleapi.getToken({
            client_id: app.client_id,
            client_secret: app.client_secret
        }).done(function() {
            //Show the greet view if we get a valid token
            app.showGreetView();
        }).fail(function() {
            //Show the login view if we have no valid token
            app.showLoginView();
        });
    },
    showLoginView: function() {
       // $('#google_sign_in').show();
       // $('#google_welcome').hide();
    },
    showGreetView: function() {
        // $('#google_sign_in').hide();
        // $('#google_welcome').show();

        //Get the token, either from the cache
        //or by using the refresh token.
        googleapi.getToken({
            client_id: app.client_id,
            client_secret: app.client_secret
        }).then(function(data) {
            //Pass the token to the API call and return a new promise object
            return googleapi.userInfo({ access_token: data.access_token });
        }).done(function(user) {
            //Display a greeting if the API call was successful
            // $('#google_welcome h1').html('Hello ' + user.name + ' ' + user.email + '!');
            
            usersname = user.name;
            usersemail = user.email;
            
            localStorage.setItem("name_from_google", usersname);
            localStorage.setItem("email_from_google", usersemail);
            
            console.log("Google login: "+usersname+" "+usersemail+" ");
            
            go_google_login();
            
        }).fail(function() {
            //If getting the token fails, or the token has been
            //revoked, show the login view.
            app.showLoginView();
        });
    },
    onLoginButtonClick: function() {
        //Show the consent page
        googleapi.authorize({
            client_id: app.client_id,
            client_secret: app.client_secret,
            redirect_uri: app.redirect_uri,
            scope: app.scope
        }).done(function() {
            //Show the greet view if access is granted
            app.showGreetView();
        }).fail(function(data) {
            //Show an error message if access was denied
         //   $('#google_welcome p').html(data.error);
        });
    }
};

$(document).on('deviceready', function() {
    app.init();
});

function go_google_login() {
    
var google_login_button_clicked = localStorage.getItem("google_login_button_clicked");
    
if (google_login_button_clicked != "Yes") {
    return;
}
    
var email_from_google = localStorage.getItem("email_from_google");
    
$.get("https://250taxi.com/db/username_from_email.php?username=" + email_from_google + "", function(username) {
    
if (username == "") {
    alert("Account not found. Please register first.");zuuuz7
    start_reg();
    return;
}
    
localStorage.setItem("username_check",username);
    
    $.get("https://250taxi.com/db/check-username-login.php?task=getuserid&username=" + username + "", function(userid) {
        
        localStorage.setItem("userid", userid);
        
        go_google_login_next();
    });
    
});
    
}

function go_google_login_next() {
    
localStorage.setItem("google_login_button_clicked","");

showindicator();
    
var username = localStorage.getItem("username_check");
var userid = localStorage.getItem("userid");

localStorage.setItem("rememberuser", "Yes");
localStorage.removeItem("hotelcorporate");
localStorage.setItem("username", username);

localStorage.setItem("logupdate", "" + userid + "*0*login google*User" + userid + " logged in trough google.");
logupdate_v2();

var randomclientid = Math.floor(Math.random() * 1000000000);
localStorage.setItem("randomclientid", randomclientid);

console.log(randomclientid);
                                    
var battery = navigator.battery || navigator.mozBattery;
if (battery) {
var device_battery = (battery.level * 100);
localStorage.setItem("device_battery",device_battery);
} else if (navigator.getBattery) {
    navigator.getBattery().then(function(battery) {
        var device_battery = (battery.level * 100);
        localStorage.setItem("device_battery",device_battery);
    });
}

var device_model = localStorage.getItem("device_model");
var device_platform = localStorage.getItem("device_platform");
var device_version = localStorage.getItem("device_version");
var device_uuid = localStorage.getItem("device_uuid");
var device_battery = localStorage.getItem("device_battery");

$.get("https://250taxi.com/db/account/set_randomclientid.php?&userid=" + userid + "&randomclientid=" + randomclientid + "&device_model=" + device_model + "&device_platform=" + device_platform + "&device_version=" + device_version + "&device_uuid=" + device_uuid + "&device_battery=" + device_battery + "", function(data) {
                            
    document.location.href = 'gotostart.html';

});

}