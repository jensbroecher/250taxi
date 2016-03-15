$( document ).ready(function() {
localStorage.setItem("toast_status","end");
localStorage.setItem("toast_big_status","end");
var toast = document.createElement('div');
var toast_big = document.createElement('div');
toast.innerHTML = "<div id='toast_inside'></div>";
toast_big.innerHTML = "<div id='toast_big_inside'></div>";
toast.setAttribute('id', 'toast');
toast_big.setAttribute('id', 'toast_big');
document.body.appendChild(toast);
document.body.appendChild(toast_big);
});

function toast() {

var toast_status = localStorage.getItem("toast_status");

if (toast_status == "end") {
localStorage.setItem("toast_status","start");
toast_circle();
}

function toast_circle() {
document.getElementById("toast").style.display = "block";
document.getElementById("toast").className = "animated zoomIn";

setTimeout(function(){ 
window.navigator.vibrate([100,30,100,30,100]);
}, 1000);
	
var toast_text = localStorage.getItem("toast");
	
document.getElementById("toast_inside").innerHTML = toast_text;
var toastaudio = new Audio('http://250taxi.com/sounds/hollow_p-dog-7588_hifi.mp3');toastaudio.play();
toast_end_animation1 = setTimeout(function(){ 
document.getElementById("toast").className = "animated zoomOut";
}, 3000);
toast_end_animation2 = setTimeout(function(){ 
document.getElementById("toast").style.display = "none";
localStorage.setItem("toast_status","end");
}, 4000); 
}

}













function toast_big() {

var toast_big_status = localStorage.getItem("toast_big_status");

if (toast_big_status == "end") {
localStorage.setItem("toast_big_status","start");
toast_big_circle();
}

function toast_big_circle() {
document.getElementById("toast_big").style.display = "block";
document.getElementById("toast_big").className = "animated zoomIn";

setTimeout(function(){ 
window.navigator.vibrate([100,30,100,30,100]);
}, 1000);

var toast_text = localStorage.getItem("toast");
	
document.getElementById("toast_big_inside").innerHTML = toast_text;
var toastaudio = new Audio('http://250taxi.com/sounds/hollow_p-dog-7588_hifi.mp3');toastaudio.play();
toast_end_animation1 = setTimeout(function(){ 
document.getElementById("toast_big").className = "animated zoomOut";
}, 17000);
toast_end_animation2 = setTimeout(function(){ 
document.getElementById("toast_big").style.display = "none";
localStorage.setItem("toast_big_status","end");
}, 18000); 
}

}