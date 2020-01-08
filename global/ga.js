// Send usage statistics to GA once/day
(function() {
    //console.time("ga");
    try {
        var loginMonitor = pers.get("sanguLogin");
        if (loginMonitor !== '') {
            var parts = loginMonitor.match(/(\d+)/g);
            loginMonitor = new Date(parts[0], parts[1]-1, parts[2]);

            //if (Math.abs(loginMonitor.getTime() - (new Date()).getTime()) > 1000 * 3600 * 24) {
            if (parseInt(parts[2], 10) != (new Date()).getDate()) {
                loginMonitor = '';
            }
        }
        if (loginMonitor === '') {
            loginMonitor = new Date();
            loginMonitor.setHours(0, 0, 0);
            loginMonitor = loginMonitor.getFullYear() + '-' + pad(loginMonitor.getMonth()+1, 2) + '-' +  pad(loginMonitor.getDate(), 2);
            trackEvent("ScriptUsage", "DailyUsage", loginMonitor);
            pers.set("sanguLogin", loginMonitor);

            // also log world/tribe usage
            trackEvent("ScriptUsage", "WorldUsage", game_data.world);
            trackEvent("ScriptUsage", "TribeUsage", game_data.world + " " + game_data.player.ally_id);
            trackEvent("ScriptUsage", "HasPremium", game_data.features.Premium.active ? "Yes" : "No");		// Do we need to support non PA users?
            trackEvent("ScriptUsage", "HasAM", game_data.features.AccountManager.active ? "Yes" : "No");	// Do we need to do stuff on the AM pages?
        }
    } catch (e) { handleException(e, "ga"); }
    //console.timeEnd("ga");
}());
