var vilHome = getVillageFromCoords(game_data.village.coord);
if ($("#units_away").size() != 0) {
	// Troops in other villages
	var otherUnitsTable = $("#units_away").width("100%");
	$("tr:first", otherUnitsTable).append("<th>" + trans.sp.place.distance + "</th><th>" + trans.sp.place.backOn + "</th>");
	otherUnitsTable.find("tr:gt(0):even").each( function () {
		var row = $(this);
		var villageCoord = getVillageFromCoords(row.find("td:eq(1)").text());

		if (!villageCoord.isValid) {
			row.append("<th>&nbsp;</th><th>&nbsp;</th>");
		} else {
			var slowestUnit = null;
			var slowestUnitName = null;
			$.each(world_data.units, function (i, val) {
				var amount = $("td:eq(" + (i + 2) + "), th:eq(" + (i + 1) + ")", row).text();
				if (amount != '0') {
					if (slowestUnit == null || slowestUnit < world_data.unitsSpeed['unit_' + val]) {
						slowestUnitName = val;
						slowestUnit = world_data.unitsSpeed['unit_' + val];
					}
				}
			});

			var fields = getDistance(vilHome.x, villageCoord.x, vilHome.y, villageCoord.y, slowestUnitName);
			var extraColumns = "<td align=right>" + parseInt(fields.fields, 10) + "</td>";
			extraColumns += "<td>" + twDateFormat(fields.arrivalTime) + "</td>";

			row.append(extraColumns);
		}
	});
}

// Calculate distance and walkingtime to the villages
var unitsTable = $("form table:first");
$("tr:first", unitsTable).append('<th width="50"><img src="graphic/face.png" title="' + trans.sp.all.population + '" alt="" /></th><th>' + trans.sp.place.distance + '</th><th>' + trans.sp.place.backOn + '</th>');
unitsTable.find("tr:gt(0)").each(function () {
	var pop = 0;
	var row = $(this);
	var slowestUnit = null;
	var slowestUnitName = null;

	$.each(world_data.units, function (i, val) {
		var amount = $("td:eq(" + (i + 1) + "), th:eq(" + (i + 1) + ")", row).text();
		if (amount != '0') {
			pop += amount * world_data.unitsPositionSize[i];

			if (slowestUnit == null || slowestUnit < world_data.unitsSpeed['unit_' + val]) {
				slowestUnitName = val;
				slowestUnit = world_data.unitsSpeed['unit_' + val];
			}
		}
	});

	var villageCoord = getVillageFromCoords(row.find("td:first").text());
	var color = getStackColor(pop, 30 * world_config.farmLimit);

	if (color != "transparant") {
		$(this).append("<td align=right style='background-color: " + color + "'>" + formatNumber(pop) + "</td><td colspan=2>&nbsp;</td>");
	} else {
		var extraColumns = '<td align=right>' + formatNumber(pop) + '</td>';
		if (!villageCoord.isValid) {
			extraColumns += "<td colspan=2 align=right>&nbsp;</td>";
		} else {
			//q(vilHome.x + ':' + slowestUnitName);
			var dist = getDistance(vilHome.x, villageCoord.x, vilHome.y, villageCoord.y, slowestUnitName);
			var fields = parseInt(dist.fields, 10);
			extraColumns += "<td align=right>" + fields + "</td><td>" + twDateFormat(dist.arrivalTime) + "</td>";
			$("td:first", this).append("&nbsp; <b>" + trans.sp.all.fieldsSuffix.replace("{0}", fields) + "</b>");
			$(this).addClass("toSort").attr("fields", fields);
		}
		$(this).append(extraColumns);
	}
});

var checkboxAmount = $("input[type='checkbox']", unitsTable);
if (checkboxAmount.size() == 1) {
	// village has just been taken over? auto check checkbox
	checkboxAmount.attr("checked", true);
}

// Sort on distance
unitsTable.find("tr.toSort").sortElements(function (a, b) {
	return parseInt($(a).attr("fields"), 10) < parseInt($(b).attr("fields"), 10) ? 1 : -1;
});

// are there incomings on the supporting villages?
unitsTable.find("tr.toSort").each( function () {
	var row = $(this);
	var villageUrl = $("a:first", this).attr("href");
	ajax(villageUrl, function (villageDetails) {
		var villageOwner = $("table.vis:first tr:eq(3) a", villageDetails);
		if (villageOwner.text() != game_data.player.name) {
			$("td:first a", row).after(" [" + villageOwner.outerHTML() + "]");
		} else {
			var incomingTable = $("table th:contains('" + trans.tw.overview.incomingTroops + "')", villageDetails);
			if (incomingTable.size() > 0) {
				incomingTable = incomingTable.parent().parent();
				var incomingRows = $("tr:has(img[src*='attack.png'])", incomingTable);
				if (incomingRows.size() > 0) {
					var firstAttack = incomingRows.eq(0);
					var timeLeft = $("td:eq(2)", firstAttack).text();
					var arrivalDate = $("td:eq(1)", firstAttack).text();

					var lastAttack = incomingRows.last();
					var timeLeftLast = $("td:eq(2)", lastAttack).text();
					var arrivalDateLast = $("td:eq(1)", lastAttack).text();

					var amount = incomingRows.size();

					var attacksDesc;
					if (amount == 1) {
						attacksDesc = trans.sp.place.onlyAttack
						.replace("{timeLeftFirst}", timeLeft)
						.replace("{arrivalDateFirst}", arrivalDate);
					} else {
						attacksDesc = trans.sp.place.multipleAttack
						.replace("{timeLeftFirst}", timeLeft)
						.replace("{arrivalDateFirst}", arrivalDate)
						.replace("{timeLeftLast}", timeLeftLast)
						.replace("{arrivalDateLast}", arrivalDateLast)
						.replace("{amount}", amount);
					}

					$("td:first input", row).after("&nbsp; <img src='graphic/command/attack.png' title='" + attacksDesc + "'>");
				}
			}
		}
	});
});