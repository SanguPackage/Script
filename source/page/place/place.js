// Auto rename attacks
if (user_data.attackAutoRename.active) {
	// Less then ideal solution:
	// Does not work properly when sending many attacks (ie snobtrain)
	// In confirm.js the cookies are saved
	
	var hasAttackRenamingCookieNeedle = pers.getWorldKey('attRen_' + game_data.village.id + '_');
	for (var i = 0; i  <  sessionStorage.length; i++) {
		var key = sessionStorage.key(i);
		if (key.indexOf(hasAttackRenamingCookieNeedle) == 0) {
			var twInitialCommandName = key.substr(hasAttackRenamingCookieNeedle.length);
			//q("found:" + hasAttackRenamingCookieNeedle + " -> " + twInitialCommandName);
			
			// ' is an invalid village name character so we don't need to escape
			var commandRenameInputBox = $("input[value='" + twInitialCommandName + "']", content_value); 
			if (commandRenameInputBox.length > 0) {
				var sanguCommandName = sessionStorage.getItem(key);
				commandRenameInputBox.val(sanguCommandName).next().click();
				pers.removeSessionItem(key);
				
				if (commandRenameInputBox.closest("table").find("tr").length > 2) {
					commandRenameInputBox.closest("td").addClass("selected");
				}
			}
		}
	}
}

// Read troops available
var units = [];
units['total'] = 0;
$("#units_form .unitsInput").each(function () {
	var amount = $(this).next().text().substr(1);
	units[this.name] = parseInt(amount.replace(")", ""), 10);
	units['total'] += units[this.name] * world_data.unitsSize['unit_'+this.name];
});


$("#inputx,#inputy").focus(function() {
	$(this).select();
});

// fill in coordinates? (links from troops overview page)
if (server_settings.autoFillCoordinatesAllowed && window.location.search.indexOf("&sanguX=") != -1) {
	var match = window.location.search.match(/sanguX=(\d+)&sanguY=(\d+)/);
	if (match[1] != 0) {
		$("#inputx").val(match[1]);
		$("#inputy").val(match[2]);
	}
}

// Spice up rally point:
//<!--@@INCLUDE "page\place\activespeed.js" INDENT=0 //-->
//<!--@@INCLUDE "page\place\lastandtargetvillage.js" INDENT=0 //-->
//<!--@@INCLUDE "page\place\extratrooplinks.js" INDENT=0 //-->