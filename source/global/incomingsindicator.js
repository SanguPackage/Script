// adjust links to incoming attacks/support
if (user_data.global.incomings.active) {
	var incoming = $("table.box:last");
	var incomingAttacksLinks = $("a[href*='subtype=attacks']", incoming);
	if (incomingAttacksLinks.size() > 0) {
		if (user_data.global.incomings.editLinks) {
			incomingAttacksLinks.attr("href", incomingAttacksLinks.attr("href") + "&page=-1&group=0");
		}
		if (user_data.global.incomings.track) {
			incomingAttacksLinks.parent().css("white-space", "nowrap");
		
			// Split current and new attacks in incomings link
			var incomingAttacksAmountLink = incomingAttacksLinks.last();
			var currentAmountOfIncomings = incomingAttacksAmountLink.text().match(/\d+/)[0];
			var lastKnownAmountOfIncomings = pers.get("lastKnownAmountOfIncomings") || 0;
			if (currentAmountOfIncomings != lastKnownAmountOfIncomings) {
				var newAttacks = currentAmountOfIncomings - lastKnownAmountOfIncomings;
				if (newAttacks >= 0) {
					newAttacks = "+" + newAttacks;
				}
			
				incomingAttacksAmountLink.html(server_settings.scriptConfig.incomingsIndicator.replace("{current}", currentAmountOfIncomings).replace("{difference}", newAttacks));
			}
			
			// Set last incomings-check time
			if (current_page == "overviews\\incomings") {
				var lastCheckTime = pers.get("lastKnownAmountOfIncomingsTime");
				if (!!lastCheckTime) {
					lastCheckTime = prettyDate(new Date().getTime() - parseInt(lastCheckTime, 10));
				
					// show info tooltip
					var position = incomingAttacksAmountLink.position();
					var options = {
						left: position.left - 200, 
						top: position.top + 35,
						width: 250
					};
					var content = {body: trans.sp.incomings.indicator.lastTimeCheckHintBoxTooltip.replace("{img}", "<img src='graphic/ally_forum.png'>")};
					createFixedTooltip("incomingsIndicatorHelp", content, options);
				} else {
					lastCheckTime = trans.sp.incomings.indicator.lastTimeCheckNotYetSet;
				}
				
				// change last incomings-check time
				incomingAttacksLinks.last().parent().after(
					"<td class='box-item' id='changeLastCheckTimeBox'><a href='#' id='changeLastCheckTime'>&nbsp;"
					+ "<img src='graphic/ally_forum.png' style='padding-top: 5px' "
					+ "title='"+trans.sp.incomings.indicator.setLastTimeCheckTitle.replace("{time}", lastCheckTime)+"'/>&nbsp;</a></td>");
				
				$("#changeLastCheckTime").click(function() {
					var newCheckTime = new Date();
					pers.set("lastKnownAmountOfIncomingsTime", newCheckTime.getTime());
					pers.set("lastKnownAmountOfIncomings", currentAmountOfIncomings);
					
					pers.setGlobal("fixedToolTip_incomingsIndicatorHelp", 1);
					$("#changeLastCheckTimeBox").fadeOut();
					window.location.href = window.location.href;
				});
			}
		}
	} else {
		if (user_data.global.incomings.track) {
			pers.set("lastKnownAmountOfIncomings", 0);
		}
	}

	var incomingSupport = $("a[href*='subtype=supports']", incoming);
	if (incomingSupport.size() > 0) {
		if (user_data.global.incomings.editLinks) {
			incomingSupport.attr("href", incomingSupport.attr("href") + "&page=-1&group=0");
		}
	}
}