/**
 * Log the parameter to the console (print yaye when undefined)
 */
function q(what) { console.log(typeof what === "undefined" ? "yaye" : what); }

/**
 * Alert the parameter (yaye when undefined)
 */
function qa(what) { alert(typeof what === "undefined" ? "yaye" : what); }

/**
 * Show crash report
 */
function sangu_alert(e, title) {
    var activator = $("#sangu_activator");
    if (sangu_crash) {
        activator
            .attr("src", "graphic/dots/grey.png")
            .attr("title", trans.sp.sp.packageCrashTooltip);

        (function() {
            var position = $("#storage").position(),
                options = {
                    left: position.left - 150,
                    top: position.top + 35
                },
                content = {body: trans.sp.sp.packageCrashTooltip, title: trans.sp.sp.packageCrashTitle};

            createFixedTooltip("sanguCrashTooltip", content, options);
        }());

        activator.click(function() {
            var currentPageHtml = document.documentElement.innerHTML,
                position = $("#storage").position(),
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
                        .replace("{html}", currentPageHtml)
                };

            createFixedTooltip("sanguCrash", content, options);
            $("#crashArea").val($("#crashArea").val() + currentPageHtml);

            return false;
        });

        for(i = 0; i < 7; i++) {
            activator.fadeTo('slow', 0.2).fadeTo('slow', 1.0);
        }
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