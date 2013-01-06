function getBuildingSpace()
{
	var totaal = 0;
	for (var building = 0; building < world_data.buildingsSize.length; building++)
	{
		var b = world_data.buildingsSize[building];
		if (game_data.village.buildings[b[0]] * 1 > 0)
			totaal += b[1][game_data.village.buildings[b[0]] * 1 - 1];
	}
	return totaal;
}

function getBuildingPoints()
{
	var totaal = 0;
	for (var building = 0; building < world_data.buildingsPoints.length; building++)
	{
		var b = world_data.buildingsPoints[building];
		if (game_data.village.buildings[b[0]] * 1 > 0)
			totaal += b[1][game_data.village.buildings[b[0]] * 1 - 1];
	}
	return totaal;
}