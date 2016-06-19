function show_message(text) {

    if (!document.getElementById('message_box')) {
        var message_layer = document.createElement('div');
        message_layer.id = 'message_box';

        document.getElementsByTagName('body')[0].appendChild(message_layer);

        message_layer.style.top = "-250px";
        message_layer.style.left = "0px";
        message_layer.style.position = "fixed";
        message_layer.style.width = "80%";
        message_layer.style.height = "150px";
        message_layer.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
        message_layer.style.zIndex = "1000000000000000";
        message_layer.style.transition = "all 0.5s";
        
        message_layer.className = "animated fadeInDown";

        message_layer.style.padding = "10%";
        message_layer.style.color = "white";

        message_layer.style.fontFamily = "sans-serif";
        message_layer.style.fontSize = "110%";
        message_layer.style.textAlign = "center";
        message_layer.style.overflow = "auto";
        
        $('#message_box').swipe({
				swipeUp: function() {
                     message_layer.style.top = "-250px";
				}

			});
    }

    message_layer = document.getElementById('message_box');
    
    // navigator.vibrate(1000);
    message_center_audio.volume = 1;
    message_center_audio.play();
    
    message_layer.innerHTML = text;

    message_layer.style.top = "0px";

    message_layer.onclick = function () {
        message_layer.style.top = "-250px";
        message_center_audio.volume = 0;
        message_center_audio.play();
    };

}