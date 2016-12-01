var googleapi = {
    setToken: function (data) {

        localStorage.access_token = data.access_token;

        localStorage.refresh_token = data.refresh_token || localStorage.refresh_token;

        var expiresAt = new Date().getTime() + parseInt(data.expires_in, 10) * 1000 - 60000;
        localStorage.expires_at = expiresAt;
    }
    , authorize: function (options) {
        var deferred = $.Deferred();

        var authUrl = 'https://accounts.google.com/o/oauth2/auth?' + $.param({
            client_id: options.client_id
            , redirect_uri: options.redirect_uri
            , response_type: 'code'
            , scope: options.scope
        });

        var authWindow = window.open(authUrl, '_blank', 'location=no,toolbar=no');

        authWindow.addEventListener('loadstart', googleCallback);

        function googleCallback(e) {
            var url = (typeof e.url !== 'undefined' ? e.url : e.originalEvent.url);
            var code = /\?code=(.+)$/.exec(url);
            var error = /\?error=(.+)$/.exec(url);

            if (code || error) {
                //Always close the browser when match is found
                authWindow.close();
            }

            if (code) {

                $.post('https://accounts.google.com/o/oauth2/token', {
                    code: code[1]
                    , client_id: options.client_id
                    , client_secret: options.client_secret
                    , redirect_uri: options.redirect_uri
                    , grant_type: 'authorization_code'
                }).done(function (data) {
                    googleapi.setToken(data);
                    deferred.resolve(data);
                }).fail(function (response) {
                    deferred.reject(response.responseJSON);
                });
            } else if (error) {

                deferred.reject({
                    error: error[1]
                });
                
            }
        }

        return deferred.promise();
    }
    , getToken: function (options) {
        var deferred = $.Deferred();

        if (new Date().getTime() < localStorage.expires_at) {
            deferred.resolve({
                access_token: localStorage.access_token
            });
        } else if (localStorage.refresh_token) {
            $.post('https://accounts.google.com/o/oauth2/token', {
                refresh_token: localStorage.refresh_token
                , client_id: options.client_id
                , client_secret: options.client_secret
                , grant_type: 'refresh_token'
            }).done(function (data) {
                googleapi.setToken(data);
                deferred.resolve(data);
            }).fail(function (response) {
                deferred.reject(response.responseJSON);
            });
        } else {
            deferred.reject();
        }

        return deferred.promise();
    }
    , userInfo: function (options) {
        return $.getJSON('https://www.googleapis.com/oauth2/v1/userinfo', options);
    }
};

var app = {
    client_id: '1006498509511-tr3oa7961ib6bno994v1svksdhlihhlh.apps.googleusercontent.com',
    client_secret: 'U06r5XYLvlSmJgt6jF_r7Nhw',
    redirect_uri: 'http://localhost',
    scope: 'https://www.googleapis.com/auth/userinfo.email',

    init: function () {

        googleapi.getToken({
            client_id: app.client_id
            , client_secret: app.client_secret
        }).done(function () {

            app.showGreetView();

        }).fail(function () {

            app.showLoginView();

        });
    }
    , showLoginView: function () {

    }
    , showGreetView: function () {

        googleapi.getToken({
            client_id: app.client_id
            , client_secret: app.client_secret
        }).then(function (data) {

            return googleapi.userInfo({
                access_token: data.access_token
            });
        }).done(function (user) {

            usersname = user.name;
            usersemail = user.email;

            localStorage.setItem("name_from_google", usersname);
            localStorage.setItem("email_from_google", usersemail);

            console.log("Google login: " + usersname + " " + usersemail + " ");

            go_google_login();

        }).fail(function () {
            //If getting the token fails, or the token has been
            //revoked, show the login view.
            app.showLoginView();
        });
    }
    , onLoginButtonClick: function () {
        //Show the consent page
        googleapi.authorize({
            client_id: app.client_id
            , client_secret: app.client_secret
            , redirect_uri: app.redirect_uri
            , scope: app.scope
        }).done(function () {
            //Show the greet view if access is granted
            app.showGreetView();
        }).fail(function (data) {
            //Show an error message if access was denied
            //   $('#google_welcome p').html(data.error);
        });
    }
};

$(document).on('deviceready', function () {
    app.init();
});

function go_google_login() {

    var google_login_button_clicked = localStorage.getItem("google_login_button_clicked");

    if (google_login_button_clicked != "Yes") {
        return;
    }

    var email_from_google = localStorage.getItem("email_from_google");
    var name_from_google = localStorage.getItem("name_from_google");

    localStorage.setItem("login_type", "google");
    localStorage.setItem("google_email", email_from_google);
    localStorage.setItem("google_name", name_from_google);

    complete_social_login();

}