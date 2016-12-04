function show_message(text) {

    if (!document.getElementById('message_box')) {
        var message_layer = document.createElement('div');
        message_layer.id = 'message_box';

        document.getElementsByTagName('body')[0].appendChild(message_layer);

        message_layer.style.top = "-250px";
        message_layer.style.left = "0px";
        message_layer.style.position = "fixed";
        message_layer.style.width = "100%";
        message_layer.style.height = "230px";
        message_layer.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
        message_layer.style.zIndex = "1000000000000000";
        message_layer.style.transition = "all 0.3s";
        
        message_layer.className = "animated fadeInDown";

        message_layer.style.paddingTop = "20px";
        message_layer.style.color = "white";

        message_layer.style.fontFamily = "sans-serif";
        message_layer.style.fontSize = "14px";
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
    
    message_layer.innerHTML = "<div id='message_layer_replay_button'>Reply</div>"+text+"";
    
    message_layer_replay_button = document.getElementById("message_layer_replay_button");
    message_layer_replay_button.style.backgroundImage = "url('css/reply.svg')";
    message_layer_replay_button.style.backgroundPosition = "left center";
    message_layer_replay_button.style.backgroundRepeat = "no-repeat";
    message_layer_replay_button.style.textIndent = "30px";
    message_layer_replay_button.style.width = "80%";
    message_layer_replay_button.style.marginLeft = "10%";
    message_layer_replay_button.style.borderTop = "1px solid white"
    message_layer_replay_button.style.lineHeight = "40px";
    message_layer_replay_button.style.textAlign = "left";
    message_layer_replay_button.style.position = "absolute";
    message_layer_replay_button.style.marginTop = "190px";
    
    message_layer_replay_button.style.fontFamily = "sans-serif";
    message_layer_replay_button.style.fontSize = "14px";

    message_layer.style.top = "0px";

    message_layer.onclick = function () {
        message_layer.style.top = "-250px";
        message_center_audio.volume = 0;
        message_center_audio.play();
    };
    
    message_layer_replay_button.onclick = function () {
       
        var userid = localStorage.getItem("userid");
	
	swal({   
		title: "",
		text: "",
        inputPlaceholder: "",
		type: "input",
		showCancelButton: true,
		confirmButtonColor: "#148AAE",
		confirmButtonText: "Send",
		closeOnConfirm: true
    }, function(inputValue){   
		
		$.get( "https://250taxi.com/db/message.php?task=addresponse&type=response&userid="+userid+"&text="+inputValue+"", function( data ) {
		
		
		
		});
	
    });
        
    };

}

function send_message_to_customer_care() {
    
    var userid = localStorage.getItem("userid");
	
	swal({
		title: "",
		text: "",
        inputPlaceholder: "",
		type: "input",
		showCancelButton: true,
		confirmButtonColor: "#148AAE",
		confirmButtonText: "Send",
		closeOnConfirm: true
    }, function(inputValue){   
        
        if(inputValue != "" || inputValue != false) {
		
		$.get( "https://250taxi.com/db/message.php?task=addresponse&type=response&userid="+userid+"&text="+inputValue+"", function( data ) {	
		
		});
            
        }
	
    });
}