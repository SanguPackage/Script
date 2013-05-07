// adjust links to incoming attacks/support
if (user_data.global.incomings.editLinks) {
	var incoming = $("table.box:last");
	var incomingAttacks = $("a[href*='subtype=attacks']", incoming);
	if (incomingAttacks.size() > 0) {
		incomingAttacks.attr("href", incomingAttacks.attr("href") + "&page=-1&group=0");
	}
	var incomingSupport = $("a[href*='subtype=supports']", incoming);
	if (incomingSupport.size() > 0) {
		incomingSupport.attr("href", incomingSupport.attr("href") + "&page=-1&group=0");
	}
}