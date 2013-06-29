var server_settings = {
    tw_version: 8.13,
    maxSitDays: 60,
    helpdeskUrl: "http://forum.tribalwars.nl/showthread.php?137674-8-11-GM-Algemeen-discussietopic-Sangu-Package",
    sanguEmail: "package@sangu.be"
};

switch (game_data.market) {
	case 'de':
        $.extend(server_settings, {
            ajaxAllowed: false,
            coordinateLinkAllowed: true,
            autoFillCoordinatesAllowed: false
		});
		break;
    default:
        // nl server (and all others):
        $.extend(server_settings, {
			ajaxAllowed: true,
			coordinateLinkAllowed: false,
			autoFillCoordinatesAllowed: true
		});
		break;
}