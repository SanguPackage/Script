/**
 * Log the parameter to the console (print yaye when undefined)
 */
function q(what) { console.log(typeof what === "undefined" ? "yaye" : what); }

/**
 * Alert the parameter (yaye when undefined)
 */
function qa(what) { alert(typeof what === "undefined" ? "yaye" : what); }

/*function getStopWatch(toTime, alertIt) {
	var watch = { start: new Date(), text: toTime };
	watch.getTime = function () { return ((new Date()).getTime() - this.start.getTime()); };
	watch.reset = function () { this.start = new Date(); };
	watch.print = function () { if (alertIt != undefined && alertIt) alert(this.text + ': ' + this.getTime()); };

	//if (alertIt != undefined && alertIt) alert('Start:' + toTime + ':' + watch.start);
	return watch;
}*/

function sangu_alert(e, title) {
    var position = $("#storage").position(),
        options = {
            left: $(window).width() / 2 - 300,
            top: position.top + 35,
            width: 600,
            showOnce: false
        },
        game_dataSubset = {
            majorVersion: game_data.majorVersion,
            market: game_data.market,
            world: game_data.world,
            sitter_id: game_data.player.sitter_id,
            village_id: game_data.village.id,
            player_id: game_data.player.id,
            player_name: game_data.player.name,
            ally_id: game_data.player.ally_id,
            villages: game_data.player.villages,
            premium: game_data.player.premium/*,
            account_manager: game_data.player.account_manager,
            farm_manager: game_data.player.farm_manager*/
        },
        content = {
            title: trans.sp.sp.packageCrashTitle,
            body: trans.sp.sp.packageCrash
                .replace("{forum-url}", server_settings.helpdeskUrl)
                .replace("{title}", title)
                .replace(/\{error\}/g, e.message)
                .replace("{page}", JSON.stringify(current_page))
                .replace("{url}", document.location.href)
                .replace("{version}", sangu_version)
                .replace("{browser}", JSON.stringify($.browser))
                .replace("{game_data}", JSON.stringify(game_dataSubset))
                .replace("{stacktrace}", e.stack ? e.stack + "\n\n" + e.stacktrace : "assertion?")
                .replace("{email}", server_settings.sanguEmail)
        };

    if (user_data.global.showCrashReport && sangu_crash) {
        $("#sangu_activator").attr("src", "graphic/dots/grey.png");
        createFixedTooltip("sanguCrash", content, options);
    }
}

/**
 * Failed assertions show the crash report!
 */
function assert(shouldBeTruthy, message) {
	if (!shouldBeTruthy) {
        sangu_alert({message: message || "(broken assertion)"});
	}
}

/**
 * Show crash report
 */
function handleException(e, title) {
    sangu_alert(e, title);
}