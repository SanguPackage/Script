if (user_data.calculateSnob && !world_data.coins) {
	// Calculate for how many nobles/snobs we've got packages
	var table = $("#content_value table.vis:eq(1)");
	var cost = $("td:eq(1)", table).html();
	cost = parseInt(cost.substr(0, cost.indexOf(" ")), 10);
	var stored = $("tr:eq(1) td:eq(1)", table).html();
	stored = parseInt(stored.substr(0, stored.indexOf(" ")), 10);
	var canProduce = 0;
	while (stored > cost) {
		stored -= cost;
		cost++;
		canProduce++;
	}

	var sumtable = $("table.main table.vis:last");
	sumtable.append("<tr><th>" + trans.sp.snob.canProduce + "</th><td style='border: 1px solid black'><img src='/graphic/unit/unit_snob.png'><b>" + canProduce + "</b> + <img src='graphic/res.png'>" + stored + "</td></tr>");
}