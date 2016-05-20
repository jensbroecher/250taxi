var hash = false;
checkHash();

function checkHash() {
	if (window.location.hash != hash) {
		hash = window.location.hash;
		processHash(hash);
	}
	t = setTimeout("checkHash()", 100);
}

function processHash(hash) {

	console.log("Hash has changed to " + hash + "");


	if (hash == "#start") {            
			reg_start_open = localStorage.getItem("reg_start_open");
        
            if (reg_start_open == "Yes") {
                close_reg_start();
                localStorage.setItem("reg_start_open","No");
            }
	}
	
}
