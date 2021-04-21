function world_config_setter_unit(configBag, unitInfoXml) {
	configBag.hasMilitia = $("config militia", unitInfoXml).length !== 0;
}

function world_config_setter(configBag, infoXml) {
	configBag.nightbonus = {
		active: $("night active", infoXml).text() === "1",
		from: parseInt($("night start_hour", infoXml).text(), 10),
		till: parseInt($("night end_hour", infoXml).text(), 10)
		};
	configBag.smithyLevels = $("game tech", infoXml).text() === "1" || $("game tech", infoXml).text() === "0";
	configBag.hasChurch = $("game church", infoXml).text() !== "0";
	configBag.hasArchers = $("game archer", infoXml).text() !== "0";
	configBag.hasKnight = $("game knight", infoXml).text() !== "0";
	configBag.speed = parseFloat($("config speed", infoXml).text());
	configBag.unitSpeed = parseFloat($("config unit_speed", infoXml).text());
	configBag.farmLimit = parseInt($("game farm_limit", infoXml).text(), 10);
	configBag.minFake = parseInt($("game fake_limit", infoXml).text(), 10) / 100;
	configBag.hasMinFakeLimit = configBag.minFake > 0;
	configBag.coins = $("snob gold", infoXml).text() === "1";
	configBag.maxNobleWalkingTime = parseInt($("snob max_dist", infoXml).text(), 10) * configBag.speed * configBag.unitSpeed;
}

function world_config_getter(world) {
	// world nl: http://nl16.tribalwars.nl/
	// world de: http://de90.die-staemme.de/
	if (typeof world === 'undefined') world = '';

	var world_config = {};
  twLib.ajax({
		url: world + "interface.php?func=get_unit_info",
		async: false,
		success: function(xml) {
			world_config_setter_unit(world_config, xml);
		}
	});

  twLib.ajax({
		url: world + "interface.php?func=get_config",
		async: false,
		success: function(xml) {
			world_config_setter(world_config, xml);
		}
	});
	return world_config;
}
