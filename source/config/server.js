var server_settings = {};
switch (game_data.market) {
	case 'de':
		server_settings = {
			maxSitDays: 60,
			ajaxAllowed: false,
			coordinateLinkAllowed: true
		};
		break;
	default:
		server_settings = {
			maxSitDays: 60,
			ajaxAllowed: true,
			coordinateLinkAllowed: false
		};
		break;
}