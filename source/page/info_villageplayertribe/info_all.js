var tables = $('#content_value table.vis');
var infoTable = tables.first();
var profile = user_data.profile;

// extra links on the village overview page
if (location.href.indexOf('screen=info_village') > -1 && user_data.villageInfo.active)
{
	//var infoTable = $("#content_value table:first table:first");
	var id = infoTable.find("td:eq(1)").text();
	id = id.substr(id.lastIndexOf("=") + 1);
	var link = getUrlString("&screen=overview_villages&type=own_home&mode=units&page=-1&doelvillage=" + id);
	// TODO: not yet translated!
	infoTable.find("tbody:first").append("<tr><td><a href='" + link + user_data.villageInfo.off_link + "'>&raquo; Aanvalleuh!</a></td><td><a href='" + link + user_data.villageInfo.def_link + "'>&raquo; Verdedigen!</a></td><tr>");
}

if (user_data.profile.show && (location.href.indexOf('screen=info_village') == -1 || user_data.showPlayerProfileOnVillage))
{
	var screen;
	var id;
	var mapProfile = user_data.profile.mapLink;
	var isVillage = false;
	if (location.href.indexOf('screen=info_ally') == -1 && location.href.indexOf('screen=ally&mode=profile') == -1)
	{
		// speler en dorp info pagina
		// Extra links en info in tabel links boven
		screen = "player";
		if (user_data.proStyle) $("#content_value td:first").css("width", "40%").next().css("width", "60%");
		if (location.href.indexOf('screen=info_player') > -1)
		{
			// speler info pagina
			id = infoTable.find("tr:eq(5) a").attr("href");
			if (id == undefined)
			{
				// no premium
				id = infoTable.find("tr a:first").attr("href");
			}
			id = id.substr(id.indexOf("&player=") + 8);
			if (id.indexOf("&") > -1)
				id = id.substr(0, id.indexOf("&"));
		}
		else
		{
			// dorp info pagina
			isVillage = true;
			tables = $("#content_value");
			infoTable = $("table.vis:first", tables);
			id = infoTable.find("tr:eq(3) a");
			if (id.size() > 0) { id = id.attr("href"); id = id.substr(id.lastIndexOf("=") + 1); }
			else id = 0;

			

			/*var tab = "<table><tr><td valign='top'>";
			tab += "<table class='vis' width='100%'>" + infoTable.html() + "</table>";
			tab += "</td><td valign='top' style='min-width:240px' width=240>";
			tab += "<table class='vis' width='100%'><tr><th colspan='2'>Profiel</th></tr></table>";
			tab += "</td></tr></table>";*/

			//alert(infoTable.size() + ": " + infoTable.html());
			//infoTable.replaceWith(tab);
			//tables = $('table.vis');
			//infoTable = tables.first();
		}

		// Rechstreekse link naar TW Stats map
		if (id > 0 && profile.mapLink.show)
		{
			var link = "http://" + game_data.market + ".twstats.com/" + game_data.world + "/index.php?page=map";
			var tribeId = infoTable.find("td:eq(7) a");
			if (tribeId.size() == 1)
			{
				tribeId = tribeId.attr("href");
				tribeId = tribeId.substr(tribeId.lastIndexOf('=') + 1);
			}
			else tribeId = 0;

			if (mapProfile.tribeColor != null)
			{
				link += "&tribe_0_id=" + tribeId + "&tribe_0_colour=" + mapProfile.tribeColor;
			}
			if (mapProfile.yourTribeColor != null && game_data.player.ally_id != tribeId && game_data.player.ally_id > 0)
			{
				link += "&tribe_1_id=" + game_data.player.ally_id + "&tribe_1_colour=" + mapProfile.yourTribeColor;
			}
			link += "&player_0_id=" + id + "&player_0_colour=" + mapProfile.playerColor;
			link += "&grid=" + (mapProfile.grid ? 1 : 0) + "&fill=" + mapProfile.fill + "&zoom=" + mapProfile.zoom + "&centrex=" + mapProfile.centreX + "&centrey=" + mapProfile.centreY;
			if (mapProfile.markedOnly) link += "&nocache=1";
			if (mapProfile.ownColor != null && game_data.player.id != id)
			{
				link += "&player_1_id=" + game_data.player.id + "&player_1_colour=" + mapProfile.ownColor;
			}
			infoTable.find("tr:last").after("<tr><td colspan=2><a href='" + link + "' target='_blank'>&raquo; " + trans.sp.profile.twStatsMap + "</a> " + trans.sp.profile.externalPage + "</td></tr>");
		}

		if (!isVillage)
		{
			// Aantal dorpen
			if (user_data.proStyle)
			{
				// dorpnaam nooit op 2 lijnen
				var colWidth = $("#content_value table:eq(2) th");
				colWidth.first().css("width", "98%");
				colWidth.eq(1).css("width", "1%");
				colWidth.eq(2).css("width", "1%");
			}

			var aantalDorpen = tables.eq(1).find("th:first").text();
			aantalDorpen = aantalDorpen.substr(aantalDorpen.indexOf("(") + 1);
			aantalDorpen = aantalDorpen.substr(0, aantalDorpen.length - 1);
			infoTable.find("tr:eq(2)").after("<tr><td>" + trans.sp.profile.villages + "</td><td>" + formatNumber(aantalDorpen) + "</td></tr>");
		}
	}
	else
	{
		screen = "tribe";
		if (location.href.indexOf('screen=ally&mode=profile') > -1) infoTable = tables.eq(1);
		id = infoTable.find("a");
		if (id.size() == 4) id = id.eq(2).attr("href");
		else id = id.eq(1).attr("href");
		id = id.substr(id.lastIndexOf("/") + 1);

		var link = "http://" + game_data.market + ".twstats.com/" + game_data.world + "/index.php?page=map";
		link += "&tribe_0_id=" + id + "&tribe_0_colour=" + mapProfile.tribeColor;
		link += "&centrex=" + mapProfile.centreX + "&centrey=" + mapProfile.centreY;
		if (mapProfile.yourTribeColor != null && game_data.player.ally_id != id)
		{
			link += "&tribe_1_id=" + game_data.player.ally_id + "&tribe_1_colour=" + mapProfile.yourTribeColor;
		}
		link += "&grid=" + (mapProfile.grid ? 1 : 0) + "&fill=" + mapProfile.fill + "&zoom=" + mapProfile.zoom
		if (mapProfile.markedOnly) link += "&nocache=1";
		if (mapProfile.ownColor != null)
		{
			link += "&player_0_id=" + game_data.player.id + "&player_0_colour=" + mapProfile.ownColor;
		}
		infoTable.find("tr:last").before("<tr><td colspan=2><a href='" + link + "' target='_blank'>&raquo; " + trans.sp.profile.twStatsMap + "</a> " + trans.sp.profile.externalPage + "</td></tr>");
	}

	// Grafieken opbouwen
	if (id > 0)
	{
		var html = "";

		// TWMap graphs
		var twMapGraphs;
		if (screen == "tribe") twMapGraphs = [["tribe", trans.sp.profile.graphTWMap], ["p_tribe", trans.sp.profile.graphPoints], ["oda_tribe", trans.sp.profile.graphODA], ["odd_tribe", trans.sp.profile.graphODD]];
		else twMapGraphs = [["player", trans.sp.profile.graphTWMap], ["p_player", trans.sp.profile.graphPoints], ["oda_player", trans.sp.profile.graphODA], ["odd_player", trans.sp.profile.graphODD]];
		for (var i = 0; i < twMapGraphs.length; i++)
		{
			var graphDetails = screen == "tribe" ? profile.twMapTribeGraph[twMapGraphs[i][0]] : profile.twMapPlayerGraph[twMapGraphs[i][0]];
			if (graphDetails[0])
				html += createSpoiler(twMapGraphs[i][1], '<img src="http://' + game_data.world + '.tribalwarsmap.com/' + game_data.market + '/graph/' + twMapGraphs[i][0] + '/' + id + '" title="' + trans.sp.profile.graphTWMap + '">', graphDetails[1]);
		}

		// TWStats graphs
		var graphs = [["points", trans.sp.profile.graphPoints], ["villages", trans.sp.profile.graphVillages], ["od", trans.sp.profile.graphOD], ["oda", trans.sp.profile.graphODA], ["odd", trans.sp.profile.graphODD], ["rank", trans.sp.profile.graphRank]];
		if (screen == "tribe") graphs.push(["members", trans.sp.profile.graphMembers]);
		var toShow = screen == "tribe" ? profile.tribeGraph : profile.playerGraph;
		for (var i = 0; i < graphs.length; i++)
		{
			if (toShow[i][1])
			{
				var graphType = toShow[i][1] == 'big' ? 'ss' : '';
				html += createSpoiler(graphs[i][1], '<img src="http://' + game_data.market + '.twstats.com/image.php?type=' + screen + graphType + 'graph&id=' + id + '&s=' + game_data.world + '&graph=' + graphs[i][0] + '">', toShow[i][2] != undefined);
			}
		}

		// Grafieken tonen
		if (html.length > 0)
		{
			var pictureTable;
			if (screen == 'player' || (isVillage && user_data.showPlayerProfileOnVillage))
			{
				pictureTable = tables.eq(2);
				if (isVillage || pictureTable.html() == null)
				{
					// Als er info noch persoonlijke tekst is
					pictureTable = $("<table class='vis' width='100%'><tr><th colspan='2'>" + trans.tw.profile.title + "</th></tr></table>");
					$("#content_value td:first").next().prepend(pictureTable);
				}
				else if (pictureTable.find("th").text() != trans.tw.profile.title)
				{
					// TODO: er is een ; achter de IF, is dat de bedoeling???
					if (pictureTable.find("th:first").text() == trans.tw.profile.awardsWon);
					pictureTable = pictureTable.parent();

					// Als er enkel de node "Persoonlijke info" is
					var temp = $("<table class='vis' width='100%'><tr><th colspan='2'>" + trans.tw.profile.title + "</th></tr></table>");
					pictureTable.prepend(temp);
					pictureTable = temp;
				}

				if (pictureTable.find("td[colspan=2]").size() > 0)
				{
					pictureTable.find("td:last").attr("colspan", 1).css("width", 240).after("<td>" + html + "</td>");
				}
				else
				{
					pictureTable.find("tr:last").after("<tr><td colspan=2>" + html + "</td></tr>");
				}
			}
			else
			{
				infoTable.after("<table class=vis width='100%'><tr><th>" + trans.tw.profile.title + "</th></tr><tr><td>" + html + "</td></tr></table>");
			}
		}
	}

	// Overnames (intern)
	if (id > 0 && profile.popup.show) // && !isVillage)
	{
		var twLink = 'http://' + game_data.market + '.twstats.com/' + game_data.world + '/index.php?page=' + screen + '&mode=conquers&id=' + id + '&pn=1&type=1&enemy=-1&enemyt=-1&min=&max=';
		var overnames = "<tr><td colspan=2><a href=\"\" id='overnames'>&raquo; " + trans.sp.profile.conquers + "</a> " + trans.sp.profile.internalPage + "</td></tr>";
		if (screen == 'tribe')
			infoTable.find("tr:last").before(overnames);
		else
			infoTable.find("tr:last").after(overnames);
		var popupWidth = profile.popup.width;
		var popupHeight = profile.popup.height;
		infoTable.after('<div class="messagepop pop" id="popup" style="display: none"><iframe src=' + twLink + ' width=' + popupWidth + ' height=' + popupHeight + '></div>');
		$("#popup").css({ "left": ($('window').width() - 60 - popupWidth), "top": 10, "background-color": "#FFFFFF", "border": "1px solid #999999", "position": "absolute", "width": popupWidth, "height": popupHeight, "z-index": 50, "padding": "25px 25px 20px" });

		$(function ()
		{
			$("#overnames").on('click', function (event)
			{
				if ($(this).hasClass('selected'))
					$("#overnames").removeClass("selected");
				else
					$(this).addClass("selected");
				$("#popup").css({ "left": ($(window).width() - 60 - popupWidth) }).toggle();
				return false;
			});

			$("#popup").on('click', function ()
			{
				$("#popup").hide();
				$("#overnames").removeClass("selected");
				return false;
			});
		});
	}
}

if (location.href.indexOf('screen=info_village') > -1 && user_data.proStyle && profile.moveClaim)
{
	// move claim naar ergens waar het geen kwaad kan
	if ($("td:eq(8)", infoTable).text() == trans.tw.profile.claimedBy)
	{
		infoTable.append($("tr:eq(5),tr:eq(6)", infoTable));
	}
}