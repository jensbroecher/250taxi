function alert(message) {
			if (!document.getElementById('myalert')) {
				var myalert = document.createElement('div');
				myalert.id = 'myalert';
				
				var myalert_inner = document.createElement('div');
				myalert_inner.id = 'myalert_inner';
				myalert.appendChild(myalert_inner);
				
				document.getElementsByTagName('body')[0].appendChild(myalert);
			}
	
			message_length = message.length;
    
var voice_enabled = localStorage.getItem("voice_enabled");
if (voice_enabled == "On") {responsiveVoice.speak(message);}
	
			myalert_inner = document.getElementById('myalert_inner');
			myalert = document.getElementById('myalert');
			
			myalert.style.top = "0px";
			myalert.style.left = "0px";
			myalert.style.position = "absolute";
            myalert.className = "animated fadeIn";
			myalert.style.width = "100%";
			myalert.style.height = "100%";
			myalert.style.backgroundColor = "rgba(0, 0, 0, 0.4)";
			myalert.style.zIndex = "1000000000000000";
			
			myalert_inner.style.marginLeft = "auto";
			myalert_inner.style.marginRight = "auto";
	
			myalert_window_height = window.innerHeight;
	
			myalert_inner.style.marginTop = "100px";
	
			console.log("Message length: " + message_length);
			
			myalert_inner.style.height = "200px";
			
			
			myalert_inner.style.width = "80%";
			myalert_inner.style.paddingLeft = "0px";
			myalert_inner.style.paddingRight = "0px";
			myalert_inner.style.maxWidth = "500px";
			myalert_inner.style.backgroundColor = "#F8F8F8";
			myalert_inner.style.textAlign = "center";
			myalert_inner.style.fontFamily = "sans-serif";
			myalert_inner.style.fontSize = "100%";
			myalert_inner.style.paddingTop = "20px";
			
			myalert_inner.style.borderRadius = "20px";

			
			message = "<div id='myalert_inner_button'></div><div style='padding:5px;'>"+message+"</div>";
			
			myalert_inner.innerHTML = message;
			myalert_inner_button = document.getElementById("myalert_inner_button");
			myalert_inner_button.innerHTML = "OK";
			myalert_inner_button.style.borderTopStyle = "solid";
			myalert_inner_button.style.borderTopColor = "#DDDDDD";
			myalert_inner_button.style.borderTopWidth = "1px";
			myalert_inner_button.style.position = "absolute";
	
			
			
			myalert_inner_button.style.marginTop = "150px";
			
	
			
			myalert_inner_button.style.width = "80%";
			myalert_inner_button.style.maxWidth = "500px";
			myalert_inner_button.style.lineHeight = "50px";
			myalert_inner_button.style.cursor = "default";
			myalert_inner_button.style.color = "darkgrey";
			myalert_inner_button.style.fontWeight = "";
			
			myalert.onclick = function(){
				document.getElementsByTagName('body')[0].removeChild(myalert);
			};
		}