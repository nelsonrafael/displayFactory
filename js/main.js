/**
 * (c) 2018 Nélson Rafael Martins All Rights Reserverd
 */
(function() {
	var myVar = setInterval(myTimer, 1000);
	var counter1 = 0, counter2 = 0;
	var server_ip = "192.168.14.34";
	var server_port = 8080;
	var arrayLines = [];
	var rotationTimer = 60, totalTimer = 5 * rotationTimer;
	var arrayCTrab = [ 50010, 50030, 50050, 50060 ];
	var arrayTotal = [ 50010, 50020, 50030, 50050, 50060, 50080, 50090, 50120,
			50140, 50180, 50190 ];
	var arrayTotal2 = [];
	var finalLines = [];
	var totalLines = [];
	var mainIndex = 0, tempVar1 = 0, tempVar2 = 0;
	var KEY_ENTER = 13, KEY_RED = 403, KEY_GREEN = 404, KEY_BLUE = 406, KEY_BACK = 10009, KEY_LEFT = 37, KEY_UP = 38, KEY_RIGHT = 39, KEY_DOWN = 40, KEY_ZERO = 48, KEY_ONE = 49, KEY_TWO = 50, KEY_THREE = 51, KEY_FOUR = 52, KEY_FIVE = 53, KEY_SIX = 54, KEY_SEVEN = 55, KEY_EIGHT = 56, KEY_NINE = 57;
	var menuVar = false;
	var menuIndex = 0;
	var menuSelected = false;
	var cookie_ip = '', cookie_port = '', cookie_line1 = '', cookie_line2 = '', cookie_line3 = '', cookie_line4 = '';

	function verifyCTrab(id) {
		for (var i = 0; i < arrayTotal.length; i++) {
			if (Number(id) === arrayTotal[i]) {
				return true;
			}
		}
		return false;
	}

	function chooseLines() {
		var i, j;
		for (i = 0; i < arrayLines.length; i++) {
			for (j = 0; j < arrayCTrab.length; j++) {
				if (parseInt(arrayLines[i].ctrab) === arrayCTrab[j]
						&& arrayLines[i].turno !== "TOTAL") {
					finalLines[j] = arrayLines[i];
					j++;
				}
			}
			for (j = 0; j < arrayCTrab.length; j++) {
				if (parseInt(arrayLines[i].ctrab) === arrayCTrab[j]
						&& arrayLines[i].turno === "TOTAL") {
					totalLines[j] = arrayLines[i];
					j++;
				}
			}
			for (j = 0; j < arrayTotal.length; j++) {
				if (parseInt(arrayLines[i].ctrab) === arrayTotal[j]
						&& arrayLines[i].turno === "TOTAL") {
					arrayTotal2[j] = arrayLines[i];
					j++;
				}
			}
		}
		if (finalLines[mainIndex].estado === "PARADO") {
			updateMainIndex();
		}
		updatePaint();
		mainDisplay();
		secondaryDisplay();
	}

	function displayTemp() {
		document.getElementById("tempAreaOneTitle").innerHTML = arrayTotal2[0].descritivo;
		document.getElementById("tempAreaOneStatus").innerHTML = arrayTotal2[0].estado;
		document.getElementById("tempAreaOneZoneOne").innerHTML = arrayTotal2[0].realhora;
		var temp = arrayTotal2[0].realhora - arrayTotal2[0].objhora;
		if (arrayTotal2[0].estado === "PARADO" && arrayTotal2[0].qtprod === 0) {
			document.getElementById("tempAreaOneZoneTwo").innerHTML = "";
		} else if (temp >= 0) {
			temp = "+" + temp;
			document.getElementById("tempAreaOneZoneTwo").innerHTML = temp;
			document.getElementById("tempAreaOneZoneTwo").style.color = "#00ff00";
		} else {
			document.getElementById("tempAreaOneZoneTwo").style.color = "#ff0000";
			document.getElementById("tempAreaOneZoneTwo").innerHTML = temp;
		}
		temp = arrayTotal2[0].qtprod + arrayTotal2[0].qtrwk;
		document.getElementById("tempAreaOneZoneThree").innerHTML = temp
				.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
		if (arrayTotal2[0].estado === "PRODUCAO") {
			document.getElementById("tempAreaOnePaint").style.backgroundColor = "#009900";
		} else if (arrayTotal2[0].estado === "PARADO") {
			document.getElementById("tempAreaOnePaint").style.backgroundColor = "#000000";
		} else if (arrayTotal2[0].estado === "IMPRODUTIVO") {
			document.getElementById("tempAreaOnePaint").style.backgroundColor = "#cc0000";
		} else if (arrayTotal2[0].estado === "SETUP") {
			document.getElementById("tempAreaOnePaint").style.backgroundColor = "#e6e600";
		} else if (arrayTotal2[0].estado === "REWORKS") {
			document.getElementById("tempAreaOnePaint").style.backgroundColor = "#e6e600";
		} else if (arrayTotal2[0].estado === "INTERVALO") {
			document.getElementById("tempAreaOnePaint").style.backgroundColor = "#000000";
		}
		document.getElementById("tempAreaTwoTitle").innerHTML = arrayTotal2[1].descritivo;
		document.getElementById("tempAreaTwoStatus").innerHTML = arrayTotal2[1].estado;
		document.getElementById("tempAreaTwoZoneOne").innerHTML = arrayTotal2[1].realhora;
		temp = arrayTotal2[1].realhora - arrayTotal2[1].objhora;
		if (arrayTotal2[1].estado === "PARADO" && arrayTotal2[1].qtprod === 0) {
			document.getElementById("tempAreaTwoZoneTwo").innerHTML = "";
		} else if (temp >= 0) {
			temp = "+" + temp;
			document.getElementById("tempAreaTwoZoneTwo").innerHTML = temp;
			document.getElementById("tempAreaTwoZoneTwo").style.color = "#00ff00";
		} else {
			document.getElementById("tempAreaTwoZoneTwo").style.color = "#ff0000";
			document.getElementById("tempAreaTwoZoneTwo").innerHTML = temp;
		}
		temp = arrayTotal2[1].qtprod + arrayTotal2[1].qtrwk;
		document.getElementById("tempAreaTwoZoneThree").innerHTML = temp
				.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
		if (arrayTotal2[1].estado === "PRODUCAO") {
			document.getElementById("tempAreaTwoPaint").style.backgroundColor = "#009900";
		} else if (arrayTotal2[1].estado === "PARADO") {
			document.getElementById("tempAreaTwoPaint").style.backgroundColor = "#000000";
		} else if (arrayTotal2[1].estado === "IMPRODUTIVO") {
			document.getElementById("tempAreaTwoPaint").style.backgroundColor = "#cc0000";
		} else if (arrayTotal2[1].estado === "SETUP") {
			document.getElementById("tempAreaTwoPaint").style.backgroundColor = "#e6e600";
		} else if (arrayTotal2[1].estado === "REWORKS") {
			document.getElementById("tempAreaTwoPaint").style.backgroundColor = "#e6e600";
		} else if (arrayTotal2[1].estado === "INTERVALO") {
			document.getElementById("tempAreaTwoPaint").style.backgroundColor = "#000000";
		}
		document.getElementById("tempAreaThreeTitle").innerHTML = arrayTotal2[2].descritivo;
		document.getElementById("tempAreaThreeStatus").innerHTML = arrayTotal2[2].estado;
		document.getElementById("tempAreaThreeZoneOne").innerHTML = arrayTotal2[2].realhora;
		temp = arrayTotal2[2].realhora - arrayTotal2[2].objhora;
		if (arrayTotal2[2].estado === "PARADO" && arrayTotal2[2].qtprod === 0) {
			document.getElementById("tempAreaThreeZoneTwo").innerHTML = "";
		} else if (temp >= 0) {
			temp = "+" + temp;
			document.getElementById("tempAreaThreeZoneTwo").innerHTML = temp;
			document.getElementById("tempAreaThreeZoneTwo").style.color = "#00ff00";
		} else {
			document.getElementById("tempAreaThreeZoneTwo").style.color = "#ff0000";
			document.getElementById("tempAreaThreeZoneTwo").innerHTML = temp;
		}
		temp = arrayTotal2[2].qtprod + arrayTotal2[2].qtrwk;
		document.getElementById("tempAreaThreeZoneThree").innerHTML = temp
				.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
		if (arrayTotal2[2].estado === "PRODUCAO") {
			document.getElementById("tempAreaThreePaint").style.backgroundColor = "#009900";
		} else if (arrayTotal2[2].estado === "PARADO") {
			document.getElementById("tempAreaThreePaint").style.backgroundColor = "#000000";
		} else if (arrayTotal2[2].estado === "IMPRODUTIVO") {
			document.getElementById("tempAreaThreePaint").style.backgroundColor = "#cc0000";
		} else if (arrayTotal2[2].estado === "SETUP") {
			document.getElementById("tempAreaThreePaint").style.backgroundColor = "#e6e600";
		} else if (arrayTotal2[2].estado === "REWORKS") {
			document.getElementById("tempAreaThreePaint").style.backgroundColor = "#e6e600";
		} else if (arrayTotal2[2].estado === "INTERVALO") {
			document.getElementById("tempAreaThreePaint").style.backgroundColor = "#000000";
		}
		document.getElementById("tempAreaFourTitle").innerHTML = arrayTotal2[3].descritivo;
		document.getElementById("tempAreaFourStatus").innerHTML = arrayTotal2[3].estado;
		document.getElementById("tempAreaFourZoneOne").innerHTML = arrayTotal2[3].realhora;
		temp = arrayTotal2[3].realhora - arrayTotal2[3].objhora;
		if (arrayTotal2[3].estado === "PARADO" && arrayTotal2[3].qtprod === 0) {
			document.getElementById("tempAreaFourZoneTwo").innerHTML = "";
		} else if (temp >= 0) {
			temp = "+" + temp;
			document.getElementById("tempAreaFourZoneTwo").innerHTML = temp;
			document.getElementById("tempAreaFourZoneTwo").style.color = "#00ff00";
		} else {
			document.getElementById("tempAreaFourZoneTwo").style.color = "#ff0000";
			document.getElementById("tempAreaFourZoneTwo").innerHTML = temp;
		}
		temp = arrayTotal2[3].qtprod + arrayTotal2[3].qtrwk;
		document.getElementById("tempAreaFourZoneThree").innerHTML = temp
				.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
		if (arrayTotal2[3].estado === "PRODUCAO") {
			document.getElementById("tempAreaFourPaint").style.backgroundColor = "#009900";
		} else if (arrayTotal2[3].estado === "PARADO") {
			document.getElementById("tempAreaFourPaint").style.backgroundColor = "#000000";
		} else if (arrayTotal2[3].estado === "IMPRODUTIVO") {
			document.getElementById("tempAreaFourPaint").style.backgroundColor = "#cc0000";
		} else if (arrayTotal2[3].estado === "SETUP") {
			document.getElementById("tempAreaFourPaint").style.backgroundColor = "#e6e600";
		} else if (arrayTotal2[3].estado === "REWORKS") {
			document.getElementById("tempAreaFourPaint").style.backgroundColor = "#e6e600";
		} else if (arrayTotal2[3].estado === "INTERVALO") {
			document.getElementById("tempAreaFourPaint").style.backgroundColor = "#000000";
		}
		document.getElementById("tempAreaFiveTitle").innerHTML = arrayTotal2[4].descritivo;
		document.getElementById("tempAreaFiveStatus").innerHTML = arrayTotal2[4].estado;
		document.getElementById("tempAreaFiveZoneOne").innerHTML = arrayTotal2[4].realhora;
		temp = arrayTotal2[4].realhora - arrayTotal2[4].objhora;
		if (arrayTotal2[4].estado === "PARADO" && arrayTotal2[4].qtprod === 0) {
			document.getElementById("tempAreaFiveZoneTwo").innerHTML = "";
		} else if (temp >= 0) {
			temp = "+" + temp;
			document.getElementById("tempAreaFiveZoneTwo").innerHTML = temp;
			document.getElementById("tempAreaFiveZoneTwo").style.color = "#00ff00";
		} else {
			document.getElementById("tempAreaFiveZoneTwo").style.color = "#ff0000";
			document.getElementById("tempAreaFiveZoneTwo").innerHTML = temp;
		}
		temp = arrayTotal2[4].qtprod + arrayTotal2[4].qtrwk;
		document.getElementById("tempAreaFiveZoneThree").innerHTML = temp
				.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
		if (arrayTotal2[4].estado === "PRODUCAO") {
			document.getElementById("tempAreaFivePaint").style.backgroundColor = "#009900";
		} else if (arrayTotal2[4].estado === "PARADO") {
			document.getElementById("tempAreaFivePaint").style.backgroundColor = "#000000";
		} else if (arrayTotal2[4].estado === "IMPRODUTIVO") {
			document.getElementById("tempAreaFivePaint").style.backgroundColor = "#cc0000";
		} else if (arrayTotal2[4].estado === "SETUP") {
			document.getElementById("tempAreaFivePaint").style.backgroundColor = "#e6e600";
		} else if (arrayTotal2[4].estado === "REWORKS") {
			document.getElementById("tempAreaFivePaint").style.backgroundColor = "#e6e600";
		} else if (arrayTotal2[4].estado === "INTERVALO") {
			document.getElementById("tempAreaFivePaint").style.backgroundColor = "#000000";
		}
		document.getElementById("tempAreaSixTitle").innerHTML = arrayTotal2[5].descritivo;
		document.getElementById("tempAreaSixStatus").innerHTML = arrayTotal2[5].estado;
		document.getElementById("tempAreaSixZoneOne").innerHTML = arrayTotal2[5].realhora;
		temp = arrayTotal2[5].realhora - arrayTotal2[5].objhora;
		if (arrayTotal2[5].estado === "PARADO" && arrayTotal2[5].qtprod === 0) {
			document.getElementById("tempAreaSixZoneTwo").innerHTML = "";
		} else if (temp >= 0) {
			temp = "+" + temp;
			document.getElementById("tempAreaSixZoneTwo").innerHTML = temp;
			document.getElementById("tempAreaSixZoneTwo").style.color = "#00ff00";
		} else {
			document.getElementById("tempAreaSixZoneTwo").style.color = "#ff0000";
			document.getElementById("tempAreaSixZoneTwo").innerHTML = temp;
		}
		temp = arrayTotal2[5].qtprod + arrayTotal2[5].qtrwk;
		document.getElementById("tempAreaSixZoneThree").innerHTML = temp
				.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
		if (arrayTotal2[5].estado === "PRODUCAO") {
			document.getElementById("tempAreaSixPaint").style.backgroundColor = "#009900";
		} else if (arrayTotal2[5].estado === "PARADO") {
			document.getElementById("tempAreaSixPaint").style.backgroundColor = "#000000";
		} else if (arrayTotal2[5].estado === "IMPRODUTIVO") {
			document.getElementById("tempAreaSixPaint").style.backgroundColor = "#cc0000";
		} else if (arrayTotal2[5].estado === "SETUP") {
			document.getElementById("tempAreaSixPaint").style.backgroundColor = "#e6e600";
		} else if (arrayTotal2[5].estado === "REWORKS") {
			document.getElementById("tempAreaSixPaint").style.backgroundColor = "#e6e600";
		} else if (arrayTotal2[5].estado === "INTERVALO") {
			document.getElementById("tempAreaSixPaint").style.backgroundColor = "#000000";
		}
		document.getElementById("tempAreaSevenTitle").innerHTML = arrayTotal2[6].descritivo;
		document.getElementById("tempAreaSevenStatus").innerHTML = arrayTotal2[6].estado;
		document.getElementById("tempAreaSevenZoneOne").innerHTML = arrayTotal2[6].realhora;
		temp = arrayTotal2[6].realhora - arrayTotal2[6].objhora;
		if (arrayTotal2[6].estado === "PARADO" && arrayTotal2[6].qtprod === 0) {
			document.getElementById("tempAreaSevenZoneTwo").innerHTML = "";
		} else if (temp >= 0) {
			temp = "+" + temp;
			document.getElementById("tempAreaSevenZoneTwo").innerHTML = temp;
			document.getElementById("tempAreaSevenZoneTwo").style.color = "#00ff00";
		} else {
			document.getElementById("tempAreaSevenZoneTwo").style.color = "#ff0000";
			document.getElementById("tempAreaSevenZoneTwo").innerHTML = temp;
		}
		temp = arrayTotal2[6].qtprod + arrayTotal2[6].qtrwk;
		document.getElementById("tempAreaSevenZoneThree").innerHTML = temp
				.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
		if (arrayTotal2[6].estado === "PRODUCAO") {
			document.getElementById("tempAreaSevenPaint").style.backgroundColor = "#009900";
		} else if (arrayTotal2[6].estado === "PARADO") {
			document.getElementById("tempAreaSevenPaint").style.backgroundColor = "#000000";
		} else if (arrayTotal2[6].estado === "IMPRODUTIVO") {
			document.getElementById("tempAreaSevenPaint").style.backgroundColor = "#cc0000";
		} else if (arrayTotal2[6].estado === "SETUP") {
			document.getElementById("tempAreaSevenPaint").style.backgroundColor = "#e6e600";
		} else if (arrayTotal2[6].estado === "REWORKS") {
			document.getElementById("tempAreaSevenPaint").style.backgroundColor = "#e6e600";
		} else if (arrayTotal2[6].estado === "INTERVALO") {
			document.getElementById("tempAreaSevenPaint").style.backgroundColor = "#000000";
		}
		document.getElementById("tempAreaEightTitle").innerHTML = arrayTotal2[7].descritivo;
		document.getElementById("tempAreaEightStatus").innerHTML = arrayTotal2[7].estado;
		document.getElementById("tempAreaEightZoneOne").innerHTML = arrayTotal2[7].realhora;
		temp = arrayTotal2[7].realhora - arrayTotal2[7].objhora;
		if (arrayTotal2[7].estado === "PARADO" && arrayTotal2[7].qtprod === 0) {
			document.getElementById("tempAreaEightZoneTwo").innerHTML = "";
		} else if (temp >= 0) {
			temp = "+" + temp;
			document.getElementById("tempAreaEightZoneTwo").innerHTML = temp;
			document.getElementById("tempAreaEightZoneTwo").style.color = "#00ff00";
		} else {
			document.getElementById("tempAreaEightZoneTwo").style.color = "#ff0000";
			document.getElementById("tempAreaEightZoneTwo").innerHTML = temp;
		}
		temp = arrayTotal2[7].qtprod + arrayTotal2[7].qtrwk;
		document.getElementById("tempAreaEightZoneThree").innerHTML = temp
				.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
		if (arrayTotal2[7].estado === "PRODUCAO") {
			document.getElementById("tempAreaEightPaint").style.backgroundColor = "#009900";
		} else if (arrayTotal2[7].estado === "PARADO") {
			document.getElementById("tempAreaEightPaint").style.backgroundColor = "#000000";
		} else if (arrayTotal2[7].estado === "IMPRODUTIVO") {
			document.getElementById("tempAreaEightPaint").style.backgroundColor = "#cc0000";
		} else if (arrayTotal2[7].estado === "SETUP") {
			document.getElementById("tempAreaEightPaint").style.backgroundColor = "#e6e600";
		} else if (arrayTotal2[7].estado === "REWORKS") {
			document.getElementById("tempAreaEightPaint").style.backgroundColor = "#e6e600";
		} else if (arrayTotal2[7].estado === "INTERVALO") {
			document.getElementById("tempAreaEightPaint").style.backgroundColor = "#000000";
		}
		document.getElementById("tempAreaNineTitle").innerHTML = arrayTotal2[8].descritivo;
		document.getElementById("tempAreaNineStatus").innerHTML = arrayTotal2[8].estado;
		document.getElementById("tempAreaNineZoneOne").innerHTML = arrayTotal2[8].realhora;
		temp = arrayTotal2[8].realhora - arrayTotal2[8].objhora;
		if (arrayTotal2[8].estado === "PARADO" && arrayTotal2[8].qtprod === 0) {
			document.getElementById("tempAreaNineZoneTwo").innerHTML = "";
		} else if (temp >= 0) {
			temp = "+" + temp;
			document.getElementById("tempAreaNineZoneTwo").innerHTML = temp;
			document.getElementById("tempAreaNineZoneTwo").style.color = "#00ff00";
		} else {
			document.getElementById("tempAreaNineZoneTwo").style.color = "#ff0000";
			document.getElementById("tempAreaNineZoneTwo").innerHTML = temp;
		}
		temp = arrayTotal2[8].qtprod + arrayTotal2[8].qtrwk;
		document.getElementById("tempAreaNineZoneThree").innerHTML = temp
				.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
		if (arrayTotal2[8].estado === "PRODUCAO") {
			document.getElementById("tempAreaNinePaint").style.backgroundColor = "#009900";
		} else if (arrayTotal2[8].estado === "PARADO") {
			document.getElementById("tempAreaNinePaint").style.backgroundColor = "#000000";
		} else if (arrayTotal2[8].estado === "IMPRODUTIVO") {
			document.getElementById("tempAreaNinePaint").style.backgroundColor = "#cc0000";
		} else if (arrayTotal2[8].estado === "SETUP") {
			document.getElementById("tempAreaNinePaint").style.backgroundColor = "#e6e600";
		} else if (arrayTotal2[8].estado === "REWORKS") {
			document.getElementById("tempAreaNinePaint").style.backgroundColor = "#e6e600";
		} else if (arrayTotal2[8].estado === "INTERVALO") {
			document.getElementById("tempAreaNinePaint").style.backgroundColor = "#000000";
		}
		document.getElementById("tempAreaTenTitle").innerHTML = arrayTotal2[9].descritivo;
		document.getElementById("tempAreaTenStatus").innerHTML = arrayTotal2[9].estado;
		document.getElementById("tempAreaTenZoneOne").innerHTML = arrayTotal2[9].realhora;
		temp = arrayTotal2[9].realhora - arrayTotal2[9].objhora;
		if (arrayTotal2[9].estado === "PARADO" && arrayTotal2[9].qtprod === 0) {
			document.getElementById("tempAreaTenZoneTwo").innerHTML = "";
		} else if (temp >= 0) {
			temp = "+" + temp;
			document.getElementById("tempAreaTenZoneTwo").innerHTML = temp;
			document.getElementById("tempAreaTenZoneTwo").style.color = "#00ff00";
		} else {
			document.getElementById("tempAreaTenZoneTwo").style.color = "#ff0000";
			document.getElementById("tempAreaTenZoneTwo").innerHTML = temp;
		}
		temp = arrayTotal2[9].qtprod + arrayTotal2[9].qtrwk;
		document.getElementById("tempAreaTenZoneThree").innerHTML = temp
				.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
		if (arrayTotal2[9].estado === "PRODUCAO") {
			document.getElementById("tempAreaTenPaint").style.backgroundColor = "#009900";
		} else if (arrayTotal2[9].estado === "PARADO") {
			document.getElementById("tempAreaTenPaint").style.backgroundColor = "#000000";
		} else if (arrayTotal2[9].estado === "IMPRODUTIVO") {
			document.getElementById("tempAreaTenPaint").style.backgroundColor = "#cc0000";
		} else if (arrayTotal2[9].estado === "SETUP") {
			document.getElementById("tempAreaTenPaint").style.backgroundColor = "#e6e600";
		} else if (arrayTotal2[9].estado === "REWORKS") {
			document.getElementById("tempAreaTenPaint").style.backgroundColor = "#e6e600";
		} else if (arrayTotal2[9].estado === "INTERVALO") {
			document.getElementById("tempAreaTenPaint").style.backgroundColor = "#000000";
		}
		document.getElementById("tempAreaElevenTitle").innerHTML = arrayTotal2[10].descritivo;
		document.getElementById("tempAreaElevenStatus").innerHTML = arrayTotal2[10].estado;
		document.getElementById("tempAreaElevenZoneOne").innerHTML = arrayTotal2[10].realhora;
		temp = arrayTotal2[10].realhora - arrayTotal2[10].objhora;
		if (arrayTotal2[10].estado === "PARADO" && arrayTotal2[10].qtprod === 0) {
			document.getElementById("tempAreaElevenZoneTwo").innerHTML = "";
		} else if (temp >= 0) {
			temp = "+" + temp;
			document.getElementById("tempAreaElevenZoneTwo").innerHTML = temp;
			document.getElementById("tempAreaElevenZoneTwo").style.color = "#00ff00";
		} else {
			document.getElementById("tempAreaElevenZoneTwo").style.color = "#ff0000";
			document.getElementById("tempAreaElevenZoneTwo").innerHTML = temp;
		}
		temp = arrayTotal2[10].qtprod + arrayTotal2[10].qtrwk;
		document.getElementById("tempAreaElevenZoneThree").innerHTML = temp
				.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
		if (arrayTotal2[10].estado === "PRODUCAO") {
			document.getElementById("tempAreaElevenPaint").style.backgroundColor = "#009900";
		} else if (arrayTotal2[10].estado === "PARADO") {
			document.getElementById("tempAreaElevenPaint").style.backgroundColor = "#000000";
		} else if (arrayTotal2[10].estado === "IMPRODUTIVO") {
			document.getElementById("tempAreaElevenPaint").style.backgroundColor = "#cc0000";
		} else if (arrayTotal2[10].estado === "SETUP") {
			document.getElementById("tempAreaElevenPaint").style.backgroundColor = "#e6e600";
		} else if (arrayTotal2[10].estado === "REWORKS") {
			document.getElementById("tempAreaElevenPaint").style.backgroundColor = "#e6e600";
		} else if (arrayTotal2[10].estado === "INTERVALO") {
			document.getElementById("tempAreaElevenPaint").style.backgroundColor = "#000000";
		}
	}

	function setVisible() {
		document.getElementById("tempAreaOne").style.visibility = "visible";
		document.getElementById("tempAreaTwo").style.visibility = "visible";
		document.getElementById("tempAreaThree").style.visibility = "visible";
		document.getElementById("tempAreaFour").style.visibility = "visible";
		document.getElementById("tempAreaFive").style.visibility = "visible";
		document.getElementById("tempAreaSix").style.visibility = "visible";
		document.getElementById("tempAreaSeven").style.visibility = "visible";
		document.getElementById("tempAreaEight").style.visibility = "visible";
		document.getElementById("tempAreaNine").style.visibility = "visible";
		document.getElementById("tempAreaTen").style.visibility = "visible";
		document.getElementById("tempAreaEleven").style.visibility = "visible";
		document.getElementById("tempAreaTwelve").style.visibility = "visible";
	}

	function setHidden() {
		document.getElementById("tempAreaOne").style.visibility = "hidden";
		document.getElementById("tempAreaTwo").style.visibility = "hidden";
		document.getElementById("tempAreaThree").style.visibility = "hidden";
		document.getElementById("tempAreaFour").style.visibility = "hidden";
		document.getElementById("tempAreaFive").style.visibility = "hidden";
		document.getElementById("tempAreaSix").style.visibility = "hidden";
		document.getElementById("tempAreaSeven").style.visibility = "hidden";
		document.getElementById("tempAreaEight").style.visibility = "hidden";
		document.getElementById("tempAreaNine").style.visibility = "hidden";
		document.getElementById("tempAreaTen").style.visibility = "hidden";
		document.getElementById("tempAreaEleven").style.visibility = "hidden";
		document.getElementById("tempAreaTwelve").style.visibility = "hidden";
	}

	function updateMainIndex() {
		var size = arrayCTrab.length, i = 0, j = 0;
		for (; i < size; i++) {
			if (finalLines[i].estado === "PARADO") {
				j++;
			}
		}
		mainIndex++;
		if (j !== size) {
			if (mainIndex >= size) {
				mainIndex = 0;
				tempVar1 = 1;
				if (finalLines[mainIndex].estado === "PARADO") {
					updateMainIndex();
				}
			} else if (finalLines[mainIndex].estado === "PARADO") {
				updateMainIndex();
			}
		} else {
			if (mainIndex >= size) {
				mainIndex = 0;
				tempVar1 = 1;
			}
		}
	}

	function updatePaint() {
		document.getElementById("mainAreaTitle").style.color = "#ffffff";
		document.getElementById("mainAreaStatus").style.color = "#ffffff";
		if (finalLines[mainIndex].estado === "PRODUCAO") {
			document.getElementById("mainAreaPaint").style.backgroundColor = "#009900";
		} else if (finalLines[mainIndex].estado === "PARADO") {
			document.getElementById("mainAreaPaint").style.backgroundColor = "#000000";
		} else if (finalLines[mainIndex].estado === "IMPRODUTIVO") {
			document.getElementById("mainAreaPaint").style.backgroundColor = "#cc0000";
			// window.location="screensaver.html";
			// window.location="screenplayer.html";
		} else if (finalLines[mainIndex].estado === "SETUP") {
			document.getElementById("mainAreaPaint").style.backgroundColor = "#e6e600";
			document.getElementById("mainAreaTitle").style.color = "#000000";
			document.getElementById("mainAreaStatus").style.color = "#000000";
		} else if (finalLines[mainIndex].estado === "REWORKS") {
			document.getElementById("mainAreaPaint").style.backgroundColor = "#e6e600";
			document.getElementById("mainAreaTitle").style.color = "#000000";
			document.getElementById("mainAreaStatus").style.color = "#000000";
		} else if (finalLines[mainIndex].estado === "INTERVALO") {
			document.getElementById("mainAreaPaint").style.backgroundColor = "#000000";
		}
		if (finalLines[0].estado === "PRODUCAO") {
			document.getElementById("secondaryAreaOnePaint").style.backgroundColor = "#009900";
		} else if (finalLines[0].estado === "PARADO") {
			document.getElementById("secondaryAreaOnePaint").style.backgroundColor = "#000000";
		} else if (finalLines[0].estado === "IMPRODUTIVO") {
			document.getElementById("secondaryAreaOnePaint").style.backgroundColor = "#cc0000";
		} else if (finalLines[0].estado === "SETUP") {
			document.getElementById("secondaryAreaOnePaint").style.backgroundColor = "#e6e600";
		} else if (finalLines[0].estado === "REWORKS") {
			document.getElementById("secondaryAreaOnePaint").style.backgroundColor = "#e6e600";
		} else if (finalLines[0].estado === "INTERVALO") {
			document.getElementById("secondaryAreaOnePaint").style.backgroundColor = "#000000";
		}
		if (finalLines[1].estado === "PRODUCAO") {
			document.getElementById("secondaryAreaTwoPaint").style.backgroundColor = "#009900";
		} else if (finalLines[1].estado === "PARADO") {
			document.getElementById("secondaryAreaTwoPaint").style.backgroundColor = "#000000";
		} else if (finalLines[1].estado === "IMPRODUTIVO") {
			document.getElementById("secondaryAreaTwoPaint").style.backgroundColor = "#cc0000";
		} else if (finalLines[1].estado === "SETUP") {
			document.getElementById("secondaryAreaTwoPaint").style.backgroundColor = "#e6e600";
		} else if (finalLines[1].estado === "REWORKS") {
			document.getElementById("secondaryAreaTwoPaint").style.backgroundColor = "#e6e600";
		} else if (finalLines[1].estado === "INTERVALO") {
			document.getElementById("secondaryAreaTwoPaint").style.backgroundColor = "#000000";
		}
		if (finalLines[2].estado === "PRODUCAO") {
			document.getElementById("secondaryAreaThreePaint").style.backgroundColor = "#009900";
		} else if (finalLines[2].estado === "PARADO") {
			document.getElementById("secondaryAreaThreePaint").style.backgroundColor = "#000000";
		} else if (finalLines[2].estado === "IMPRODUTIVO") {
			document.getElementById("secondaryAreaThreePaint").style.backgroundColor = "#cc0000";
		} else if (finalLines[2].estado === "SETUP") {
			document.getElementById("secondaryAreaThreePaint").style.backgroundColor = "#e6e600";
		} else if (finalLines[2].estado === "REWORKS") {
			document.getElementById("secondaryAreaThreePaint").style.backgroundColor = "#e6e600";
		} else if (finalLines[2].estado === "INTERVALO") {
			document.getElementById("secondaryAreaThreePaint").style.backgroundColor = "#000000";
		}
		if (finalLines[3].estado === "PRODUCAO") {
			document.getElementById("secondaryAreaFourPaint").style.backgroundColor = "#009900";
		} else if (finalLines[3].estado === "PARADO") {
			document.getElementById("secondaryAreaFourPaint").style.backgroundColor = "#000000";
		} else if (finalLines[3].estado === "IMPRODUTIVO") {
			document.getElementById("secondaryAreaFourPaint").style.backgroundColor = "#cc0000";
		} else if (finalLines[3].estado === "SETUP") {
			document.getElementById("secondaryAreaFourPaint").style.backgroundColor = "#e6e600";
		} else if (finalLines[3].estado === "REWORKS") {
			document.getElementById("secondaryAreaFourPaint").style.backgroundColor = "#e6e600";
		} else if (finalLines[3].estado === "INTERVALO") {
			document.getElementById("secondaryAreaFourPaint").style.backgroundColor = "#000000";
		}
	}

	function secondaryDisplay() {
		document.getElementById("secondaryAreaOneTitle").innerHTML = totalLines[0].descritivo;
		document.getElementById("secondaryAreaOneStatus").innerHTML = totalLines[0].estado;
		document.getElementById("secondaryAreaOneZoneOne").innerHTML = totalLines[0].realhora;
		var temp = totalLines[0].realhora - totalLines[0].objhora;
		if (totalLines[0].estado === "PARADO" && totalLines[0].qtprod === 0) {
			document.getElementById("secondaryAreaOneZoneTwo").innerHTML = "";
		} else if (temp >= 0) {
			temp = "+" + temp;
			document.getElementById("secondaryAreaOneZoneTwo").innerHTML = temp;
			document.getElementById("secondaryAreaOneZoneTwo").style.color = "#00ff00";
		} else {
			document.getElementById("secondaryAreaOneZoneTwo").style.color = "#ff0000";
			document.getElementById("secondaryAreaOneZoneTwo").innerHTML = temp;
		}
		temp = totalLines[0].qtprod + totalLines[0].qtrwk;
		document.getElementById("secondaryAreaOneZoneThree").innerHTML = temp
				.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
		document.getElementById("secondaryAreaTwoTitle").innerHTML = totalLines[1].descritivo;
		document.getElementById("secondaryAreaTwoStatus").innerHTML = totalLines[1].estado;
		document.getElementById("secondaryAreaTwoZoneOne").innerHTML = totalLines[1].realhora;
		temp = totalLines[1].realhora - totalLines[1].objhora;
		if (totalLines[1].estado === "PARADO" && totalLines[1].qtprod === 0) {
			document.getElementById("secondaryAreaTwoZoneTwo").innerHTML = "";
		} else if (temp >= 0) {
			temp = "+" + temp;
			document.getElementById("secondaryAreaTwoZoneTwo").innerHTML = temp;
			document.getElementById("secondaryAreaTwoZoneTwo").style.color = "#00ff00";
		} else {
			document.getElementById("secondaryAreaTwoZoneTwo").style.color = "#ff0000";
			document.getElementById("secondaryAreaTwoZoneTwo").innerHTML = temp;
		}
		temp = totalLines[1].qtprod + totalLines[1].qtrwk;
		document.getElementById("secondaryAreaTwoZoneThree").innerHTML = temp
				.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
		document.getElementById("secondaryAreaThreeTitle").innerHTML = totalLines[2].descritivo;
		document.getElementById("secondaryAreaThreeStatus").innerHTML = totalLines[2].estado;
		document.getElementById("secondaryAreaThreeZoneOne").innerHTML = totalLines[2].realhora;
		temp = totalLines[2].realhora - totalLines[2].objhora;
		if (totalLines[2].estado === "PARADO" && totalLines[2].qtprod === 0) {
			document.getElementById("secondaryAreaThreeZoneTwo").innerHTML = "";
		} else if (temp >= 0) {
			temp = "+" + temp;
			document.getElementById("secondaryAreaThreeZoneTwo").innerHTML = temp;
			document.getElementById("secondaryAreaThreeZoneTwo").style.color = "#00ff00";
		} else {
			document.getElementById("secondaryAreaThreeZoneTwo").style.color = "#ff0000";
			document.getElementById("secondaryAreaThreeZoneTwo").innerHTML = temp;
		}
		temp = totalLines[2].qtprod + totalLines[2].qtrwk;
		document.getElementById("secondaryAreaThreeZoneThree").innerHTML = temp
				.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
		document.getElementById("secondaryAreaFourTitle").innerHTML = totalLines[3].descritivo;
		document.getElementById("secondaryAreaFourStatus").innerHTML = totalLines[3].estado;
		document.getElementById("secondaryAreaFourZoneOne").innerHTML = totalLines[3].realhora;
		temp = totalLines[3].realhora - totalLines[3].objhora;
		if (totalLines[3].estado === "PARADO" && totalLines[3].qtprod === 0) {
			document.getElementById("secondaryAreaFourZoneTwo").innerHTML = "";
		} else if (temp >= 0) {
			temp = "+" + temp;
			document.getElementById("secondaryAreaFourZoneTwo").innerHTML = temp;
			document.getElementById("secondaryAreaFourZoneTwo").style.color = "#00ff00";
		} else {
			document.getElementById("secondaryAreaFourZoneTwo").style.color = "#ff0000";
			document.getElementById("secondaryAreaFourZoneTwo").innerHTML = temp;
		}
		document.getElementById("secondaryAreaFourZoneTwo").innerHTML = temp;
		temp = totalLines[3].qtprod + totalLines[3].qtrwk;
		if (temp < 1000) {
			document.getElementById("secondaryAreaFourZoneThree").innerHTML = temp;
		} else {
			document.getElementById("secondaryAreaFourZoneThree").innerHTML = temp
					.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
		}
	}

	function mainDisplay() {
		document.getElementById("mainAreaTitle").innerHTML = finalLines[mainIndex].descritivo;
		document.getElementById("mainAreaStatus").innerHTML = finalLines[mainIndex].estado;
		document.getElementById("mainAreaShift").innerHTML = finalLines[mainIndex].turno;
		document.getElementById("mainAreaZoneOne").innerHTML = finalLines[mainIndex].realhora;
		var temp = finalLines[mainIndex].realhora
				- finalLines[mainIndex].objhora;
		if (temp >= 0) {
			temp = "+" + temp;
			document.getElementById("mainAreaZoneTwo").innerHTML = temp;
			document.getElementById("mainAreaZoneTwo").style.color = "#00ff00";
		} else {
			document.getElementById("mainAreaZoneTwo").style.color = "#ff0000";
			document.getElementById("mainAreaZoneTwo").innerHTML = temp;
		}
		temp = finalLines[mainIndex].qtprod + finalLines[mainIndex].qtrwk;
		document.getElementById("mainAreaZoneThree").innerHTML = temp
				.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
		var int = Math.floor(parseFloat(finalLines[mainIndex].tabert));
		var frac = parseInt((parseFloat(finalLines[mainIndex].tabert) - int) * 60);
		if (frac < 10) {
			temp = int + ":" + "0" + frac;
		} else {
			temp = int + ":" + frac;
		}
		document.getElementById("mainAreaZoneFour").innerHTML = temp;
		int = Math.floor(parseFloat(finalLines[mainIndex].tprod));
		frac = parseInt((parseFloat(finalLines[mainIndex].tprod) - int) * 60);
		if (frac < 10) {
			temp = int + ":" + "0" + frac;
		} else {
			temp = int + ":" + frac;
		}
		document.getElementById("mainAreaZoneFive").innerHTML = temp;
		int = Math.floor(parseFloat(finalLines[mainIndex].tutil));
		frac = parseInt((parseFloat(finalLines[mainIndex].tutil) - int) * 60);
		if (frac < 10) {
			temp = int + ":" + "0" + frac;
		} else {
			temp = int + ":" + frac;
		}
		document.getElementById("mainAreaZoneSix").innerHTML = temp;
	}

	function getLinhas(callback) {
		var usersUrl = "http://" + server_ip + ":" + server_port
				+ "/api/linhas";
		var xhttp = new XMLHttpRequest();
		if ((typeof XDomainRequest !== "undefined")) {
			xhttp = new XDomainRequest();
		}
		xhttp.addEventListener('load', callback);
		xhttp.addEventListener('error', console.log("Request to " + usersUrl
				+ " failed"));
		xhttp.open("GET", usersUrl, true);
		xhttp.setRequestHeader("Content-Type", "application/json");
		xhttp.send();
	}

	function myTimer() {
		var now = new Date();
		var year = "" + now.getFullYear();
		var month = "" + (now.getMonth() + 1);
		if (month.length === 1) {
			month = "0" + month;
		}
		var day = "" + now.getDate();
		if (day.length === 1) {
			day = "0" + day;
		}
		var hour = "" + now.getHours();
		if (hour.length === 1) {
			hour = "0" + hour;
		}
		var minute = "" + now.getMinutes();
		if (minute.length === 1) {
			minute = "0" + minute;
		}
		var second = "" + now.getSeconds();
		if (second.length === 1) {
			second = "0" + second;
		}
		var timeDate = day + "/" + month + "/" + year + " " + hour + ":"
				+ minute + ":" + second;
		document.getElementById("clockFont").innerHTML = timeDate;
		if (menuVar) {
			var aId = "a" + menuIndex;
			document.getElementById("a0").style.color = "#818181";
			document.getElementById("a0").style.background = "rgba(0, 0, 0, 0.4)";
			document.getElementById("a1").style.color = "#818181";
			document.getElementById("a1").style.background = "rgba(0, 0, 0, 0.4)";
			document.getElementById("a2").style.color = "#818181";
			document.getElementById("a2").style.background = "rgba(0, 0, 0, 0.4)";
			document.getElementById("a3").style.color = "#818181";
			document.getElementById("a3").style.background = "rgba(0, 0, 0, 0.4)";
			document.getElementById("a4").style.color = "#818181";
			document.getElementById("a4").style.background = "rgba(0, 0, 0, 0.4)";
			document.getElementById("a5").style.color = "#818181";
			document.getElementById("a5").style.background = "rgba(0, 0, 0, 0.4)";
			document.getElementById(aId).style.color = "#000000";
			document.getElementById(aId).style.background = "#ffffff";
		}

		if (counter2 >= totalTimer) {
			var j = 0, size = arrayCTrab.length;
			for (i = 0; i < size; i++) {
				if (finalLines[i].estado === "PARADO") {
					j++;
				}
			}
			counter2 = j * rotationTimer;
			getLinhas(function() {
				var output = JSON.parse(this.responseText);
				for (var i = 0; i < output.data.length; i++) {
					arrayLines[i] = output.data[i];
				}
				chooseLines();
			});
		}
		if (counter1 >= rotationTimer) {
			if (tempVar2 === 1) {
				tempVar2 = 0, counter1 = 0;
				setHidden();
			} else {
				counter1 = 0;
				updateMainIndex();
				updatePaint();
				mainDisplay();
				secondaryDisplay();
			}
		}
		if (tempVar1 === 1) {
			counter1 = 0, tempVar1 = 0, tempVar2 = 1;
			setVisible();
			displayTemp();
		}
		counter1 += 1;
		counter2 += 1;
		counter3 += 1;
	}

	function openNav() {
		document.getElementById("mySidenav").style.width = "50%";
		menuVar = true;
	}

	function closeNav() {
		document.getElementById("mySidenav").style.width = "0";
		menuVar = false;
	}

	function forceFetch() {
		getLinhas(function() {
			var output = JSON.parse(this.responseText);
			for (var i = 0; i < output.data.length; i++) {
				arrayLines[i] = output.data[i];
			}
			chooseLines();
		});
	}

	function onKeyDown(ev) {
		/*
		 * if (ev.keyCode === KEY_CODES.BACK) { try {
		 * tizen.application.getCurrentApplication().exit(); } catch (error) {
		 * console.error('exit application error', error); } }
		 */
		if (menuSelected) {
			var inputVar = "input" + menuIndex;
			switch (ev.keyCode) {
			case KEY_ZERO:
				document.getElementById(inputVar).value += "0";
				break;
			case KEY_ONE:
				document.getElementById(inputVar).value += "1";
				break;
			case KEY_TWO:
				document.getElementById(inputVar).value += "2";
				break;
			case KEY_THREE:
				document.getElementById(inputVar).value += "3";
				break;
			case KEY_FOUR:
				document.getElementById(inputVar).value += "4";
				break;
			case KEY_FIVE:
				document.getElementById(inputVar).value += "5";
				break;
			case KEY_SIX:
				document.getElementById(inputVar).value += "6";
				break;
			case KEY_SEVEN:
				document.getElementById(inputVar).value += "7";
				break;
			case KEY_EIGHT:
				document.getElementById(inputVar).value += "8";
				break;
			case KEY_NINE:
				document.getElementById(inputVar).value += "9";
				break;
			case KEY_RED:
				document.getElementById(inputVar).value += ".";
				break;
			case KEY_BLUE:
				document.getElementById(inputVar).value = document
						.getElementById(inputVar).value.substring(0, document
						.getElementById(inputVar).value.length - 1);
				break;
			case KEY_ENTER:
				menuSelected = false;
				var modal = document.getElementById('modal' + menuIndex);
				modal.style.display = "none";
				switch (menuIndex) {
				case 0:
					server_ip = document.getElementById(inputVar).value;
					setCookie("ip", server_ip, 365);
					break;
				case 1:
					server_port = Number(document.getElementById(inputVar).value);
					setCookie("port", server_port, 365);
					break;
				case 2:
					if (verifyCTrab(document.getElementById(inputVar).value)) {
						arrayCTrab[0] = Number(document
								.getElementById(inputVar).value);
						setCookie("line1", arrayCTrab[0], 365);
					}
					break;
				case 3:
					if (verifyCTrab(document.getElementById(inputVar).value)) {
						arrayCTrab[1] = Number(document
								.getElementById(inputVar).value);
						setCookie("line2", arrayCTrab[1], 365);
					}
					break;
				case 4:
					if (verifyCTrab(document.getElementById(inputVar).value)) {
						arrayCTrab[2] = Number(document
								.getElementById(inputVar).value);
						setCookie("line3", arrayCTrab[2], 365);
					}
					break;
				case 5:
					if (verifyCTrab(document.getElementById(inputVar).value)) {
						arrayCTrab[3] = Number(document
								.getElementById(inputVar).value);
						setCookie("line4", arrayCTrab[3], 365);
					}
					break;
				default:
					return;
				}
				break;
			case KEY_BACK:
				menuSelected = false;
				var modal = document.getElementById('modal' + menuIndex);
				modal.style.display = "none";
				break;
			default:
				return;
			}
		} else {
			switch (ev.keyCode) {
			case KEY_ENTER:
				if (!menuVar) {
					openNav();
				} else {
					closeNav();
					var modal = document.getElementById('modal' + menuIndex);
					modal.style.display = "block";
					menuSelected = true;
				}
				break;
			case KEY_BACK:
				if (menuVar) {
					closeNav();
				}
				break;
			case KEY_DOWN:
				if (menuVar) {
					if (menuIndex < 5) {
						menuIndex++;
					}
				}
				break;
			case KEY_UP:
				if (menuVar) {
					if (menuIndex > 0) {
						menuIndex--;
					}
				}
				break;
			case KEY_GREEN:
				forceFetch();
				break;
			default:
				// other keys are not supported
				return;
			}
		}
	}

	function bindEvents() {
		document.addEventListener('keydown', onKeyDown);
	}

	function setCookie(cname, cvalue, exdays) {
		var d = new Date();
		d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
		var expires = "expires=" + d.toUTCString();
		document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
	}

	function getCookie(cname) {
		var name = cname + "=";
		var decodedCookie = decodeURIComponent(document.cookie);
		var ca = decodedCookie.split(';');
		for (var i = 0; i < ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0) === ' ') {
				c = c.substring(1);
			}
			if (c.indexOf(name) === 0) {
				return c.substring(name.length, c.length);
			}
		}
		return "";
	}

	function init() {
		cookie_ip = getCookie('ip');
		cookie_port = getCookie('port');
		cookie_line1 = getCookie('line1');
		cookie_line2 = getCookie('line2');
		cookie_line3 = getCookie('line3');
		cookie_line4 = getCookie('line4');
		if (cookie_ip !== "") {
			server_ip = cookie_ip;
		}
		if (cookie_port !== "") {
			server_port = Number(cookie_port);
		}
		if (cookie_line1 !== "") {
			arrayCTrab[0] = Number(cookie_line1);
		}
		if (cookie_line2 !== "") {
			arrayCTrab[1] = Number(cookie_line2);
		}
		if (cookie_line3 !== "") {
			arrayCTrab[2] = Number(cookie_line3);
		}
		if (cookie_line4 !== "") {
			arrayCTrab[3] = Number(cookie_line4);
		}
		tizen.tvinputdevice.registerKey('0');
		tizen.tvinputdevice.registerKey('1');
		tizen.tvinputdevice.registerKey('2');
		tizen.tvinputdevice.registerKey('3');
		tizen.tvinputdevice.registerKey('4');
		tizen.tvinputdevice.registerKey('5');
		tizen.tvinputdevice.registerKey('6');
		tizen.tvinputdevice.registerKey('7');
		tizen.tvinputdevice.registerKey('8');
		tizen.tvinputdevice.registerKey('9');
		tizen.tvinputdevice.registerKey('ColorF0Red');
		tizen.tvinputdevice.registerKey('ColorF1Green');
		tizen.tvinputdevice.registerKey('ColorF3Blue');
		getLinhas(function() {
			var output = JSON.parse(this.responseText);
			for (var i = 0; i < output.data.length; i++) {
				arrayLines[i] = output.data[i];
			}
			chooseLines();
		});
		bindEvents();
	}

	window.onload = init;
}());
