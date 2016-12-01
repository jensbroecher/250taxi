function facebook_login_start() {
    facebookConnectPlugin.login(["email"], function (response) {
        if (response.authResponse) {

            facebookConnectPlugin.api('/me?fields=id,name,email', null
                , function (response) {

                    console.log('' + response.id + '\n' + response.email + '\n' + response.name + '');
                
                    var facebook_id = response.id;
                    var facebook_email = response.email;
                    var facebook_name = response.name;
                
                    localStorage.setItem("login_type","facebook");
                    localStorage.setItem("facebook_id",facebook_id);
                    localStorage.setItem("facebook_email",facebook_email);
                    localStorage.setItem("facebook_name",facebook_name);
                
                    complete_social_login();

                });

        }
    });
}