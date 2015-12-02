$( document ).ready(function() {
var toast = document.createElement('div');
toast.innerHTML = "<div id='toast_inside'></div>";
toast.setAttribute('id', 'toast');
document.body.appendChild(toast);
});

function toast() {
window.clearTimeout(toast_end_animation1);
window.clearTimeout(toast_end_animation2);
document.getElementById("toast").style.display = "block";
document.getElementById("toast").className = "animated fadeInUp";
document.getElementById("toast_inside").innerHTML = localStorage.getItem("toast");
var toastaudio = new Audio('http://250taxi.com/sounds/hollow_p-dog-7588_hifi.mp3');toastaudio.play();
var toast_end_animation1 = setTimeout(function(){ 
document.getElementById("toast").className = "animated zoomOut";
}, 3000);
var toast_end_animation2 = setTimeout(function(){ 
document.getElementById("toast").style.display = "none";
}, 4000);
}