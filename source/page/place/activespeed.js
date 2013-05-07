// Show current selected speed + ability to change active speed
$(".unit_link img", content_value).each(function() {
	$(this).attr("title", trans.sp.place.changeSpeedImageTooltips.replace("{originalTitle}", $(this).attr("title")));
});

var vilHome = getVillageFromCoords(game_data.village.coord);
var speedCookie = spSpeedCookie();
$("#units_form a img").click(function () {
	var unit = this.src;
	unit = unit.substr(unit.lastIndexOf('/') + 1);
	unit = unit.substr(0, unit.lastIndexOf('.'))
	speedCookie = spSpeedCookie(unit);
	$("#units_form a img").css("border", "0px").filter("img[src*='" + unit + "']").css("border", "3px red solid");

	// lastvil
	var coord = getVillageFromCoords(pers.get("lastVil"));
	if (coord.isValid) {
		var dist = getDistance(coord.x, vilHome.x, coord.y, vilHome.y, speedCookie);
		$("#lastVilTime")[0].innerHTML = dist.html;
	}

	// targetVillage
	coord = getVillageFromCoords(spTargetVillageCookie());
	if (coord.isValid) {
		dist = getDistance(coord.x, vilHome.x, coord.y, vilHome.y, speedCookie);
		$("#targetVilTime")[0].innerHTML = dist.html;
	}

}).filter("img[src*='" + speedCookie + "']").css("border", "3px red solid");