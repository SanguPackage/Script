// Settings on a specific world
switch (game_data.world) {
	case 'nl16':
		// Settings specific for w10 on nl server
		user_data.worldSpecific = {
			villageName: ['Jaar van de val van Temp', 'Oh the horror', 'Wounded Knee', 'Gesmurft', 'Credo Reloaded'], // dorpsnamen instellen
			favs: [ // favorite locations on the map
					{active: false, name: "fixedPosition1", x: 462, y: 647 },
					{ active: false, name: "fixedPosition2", x: 492, y: 652 }
					],
			customPlaceLinks: // Extra links in the place:
				[
					{ active: true, type: 'def', name: 'AllDef', spear: 25000, heavy: 5000, archer: 25000, sendAlong: 0 },
					{ active: true, type: 'def', name: '1/2-Zc', spear: 4000, heavy: 1000, sendAlong: 500 },
					{ active: true, type: 'off', name: 'Smart'/*, spear: 25000*/, sword: -10, axe: 25000, spy: 1, light: 5000/*, heavy: 5000*/, marcher: 5000, ram: 5000, catapult: 5000, sendAlong: 0 },
					{ active: true, type: 'off', name: 'Axe', spear: 25000, axe: 25000, spy: 1, light: 5000, heavy: 5000, marcher: 5000, sendAlong: 0 },
					{ active: true, type: 'off', name: 'Sword', spear: 25000, sword: -10, axe: 25000, spy: 1, light: 5000, heavy: 5000, marcher: 5000, sendAlong: 0, required: ['sword', 1] },

					{ active: false, type: 'def', name: 'AllDef', spear: 25000, sword: 25000, heavy: 5000, archer: 25000, sendAlong: 0 },
					{ active: false, type: 'def', name: '3th-HC', spear: 2500, heavy: 650, sendAlong: 0 },
					{ active: false, type: 'def', name: '4th-HC', spear: 2000, heavy: 500, sendAlong: 0 },
					{ active: false, type: 'def', name: '1/2-Sw', spear: 5000, sword: 5000, sendAlong: 500 },
					{ active: false, type: 'def', name: '3th-Sw', spear: 3300, sword: 3300, sendAlong: 0 },
					{ active: false, type: 'def', name: '4th-Sw', spear: 2500, sword: 2500, sendAlong: 0 }
			// use negative numbers to leave x units home
				]
		};
		break;

	case 'nlXX':
		// Settings specific for world XX
		user_data.worldSpecific = {
			
		};
		break;
}