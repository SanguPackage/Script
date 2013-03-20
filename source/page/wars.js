if (false && user_data.tribalWars.active) {
	// Adds a nice table with overview of all Tribal Wars 
	// Features: Shows villages lost/gained per war + best contributor for each war
	
	// TODO: This doesn't work anymore since a previous TW update changed how wars are displayed
	// Problem is currently getting "h" from the querystring. There is a difference between being
	// a baron and not. It's messy and would probably require many AJAX calls. This feature has
	// no chance of being allowed on DE. (And probably neither on NL:)
	
	// overview
	var warTables = $("div.vis > table");

	var newTable = "<h2>" + trans.sp.tribalWars.warsH2Header + "</h2>";
	newTable += "<table class=vis width='100%' id=warsTotal>";
	newTable += "<tr>";
	newTable += "<th>" + trans.sp.tribalWars.tribe + "</th><th>" + trans.sp.tribalWars.durationTitle + "</th><th>" + trans.sp.tribalWars.villagesTakenTitle + "</th><th>" + trans.sp.tribalWars.villagesTakenDiff + "</th><th>" + trans.sp.tribalWars.biggestContributorTitle + "</th><th>" + trans.sp.tribalWars.totalODA + "</th><th>" + trans.sp.tribalWars.totalODD + "</th>";
	newTable += "</tr>";

	var allConquersOwn = 0;
	var allConquersEnemy = 0;
	var allTotalODA = 0;
	var allTotalODD = 0;
	var totalWars = warTables.size();
	var warsProcessed = 0;

	var debug_firstRowOnly = false;
	if (debug_firstRowOnly) {
		warTables = warTables.first();
	}

	//TODO find h
	var sessionVarH = warTables.first().find("tr:eq(2) a:first")
	if (sessionVarH.size() == 1) {
		sessionVarH = sessionVarH.attr("href").match(/&h=([^&]+)&/)[1];
	} else {
		sessionVarH = null;
	}


	warTables.each(function (rowIndex, rowValue) {
		var row = $(rowValue);
		var originalLink = $("th a:first", row).attr("href");

		/*ajax(originalLink,
		function (warInfo) {

		});*/

		var link = originalLink + "&ajaxaction=show_old_stats&h=" + sessionVarH;
		//7237";
		//q(link);
		///game.php?village=45173&screen=wars&ajaxaction=show_old_stats&h=7237&war=185
		///game.php?village=45173&screen=wars&mode=stats&war=191

		ajax(link,
			function (warInfo) {
				// wtf heeft innogames nu met die string gedaan :)
				warsProcessed++;
				warInfo = warInfo.substr(1).replace(/\\"/g, '"');
				warInfo = warInfo.replace(/\\r\\n/g, '').replace(/\\\//g, '/');
				warInfo = warInfo.replace(/\\t/g, '');
				warInfo = warInfo.substr(0, warInfo.length - 1);
				//q(warInfo);
				$("#content_value").append($("<div style='display: none'>").html(warInfo));
				//q($("<div/>").html(warInfo).text());
				var currentStats = $(".war-stats", warInfo);
				// trans.sp.tribalWars.showStatisticsTooltip.replace("{conquersOwn}", "").replace("{conquersEnemy}", "");
				//currentStats = $(warInfo).html();

				var warDuration = $("td:eq(2)", row).html();
				warDuration = warDuration.substr(0, warDuration.lastIndexOf("<br>"));
				warDuration = warDuration.substr(warDuration.lastIndexOf("<br>") + 4);

				newTable += "<tr class='row_a'>";
				if (currentStats.size() == 1) {
					var topStatsRow = currentStats.find("tr:eq(2)");
					var conquersOwn = parseInt(topStatsRow.find("td:eq(1)").text().replace(".", ""), 10);
					var totalODA = topStatsRow.find("td:eq(3)").text();
					var totalODD = topStatsRow.find("td:eq(4)").text();
					var conquersEnemy = parseInt($("tr:eq(3) td:eq(1)", currentStats).text().replace(".", ""), 10);

					//q(conquersOwn + ":" + totalODA + ":" + totalODD + ":" + conquersEnemy);

					allConquersOwn += conquersOwn;
					allConquersEnemy += conquersEnemy;
					allTotalODA += parseInt(totalODA.replace(/\./g, ""), 10);
					allTotalODD += parseInt(totalODD.replace(/\./g, ""), 10);

					var conquerStats =
					trans.sp.tribalWars.villagesTaken
						.replace("{conquersOwn}", formatNumber(conquersOwn))
						.replace("{conquersEnemy}", formatNumber(conquersEnemy));

					var contributorTable = $("table.vis:last", warInfo);
					var topContributor = null;
					contributorTable.find("tr:gt(0)").each(function () {
						var villagesUp = parseInt($("td:eq(1)", this).text(), 10);
						var villagesDown = parseInt($("td:eq(2)", this).text(), 10);
						var villages = villagesUp - villagesDown;
						if (villages > 0 && (topContributor == null || topContributor.villages < villages)) {
							topContributor = { villagesUp: villagesUp, villagesDown: villagesDown, villages: villages, player: $("td:first", this).html() };
						}
					});

					var contributor = topContributor == null ? "" : trans.sp.tribalWars.biggestContributor.replace("{player}", topContributor.player).replace("{villagesUp}", topContributor.villagesUp).replace("{villagesDown}", topContributor.villagesDown);

					var currentState = "";
					if (conquersEnemy == 0 && conquersOwn == 0) {
						currentState = "grey";
					}
					else if (conquersEnemy == 0) {
						currentState = "green";
					}
					else if (conquersOwn < conquersEnemy) {
						currentState = "red";
					} else {
						currentState = "yellow";
					}

					newTable += "<td><a href='" + originalLink + "' title='" + trans.sp.tribalWars.showStatisticsTooltip + "'><img src='graphic/dots/" + currentState + ".png'></a> &nbsp;" + $("td:eq(1) a:first", row).outerHTML() + "</td>";
					newTable += "<td>" + warDuration + "</td>";
					newTable += "<td align=center>" + conquerStats + "</td><td align=center><b>" + $("tr:eq(5) td:eq(1)", currentStats).html() + "</b></td><td>" + contributor + "</td><td align=right>" + totalODA + "</td><td align=right>" + totalODD + "</td>";
					
				} else {
					// Nog geen data beschikbaar
					newTable += "<td><a href='" + originalLink + "' title='" + trans.sp.tribalWars.showStatisticsTooltip + "'><img src='graphic/dots/grey.png'></a> &nbsp;" + $("td:eq(1) a:first", row).outerHTML() + "</td>";
					newTable += "<td>" + warDuration + "</td>";
					newTable += "<td colspan=5>&nbsp;</td>";
				}
				newTable += "</tr>";

				if (debug_firstRowOnly || totalWars == warsProcessed) {
					// en dit kunnen we zomaar doen omdat js geen concurrency kent?
					newTable += "<tr>";
					var colspan = 2;
					newTable += "<td colspan=" + colspan + ">" + trans.sp.tribalWars.totalRowTitle.replace("{0}", totalWars) + "</td>";
					newTable += "<td align=center>" + trans.sp.tribalWars.villagesTaken
						.replace("{conquersOwn}", formatNumber(allConquersOwn))
						.replace("{conquersEnemy}", formatNumber(allConquersEnemy))
						+ "</td><td align=center><b>" + formatNumber(allConquersOwn - allConquersEnemy) + "</b></td><td>" + trans.sp.tribalWars.losePercentage.replace("{0}", Math.round(allConquersEnemy / (allConquersOwn + allConquersEnemy) * 10000) / 100) + "</td><td align=right>" + formatNumber(allTotalODA) + "</td><td align=right>" + formatNumber(allTotalODD) + "</td>"
						;

					newTable += "</tr>";
					newTable += "</table>";



					$("#content_value table.vis:eq(1)").after(newTable);

					$("#warsTotal").find("tr.row_a").sortElements(function (a, b) {
						return $("td:first", a).text() > $("td:first", b).text() ? 1 : -1;
					});

					$("#warsTotal").find("tr:even").removeClass("row_a").addClass("row_b");
				}
			}, { contentValue: false });
	});
}