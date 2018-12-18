/**
 * (c) 2018 Nélson Rafael Martins All Rights Reserverd
 */
(function() {
	var myVar = setInterval(myTimer, 1000);
	var counter = 0;

	function myTimer() {
		var now = new Date();
		counter++;
		if (counter >= 60 || now.getHours() == 2 || now.getHours() == 19
				|| (now.getHours() == 10 && now.getMinutes() >= 30)) {
			window.location = "index.html";
		}
	}

	function init() {
	}

	window.onload = init;
}());