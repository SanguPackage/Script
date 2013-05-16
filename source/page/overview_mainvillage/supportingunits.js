// calculate current stack
var totalUnits = [];
var totalFarm = 0;
var unitTable = $("#show_units");
$("#show_units > h4").prepend(trans.sp.main.unitsReplacement);
$("table:first td", unitTable).not(":last").each(function () {
	var unit = $('img', this)[0].src;
	unit = unit.substr(unit.lastIndexOf('/') + 1);
	unit = unit.substr(0, unit.lastIndexOf('.'))
	var unitsSize = world_data.unitsSize[unit];
	var unitAmount = $('strong', this);
	unitAmount[0].id = "spAmount" + unit;
	unitAmount = unitAmount[0].innerHTML
	totalUnits[unit] = unitAmount;
	totalFarm += unitsSize * unitAmount;
	
	if (slowest_unit == null || world_data.unitsSpeed[slowest_unit] < world_data.unitsSpeed[unit]) {
		slowest_unit = unit;
	}
});

// fetch own troops
if (user_data.overview.ajaxSeperateSupport && totalFarm > 0) {
	var ownFarmTotal = 0;
	var supportRows = "";
	if (server_settings.ajaxAllowed) {
		ajax("place",
			function (placeText) {
				if (placeText.find(".unitsInput").size() > 0) {
					slowest_unit = null;
					placeText.find(".unitsInput").each(function () {
						// separate own / supporting troops
						var unit = 'unit_' + this.id.substr(this.id.lastIndexOf("_") + 1);
						var unitAmount = $(this).next().text().substr(1);
						unitAmount = parseInt(unitAmount.substr(0, unitAmount.length - 1), 10);
						var unitsSize = world_data.unitsSize[unit];
						ownFarmTotal += unitsSize * unitAmount;

						var unitLabel = $("#spAmount" + unit);
						var supportingTroopsAmount = totalUnits[unit] - unitAmount;
						if (supportingTroopsAmount > 0) {
							var unitDesc = $.trim(unitLabel.parent().text());
							unitDesc = unitDesc.substr(unitDesc.indexOf(" ") + 1);
							supportRows += "<tr><td>" + unitLabel.prev().outerHTML() + " <b>" + formatNumber(supportingTroopsAmount) + "</b> " + unitDesc + "</td></tr>";
						}

						if (unitAmount > 0) {
							unitLabel.text(unitAmount);
							if (slowest_unit == null || world_data.unitsSpeed[slowest_unit] < world_data.unitsSpeed[unit]) {
								slowest_unit = unit;
							}
						} else {
							unitLabel.parent().parent().hide();
						}
					});
				
				} else {
					ownFarmTotal = totalFarm; // No rally point
				}
			}, {async: false});
			
	} else {
		ownFarmTotal = totalFarm; // No ajax
	}
		
	if (slowest_unit != null) {
		$("#slowestUnitCell").html("<img title='"+trans.sp.tagger.slowestTip+"' src='graphic/unit/" + slowest_unit + ".png'>").attr("slowestUnit", slowest_unit);
	}

	if (ownFarmTotal > 0 && user_data.overview.ajaxSeperateSupportStacks) {
		// stack in the village
		var ownSupportDisplay = stackDisplay(ownFarmTotal);
		unitTable.find("table:first").append("<tr><td><span class='icon header population' title='" + trans.sp.main.ownStackTitle + "'></span>" + ownSupportDisplay.desc + "</td></tr>");
	}
	if (totalFarm - ownFarmTotal > 0) {
		// stack from other villages
		var newTable = "<table class=vis width='100%'>";
		supportRows += "<tr><td><a href='" + getUrlString("screen=place&mode=units") + "'>&raquo; " + trans.sp.main.rallyPointTroops + "</a></td></tr>";
		if (user_data.overview.ajaxSeperateSupportStacks) {
			var supportDisplay = stackDisplay(totalFarm - ownFarmTotal, { showFarmLimit: true });
			supportRows += '<tr><td style="border-top: 1px solid #85550d ;background-color: ' + supportDisplay.color + '"><span class="icon header population" title="' + trans.sp.main.supportingStackTitle + '"></span>' + '<b>' + supportDisplay.desc + '</b>' + '</td></tr>';
		}

		unitTable.after(createMoveableWidget("os_units", trans.sp.main.unitsOther, newTable + supportRows + "</table>"));
	}

	// total stack
	var isClassicOverview = $("a:contains('" + trans.tw.main.toGraphicOverview + "')", content_value).size() > 0;
	if (isClassicOverview) {
		var cell = $("#order_level_farm").parent();
		if (game_data.player.premium) cell = cell.next();
		var percentage = world_config.farmLimit == 0 ? "" : cell.children().html();
		stackDisplay(
			totalFarm, {
				showFarmLimit: true,
				percentage: percentage ? percentage.substr(0, percentage.indexOf('%') + 1) : "",
				cell: cell,
				appendToCell: !game_data.player.premium
			});

	} else {
		var stackDetails = stackDisplay(
			totalFarm, {
				showFarmLimit: true,
				percentage: $("#l_farm strong").first().html()
			});
		//var cellContent = '<tr><td style="border-top: 1px solid #85550d ;background-color: ' + stackDetails.color + '">' + '<b>' + trans.tw.all.farm + ': ' + stackDetails.desc + '</b>' + '</td></tr>';
		var cellContent = ' | <b>' + trans.tw.all.farm + ': ' + stackDetails.desc + '</b>';
		$("#show_units tbody:first td:last").append(cellContent).css("border-top", "1px solid #85550d").css("background-color", stackDetails.color);
	}
}