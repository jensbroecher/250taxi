<?php
 header("Access-Control-Allow-Origin: *");
?>
<?php 
require  'http://250taxi.com/db/medoo.min.php';
require  'http://250taxi.com/db/db_config.php';
if(isset($_GET["task"])){
$task=$_GET["task"];
}
if(isset($_GET["username"])){
$username=$_GET["username"];
}
if($task=="username_exists"){
	$data = $db->select("accounts_250", [
		"username",
	], [
		//"status" => "online"
	]);
	if(data !=""){
		echo "Please check your email for Password Recover Link";
	}
	else{
		echo "No account found with this username";
	}
}
?>