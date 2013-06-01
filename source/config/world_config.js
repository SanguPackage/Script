// world config: global game settings
var world_config = {
	hasMilitia: false,
	nightbonus: {
		active: false,
		from: 0, 
		till: 0
		},
	smithyLevels: true,
	hasChurch: false,
	hasArchers: false,
	hasKnight: false,
	speed: 1,
	unitSpeed: 1,
	farmLimit: 0,
	minFake: 0,
	hasMinFakeLimit: false,
	coins: false,
	maxNobleWalkingTime: 999
};

if (pers.get('worldconfig') !== '') {
	world_config = JSON.parse(pers.get("worldconfig"));
	
} else {
	// load new world through tw API
	if (server_settings.ajaxAllowed) {
		//<!--@@INCLUDE "config\world_config_getter.js" INDENT=4 //-->
		world_config = world_config_getter();
		
	} else {
		// Not allowed to get data with ajax: need to store the configuration here
		world_config = (function() {
			//<!--@@INCLUDE "config\world_config_de.js" INDENT=5 //-->
		})();
	}
	
	pers.set("worldconfig", JSON.stringify(world_config));
}