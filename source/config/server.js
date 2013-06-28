var server_settings = {
	incomingsIndicator: "({current} <small>{difference}</small>)"
};

switch (game_data.market) {
	case 'de':
		server_settings = {
			tw_version: 8.13,
			maxSitDays: 60,
			ajaxAllowed: false,
			coordinateLinkAllowed: true,
			autoFillCoordinatesAllowed: false,
			scriptConfig: {
				incomingsIndicator: server_settings.incomingsIndicator
			}
		};
		break;
    default:
        // nl server (and all others):
		server_settings = {
			tw_version: 8.13,
			maxSitDays: 60,
			ajaxAllowed: true,
			coordinateLinkAllowed: false,
			autoFillCoordinatesAllowed: true,
			scriptConfig: {
				incomingsIndicator: server_settings.incomingsIndicator
			}
		};
		break;
}