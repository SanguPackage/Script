function createMapJumpLink(name, x, y) {
	var loc = location.href;
	if (loc.indexOf("&") > -1) {
		loc = loc.substr(0, loc.indexOf("&") + 1);
	}
	else if (loc.indexOf("?") == -1) {
		loc += "?";
	}
	return "<a href='" + loc + "screen=map&x=" + x + "&y=" + y + "' class=sangujumperlink coordx=" + x + " coordy=" + y + ">" + name + " (" + x + "|" + y + ")</a>";
}

function mapJump() {
	if (user_data.jumper.enabled) {
		var cell = "<span style='display: none;' id=sanguJumperFrame>";
		if (location.href.indexOf("screen=map") > -1) {
			cell += trans.sp.jumper.name + " <input type= type=text size=6 id=sangujumperName style='height: 16px; border: 0; top: -2px; position: relative'> ";
			cell += trans.sp.jumper.xy + " ";
		}
		cell += "<input type=text type=text size=6 id=sangujumper style='height: 16px; border: 0; top: -2px; position: relative'>";
		cell += "</span>";
		cell += "&nbsp;<span class='icon ally internal_forum' title='" + trans.sp.jumper.goToMap + "' id=sangujumperOpen></span>";
		$("#menu_row2").append("<td>" + cell + "</td>");

		var favorites = "";
		if (user_data.favs) {
			$.each(user_data.favs, function (i, v) {
				if (v.active) {
					favorites += "<tr><td align=left colspan=2>" + createMapJumpLink(v.name, v.x, v.y) + "</td></tr>";
				}
			});
		}

		var cookie = pers.get("jumpers").split(",");
		if (cookie.length > 1) {
			for (i = 0; i < cookie.length; i += 2) {
				x = cookie[i + 1].substr(0, cookie[i + 1].indexOf("|"));
				y = cookie[i + 1].substr(cookie[i + 1].indexOf("|") + 1);
				favorites += "<tr><td align=left colspan=2>" + createMapJumpLink(cookie[i], x, y) + "&nbsp;<a href=# class=jumperdelete jumpname=" + cookie[i] + ">X</a></td></tr>";
			}
		}

		if (user_data.jumper.addTargetVillage) {
			var target = getVillageFromCoords(spTargetVillageCookie());
			if (target.isValid) {
				favorites += "<tr><td align=left colspan=2>" + createMapJumpLink(trans.sp.all.target, target.x, target.y) + "</td></tr>";
			}
		}

		if (user_data.jumper.addLastVillage) {
			var target = getVillageFromCoords(pers.get('lastVil'));
			if (target.isValid) {
				favorites += "<tr><td align=left colspan=2>" + createMapJumpLink(trans.sp.all.last, target.x, target.y) + "</td></tr>";
			}
		}


		if (location.href.indexOf("screen=map") == -1) {
			var newfavorites = ""; //"<div id=sangujumperpos style='display: none; background-image: url(\"http://nl10.tribalwars.nl/graphic/background/content.jpg\"); width: "+(user_data.jumper.width)+"px; border: 1px solid black'>";
			newfavorites += "<table id=sangujumperpos style='display: none; background-image: url(\"http://nl10.tribalwars.nl/graphic/background/content.jpg\"); border: 1px solid black' width=" + user_data.jumper.width + " cellspacing=0 cellpadding=0>";
			newfavorites += "<tr style='background-color: #dfcca6'><td><b>" + trans.sp.jumper.title + "</b></td><td align=right><a href=# id=sangujumperclose>" + trans.sp.jumper.close + "</a></td></tr>";
			newfavorites += favorites;
			newfavorites += "</table>";

			$("#header_info").prepend(newfavorites);

			$("#sangujumperclose").click(function () {
				$("#sangujumperpos").hide();
			});
		} else {
			$("#inputx").parent().parent().parent().append("<tr><th colspan=2>" + trans.sp.jumper.title + "</th></tr>" + favorites);
		}

		$(".sangujumperlink").click(function () {
			var link = $(this);
			$("#sangujumper").val(link.attr("coordx") + "|" + link.attr("coordy"));
			$("#sangujumperOpen").click();
			return false;
		});

		$(".jumperdelete").click(function () {
			var toDelete = $(this).attr("jumpname");

			var cookie = pers.get("jumpers").split(",");
			var newCookie = "";
			for (i = 0; i < cookie.length; i += 2) {
				if (cookie[i] != toDelete) {
					newCookie += "," + cookie[i] + "," + cookie[i + 1];
				}
			}
			$(this).parent().parent().remove();
			pers.set("jumpers", newCookie.length > 0 ? newCookie.substr(1) : "");
		});

		$("#sangujumperOpen").click(function () {
			trackClickEvent("JumperOpen");
			var input = $("#sangujumper");
			if ($("#sanguJumperFrame").is(":visible")) {
				var village = getVillageFromCoords(input.val(), true);
				if (village.isValid) {
					if (location.href.indexOf("screen=map") > -1 && $("#sangujumperName").val() != "") {
						// Add new favorite map location
						var name = $("#sangujumperName").val();

						var cookiefav = name + ',' + village.coord;
						var existing = pers.get("jumpers");
						if (existing.length > 0) {
							cookiefav += "," + existing;
						}
						pers.set("jumpers", cookiefav);
					}

					if (location.href.indexOf("screen=map") == -1) {
						var position = $("#sangujumperpos").offset();
						pers.set("jumperLeft", position.left);
						pers.set("jumperTop", position.top);
					}

					// Jump to coordinates on the map
					location.href = location.href.substr(0, location.href.indexOf("&screen")) + "&screen=map&x=" + village.x + "&y=" + village.y;
				} else {
					// incorrect coordinates
					if (!$("#sangujumperpos").is(":visible")) {
						$("#sangujumperpos").show();
						input.css("border", "1px solid red");
					} else
						$("#sangujumperpos").hide();
				}
			} else {
				// activate mapJumper
				var favs = $("#sangujumperpos");
				var left = pers.get("jumperLeft");
				var top = pers.get("jumperTop");
				if (!left) {
					left = user_data.jumper.left;
					top = user_data.jumper.top;
				}

				favs.css({ "left": left + "px", "top": top + "px", "position": "absolute", "z-index": 99999999 });
				UI.Draggable(favs);

				var input = $("#sangujumper");
				if (input.val() == "") {
					$("#sanguJumperFrame").add(favs).fadeIn();
				} else {
					$("#sanguJumperFrame").show();
					$("#sangujumperOpen").click();
				}
			}
		});
	}
}