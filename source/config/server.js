var server_settings = {};
switch (game_data.market) {
	case 'de':
		server_settings = {
			tw_version: 8.11,
			maxSitDays: 60,
			ajaxAllowed: false,
			coordinateLinkAllowed: true
		};
		break;
	default:
		server_settings = {
			tw_version: 8.11,
			maxSitDays: 60,
			ajaxAllowed: true,
			coordinateLinkAllowed: false
		};
		break;
}