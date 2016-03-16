<!doctype html>
<html>

<head>

    <meta charset="utf-8">
    
    <link rel="apple-touch-icon" sizes="57x57" href="../apple-touch-icon-57x57.png">
<link rel="apple-touch-icon" sizes="60x60" href="../apple-touch-icon-60x60.png">
<link rel="apple-touch-icon" sizes="72x72" href="../apple-touch-icon-72x72.png">
<link rel="apple-touch-icon" sizes="76x76" href="../apple-touch-icon-76x76.png">
<link rel="apple-touch-icon" sizes="114x114" href="../apple-touch-icon-114x114.png">
<link rel="apple-touch-icon" sizes="120x120" href="../apple-touch-icon-120x120.png">
<link rel="apple-touch-icon" sizes="144x144" href="../apple-touch-icon-144x144.png">
<link rel="apple-touch-icon" sizes="152x152" href="../apple-touch-icon-152x152.png">
<link rel="apple-touch-icon" sizes="180x180" href="../apple-touch-icon-180x180.png">
<link rel="icon" type="image/png" href="../favicon-32x32.png" sizes="32x32">
<link rel="icon" type="image/png" href="../android-chrome-192x192.png" sizes="192x192">
<link rel="icon" type="image/png" href="../favicon-96x96.png" sizes="96x96">
<link rel="icon" type="image/png" href="../favicon-16x16.png" sizes="16x16">
<link rel="manifest" href="../manifest.json">
<meta name="msapplication-TileColor" content="#df600a">
<meta name="msapplication-TileImage" content="../mstile-144x144.png">
<meta name="theme-color" content="#000000">

    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">

    <link href="main.css" rel="stylesheet" type="text/css">
    <link href="animate.min.css" rel="stylesheet" type="text/css">
    <script type="text/javascript" charset="utf-8" src="jquery-1.9.1.js"></script>
    <script type="text/javascript" charset="utf-8" src="logic.js"></script>
    <script type="text/javascript" charset="utf-8" src="../logupdate.js"></script>

    <script type="text/javascript" charset="utf-8" src="../materialize.js"></script>
    <link href="../waves.css" rel="stylesheet" type="text/css">

    <script type="text/javascript" charset="utf-8" src="../cordova.js"></script>

    <script src="../preventreload.js"></script>

   
</head>

<body id="mainbg">
	<?php 
			require  '../../db/medoo.min.php';
			require  '../../db/db_config.php';
			 $randomclientid=$_GET["id"];
			  $username=$_GET["user"];
				$data = $db->get("accounts_250", [
					"randomclientid",
				], [
					"username" => $username
				]);
			 $db_randomclientid= $data['randomclientid'];
			
	?>
    <div id="offline" class="animated fadeIn">
        <img src="cloud.png">
        <div>You are offline. This app requires an active internet connection.</div>
    </div>

    <div id="loadingindicator" style="display:block;">
        <img src="../282.gif">
    </div>

    <div id="mainmenu" class="nicewindow" style="display:none; width:80%;">
<input type="hidden" id="username" value="<?php echo $username=$_GET['user']; ?>" >
        <div id="loginscreenstart">
			<?php if($randomclientid == $db_randomclientid){	?>
            <div class="heading_and_back"><div onClick="document.location.href = '../index.html';" class="backarrow"></div>Reset your PIN here</div>

			<div id="loginscreenstart_inputs">
			
            <input name="password" id="password" type="text" class="textfield" required placeholder="PIN">
			<input name="confirm_password" id="confirm_password" type="text" class="textfield" required placeholder="Confirm PIN">
			
			</div>
			
			<div class="windowbutton waves-effect waves-dark" onClick="updatePassword();">Submit</div>
			<?php } 
			else{
				echo "Your Password recovery link expire. Please try again..";
			} ?>
			
			<br><br>
			
			<div class="msg"></div>
			
			<br><br>
			
        </div>



       

    </div>

    <br>

</body>
</html>

 <script type="text/javascript">
		
		function showindicator() {
            document.getElementById("loadingindicator").className = "animated fadeIn";
            document.getElementById("loadingindicator").style.display = "block";
        }
		function hideindicator() {
            document.getElementById("loadingindicator").style.display = "none";
        }
		
        $(document).ready(function() {
			
			var currentTime = new Date().getHours();
			
            if (0 <= currentTime && currentTime < 5) {
               document.getElementById("mainbg").style.backgroundImage = "url('kigali_night.jpg')";
				document.getElementById("mainbg").style.backgroundSize = "auto 100%";
            }
            if (5 <= currentTime && currentTime < 11) {
				 document.getElementById("mainbg").style.backgroundImage = "url('kigali_day.jpg')";
            }
            if (11 <= currentTime && currentTime < 16) {
				 document.getElementById("mainbg").style.backgroundImage = "url('kigali_day.jpg')";
            }
            if (16 <= currentTime && currentTime < 17) {
				 document.getElementById("mainbg").style.backgroundImage = "url('kigali_day.jpg')";
            }
            if (17 <= currentTime && currentTime <= 24) {
                document.getElementById("mainbg").style.backgroundImage = "url('kigali_night.jpg')";
				document.getElementById("mainbg").style.backgroundSize = "auto 100%";
            }
        
			


            if (localStorage.getItem('username') === null) {
            var username = localStorage.getItem('username');
            document.getElementById('username').value = username;
            }

            setTimeout(function() {
                document.getElementById("loadingindicator").className = "animated fadeOut";
            }, 1000);
            setTimeout(function() {
                document.getElementById("loadingindicator").style.display = "none";
            }, 2000);

            setTimeout(function() {
                document.getElementById("mainmenu").style.display = "block";
                document.getElementById("mainmenu").className = "nicewindow animated fadeIn";
            }, 2500);
        });



	function updatePassword(){
	password=$("#password").val();
	confirm_password=$("#confirm_password").val();
	username=$("#username").val();
	if(password == confirm_password){
	var randomclientid = Math.floor(Math.random() * 1000000000);
	$.get("http://250taxi.com/app/password_recovery.php?task=update_password&password="+password+"&username=<?php echo $username; ?>", function(data) {
	$(".msg").html(data);
	});
	}
	else{
		$(".msg").html("Passwords do not match");
	}
	}

    </script>

	