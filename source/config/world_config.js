// world config: global game settings
var world_config = {};
if (pers.get('worldconfig') !== '') {
	world_config = JSON.parse(pers.get("worldconfig"));
	
} else {
	// load new world through tw API
	$.ajax({
		url: "interface.php?func=get_unit_info",
		async: false,
		success: function(xml) {
			world_config.hasMilitia = $("config militia", xml).length !== 0;
		}
	});
	
	$.ajax({
		url: "interface.php?func=get_config",
		async: false,
		success: function(xml) {
			world_config.nightbonus = {
				active: $("night active", xml).text() === "1",
				from: parseInt($("night start_hour", xml).text(), 10),
				till: parseInt($("night end_hour", xml).text(), 10)
				};
			world_config.smithyLevels = $("game tech", xml).text() === "1" || $("game tech", xml).text() === "0";
			world_config.hasChurch = $("game church", xml).text() !== "0";
			world_config.hasArchers = $("game archer", xml).text() !== "0";
			world_config.hasKnight = $("game knight", xml).text() !== "0";
			world_config.speed = parseFloat($("config speed", xml).text());
			world_config.unitSpeed = parseFloat($("config unit_speed", xml).text());
			world_config.farmLimit = parseInt($("game farm_limit", xml).text(), 10);
			world_config.minFake = parseInt($("game fake_limit", xml).text(), 10) / 100;
			world_config.hasMinFakeLimit = world_config.minFake > 0;
			world_config.coins = $("snob gold", xml).text() === "1";
			world_config.maxNobleWalkingTime = parseInt($("snob max_dist", xml).text(), 10) * world_config.speed * world_config.unitSpeed;
		}
	});
	
	pers.set("worldconfig", JSON.stringify(world_config));
}