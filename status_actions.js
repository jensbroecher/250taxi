function status_accepted() {
    console.log("Info from Server Status: Driver has accepted!");
    localStorage.setItem("activity", "driver_has_accepted");
    localStorage.setItem("toast", "Driver accepted and is on his way to you!");
    toast_big();
    accepted();
}

function status_summary() {
    console.log("Info from Server Status: Ratings screen");
    localStorage.setItem("activity", "summary");
    localStorage.setItem("toast", "Journey has ended");
    toast();
    summary();
}

function driver_assigned() {
    console.log("Info from Server Status: Driver got assigned by customer care");
    localStorage.setItem("activity", "driver_assigned");
    localStorage.setItem("toast", "Driver got assigned to you by customer care.");
    toast();
}