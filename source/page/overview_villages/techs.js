overviewTable = $("#techs_table");
tableHandler.init("techs_table");

// Highlight everything not conform usersettings
if (world_config.smithyLevels) {
	var menu = "<table class='vis' width='100%'>";
	menu += "<tr><th>";
	menu += "<select id='groupType'>";
	$.each(user_data.smithy, function (i, v) {
		menu += "<option value=" + i + ">" + v[0] + "</option>";
	});
	menu += "</select>";
	menu += "<input type=checkbox id=buildingOpti> " + trans.sp.smithOverview.optimistic + " ";
	menu += "<input type=button id=smithyHighlight value='" + trans.sp.smithOverview.mark + "'>";
	menu += "<input type=button id=smithyFilter value='" + trans.sp.smithOverview.filter + "'>";
	menu += "</th></tr></table>";
	$("#techs_table").before(menu);

	function filterTechs(cellAction, hideRows) {
		var goners = $();
		var opti = $("#buildingOpti").attr("checked") == "checked";
		var def = user_data.smithy[$("#groupType").val()][1];
		$("#techs_table").find("tr:gt(0)").each(function () {
			var isOk = true;
			$(this).find("td:gt(2)").each(function (i, v) {
				var range = def[world_data.units[i]];
				if (i < world_data.units.length && range != undefined) {
					var text = parseInt($(this).text(), 10);
					if (text == '') {
						text = 0;
					}
					if (text < range[0]) {
						$(this).css("background-color", user_data.colors.error);
						isOk = false;
					}
					else if (text > range[1] && !opti) {
						$(this).css("background-color", user_data.colors.good);
						isOk = false;
					} else {
						$(this).css("background-color", "");
					}
				}
			});
			if (hideRows && isOk) {
				goners = goners.add($(this));
				$("input:first", $(this)).val("");
			}
		});
		goners.hide();
	}

	$("#smithyHighlight").click(function () {
		trackClickEvent("TableHighlight");
		filterTechs(function (cell, isOk) {
			cell.css("background-color", isOk ? "" : user_data.colors.neutral);
		}, false);
	});

	$("#smithyFilter").click(function () {
		trackClickEvent("TableRemove");
		filterTechs(function (cell, isOk) {
			cell.css("background-color", isOk ? "" : user_data.colors.neutral);
		}, true);
	});
}