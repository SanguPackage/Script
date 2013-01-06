// Alles niet conform highlighten
var buildingTable = $("#buildings_table");

var menu = "<table class='vis' width='100%'>";
menu += "<tr><th>";
menu += "<input type=checkbox id=buildingOpti> " + trans.sp.buildOverview.optimistic + " ";
menu += "<input type=button id=buildingHighlight value='" + trans.sp.buildOverview.mark + "'>";
menu += "<input type=button id=buildingFilter value='" + trans.sp.buildOverview.filter + "'>";
menu += "</th></tr></table>";
buildingTable.before(menu);

function filterBuildings(cellAction, hideRows)
{
	var buildings = [];
	buildingTable.find("tr:first img").each(function (i, v)
	{
		buildings[i] = this.src.substr(this.src.lastIndexOf('/') + 1);
		buildings[i] = buildings[i].substr(0, buildings[i].indexOf('.'));
	});

	var goners = $();
	var opti = $("#buildingOpti").attr("checked") == "checked";
	buildingTable.find("tr:gt(0)").each(function ()
	{
		var isOk = true;
		$(this).find("td:gt(3)").each(function (i, v)
		{
			//alert($(this).text() + ' for ' + buildings[i] + ' - i is ' + i);
			var range = user_data.buildings[buildings[i]];
			if (range != undefined)
			{
				var text = $(this).text() * 1;
				if (text < range[0])
				{
					$(this).css("background-color", user_data.colors.error);
					isOk = false;
				}
				else if (text > range[1] && !opti)
				{
					$(this).css("background-color", user_data.colors.good);
					isOk = false;
				}
				else
					$(this).css("background-color", "");
			}
		});
		if (hideRows && isOk)
		{
			goners = goners.add($(this));
			$("input:first", $(this)).val("");
		}
	});
	goners.hide();
}

$("#buildingHighlight").click(function ()
{
	filterBuildings(function (cell, isOk)
	{
		cell.css("background-color", isOk ? "" : "#DED3B9");
	}, false);
});

$("#buildingFilter").click(function ()
{
	filterBuildings(function (cell, isOk)
	{
		cell.css("background-color", isOk ? "" : "#DED3B9");
	}, true);
});