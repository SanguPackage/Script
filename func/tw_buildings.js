function getBuildingSpace() {
	var total = 0;
	for (var building = 0; building < world_data.buildingsSize.length; building++) {
		var b = world_data.buildingsSize[building];
		if (parseInt(game_data.village.buildings[b[0]], 10) > 0) {
			total += b[1][parseInt(game_data.village.buildings[b[0]], 10) - 1];
		}
	}
	return total;
}

function getBuildingPoints() {
	var total = 0;
	for (var building = 0; building < world_data.buildingsPoints.length; building++) {
		var b = world_data.buildingsPoints[building];
		if (parseInt(game_data.village.buildings[b[0]], 10) > 0) {
			total += b[1][parseInt(game_data.village.buildings[b[0]], 10) - 1];
		}
	}
	return total;
}