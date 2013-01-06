// calculate current stack
var totalUnits = [];
var totaalFarm = 0;
var unitTable = $("#show_units");
$("#show_units > h4").prepend(trans.sp.main.unitsReplacement);
$("table:first td", unitTable).not(":has(a)").each(function () {
	var unit = $('img', this)[0].src;
	unit = unit.substr(unit.lastIndexOf('/') + 1);
	unit = unit.substr(0, unit.lastIndexOf('.'))
	var unitsSize = world_data.unitsSize[unit];
	var unitAantal = $('strong', this);
	unitAantal[0].id = "aantal" + unit;
	unitAantal = unitAantal[0].innerHTML
	totalUnits[unit] = unitAantal;
	totaalFarm += unitsSize * unitAantal;
});

// fetch own troops
if (user_data.ajaxOs && totaalFarm > 0)
{
	ajax("place",
	function (placeText)
	{
		var ownFarmTotaal = 0;
		var osRows = "";
		if (placeText.find(".unitsInput").size() > 0)
		{
			placeText.find(".unitsInput").each(
				function ()
				{
					// separate own / supporting troops
					var unit = 'unit_' + this.id.substr(this.id.lastIndexOf("_") + 1);
					var unitAantal = $(this).next().text().substr(1);
					unitAantal = unitAantal.substr(0, unitAantal.length - 1) * 1;
					var unitsSize = world_data.unitsSize[unit];
					ownFarmTotaal += unitsSize * unitAantal;

					var unitLabel = $("#aantal" + unit);
					var osAantal = totalUnits[unit] - unitAantal;
					if (osAantal > 0)
					{
						var unitDesc = $.trim(unitLabel.parent().text());
						unitDesc = unitDesc.substr(unitDesc.indexOf(" ") + 1);
						osRows += "<tr><td>" + unitLabel.prev().outerHTML() + " <b>" + formatNumber(osAantal) + "</b> " + unitDesc + "</td></tr>";
					}

					if (unitAantal > 0)
					{
						unitLabel.text(unitAantal);
						if (slowest_unit == null || world_data.unitsSpeed[slowest_unit] < world_data.unitsSpeed[unit])
						{
							slowest_unit = unit;
						}
					}
					else
					{
						unitLabel.parent().parent().hide();
					}
				});

			if (slowest_unit != null)
			{
				$("#slowestUnitCell").html("<img title='"+trans.sp.tagger.slowestTip+"' src='graphic/unit/" + slowest_unit + ".png'>").attr("slowestUnit", slowest_unit);
			}
		}
		else ownFarmTotaal = totaalFarm; // No rally point

		if (ownFarmTotaal > 0 && user_data.ajaxOsStacks)
		{
			// stack in the village
			var ownOsDisplay = stackDisplay(ownFarmTotaal);
			unitTable.find("table:first").append("<tr><td><img src=graphic/face.png title='" + trans.sp.main.ownStackTitle + "'> " + ownOsDisplay.desc + "</td></tr>");
		}
		if (totaalFarm - ownFarmTotaal > 0)
		{
			// stack from other villages
			var newTable = "<table class=vis width='100%'>";
			osRows += "<tr><td><a href='" + getUrlString("screen=place&mode=units") + "'>&raquo; " + trans.sp.main.rallyPointTroops + "</a></td></tr>";
			if (user_data.ajaxOsStacks)
			{
				var osDisplay = stackDisplay(totaalFarm - ownFarmTotaal, { showFarmLimit: true });
				osRows += '<tr><td style="border-top: 1px solid #85550d ;background-color: ' + osDisplay.color + '">' + '<b>' + trans.tw.all.farm + ': ' + osDisplay.desc + '</b>' + '</td></tr>';
			}

			unitTable.after(createMoveableWidget("os_units", trans.sp.main.unitsOther, newTable + osRows + "</table>"));
		}

		// total stack
		var isClassicOverview = $("a:contains('" + trans.tw.main.toGraphicOverview + "')", content_value).size() > 0;
		if (isClassicOverview)
		{
			var cell = $("#order_level_farm").parent().next();
			var percentage = world_data.farmLimit == 0 ? "" : cell.children().html();
			stackDisplay(
				totaalFarm,
				{
					showFarmLimit: true,
					percentage: percentage.substr(0, percentage.indexOf('%') + 1),
					cell: cell
				});
		}
		else
		{
			var stackDetails = stackDisplay(
				totaalFarm,
				{
					showFarmLimit: true,
					percentage: $("#l_farm strong").first().html()
				});
			//var cellContent = '<tr><td style="border-top: 1px solid #85550d ;background-color: ' + stackDetails.color + '">' + '<b>' + trans.tw.all.farm + ': ' + stackDetails.desc + '</b>' + '</td></tr>';
			var cellContent = ' | <b>' + trans.tw.all.farm + ': ' + stackDetails.desc + '</b>';
			$("#show_units tbody:first td:last").append(cellContent).css("border-top", "1px solid #85550d").css("background-color", stackDetails.color);
		}
	});
}