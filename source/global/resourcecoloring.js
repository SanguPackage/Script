var storage = parseInt($("#storage").text(), 10);

// Color resources
if (user_data.global.resources.active) {
	$("#wood,#iron,#stone").each(function () {
		var x = parseInt(this.innerHTML / storage * 10 - 1, 10);
		$(this).css("background-color", user_data.global.resources.backgroundColors[x]);
	});
}

// Blink full resources
if (user_data.global.resources.blinkWhenStorageFull) {
	$("#wood,#iron,#stone").filter(function () {
		return parseInt(this.innerHTML, 10) == storage;
	}).css({ "font-weight": "bolder", "color": "black" }).fadeOut().fadeIn();
}