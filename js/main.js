/**
 * (c) 2018 Nélson Rafael Martins All Rights Reserverd
 */
(function() {
	var myVar = setInterval(myTimer, 1000);
	var counter1 = 0, counter2 = 0;
	var arrayLines = [];
	var rotationTimer = 60, totalTimer = 5 * rotationTimer;
	var arrayCTrab = [ 50010, 50030, 50050, 50060 ];
	var arrayTotal = [ 50010, 50020, 50030, 50050, 50060, 50080, 50090, 50120,
			50140, 50180, 50190 ];
	var arrayTotal2 = [];
	var finalLines = [];
	var totalLines = [];
	var mainIndex = 0, tempVar1 = 0, tempVar2 = 0;

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
			temp = int + "h" + "0" + frac + "m";
		} else {
			temp = int + "h" + frac + "m";
		}
		document.getElementById("mainAreaZoneFour").innerHTML = temp;
		int = Math.floor(parseFloat(finalLines[mainIndex].tprod));
		frac = parseInt((parseFloat(finalLines[mainIndex].tprod) - int) * 60);
		if (frac < 10) {
			temp = int + "h" + "0" + frac + "m";
		} else {
			temp = int + "h" + frac + "m";
		}
		document.getElementById("mainAreaZoneFive").innerHTML = temp;
		int = Math.floor(parseFloat(finalLines[mainIndex].tutil));
		frac = parseInt((parseFloat(finalLines[mainIndex].tutil) - int) * 60);
		if (frac < 10) {
			temp = int + "h" + "0" + frac + "m";
		} else {
			temp = int + "h" + frac + "m";
		}
		document.getElementById("mainAreaZoneSix").innerHTML = temp;
	}

	function getLinhas(callback) {
		var usersUrl = "http://192.168.14.34:8080/api/linhas";
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

	function init() {
		getLinhas(function() {
			var output = JSON.parse(this.responseText);
			for (var i = 0; i < output.data.length; i++) {
				arrayLines[i] = output.data[i];
			}
			chooseLines();
		});
	}

	window.onload = init;
}());
