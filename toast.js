$( document ).ready(function() {
localStorage.setItem("toast_status","end");
var toast = document.createElement('div');
toast.innerHTML = "<div id='toast_inside'></div>";
toast.setAttribute('id', 'toast');
document.body.appendChild(toast);
});

function toast() {

var toast_status = localStorage.getItem("toast_status");

if (toast_status == "end") {
localStorage.setItem("toast_status","start");
toast_circle();
}

function toast_circle() {
document.getElementById("toast").style.display = "block";
document.getElementById("toast").className = "animated fadeInUp";
document.getElementById("toast_inside").innerHTML = localStorage.getItem("toast");
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