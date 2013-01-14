// Color resources
resourceColoring();

// Jump to custom position on the map
mapJump();

// TODO: Sangu settings - add link to them!
//$("#menu_row td:last").before("<td class='menu-item'><a target='_top' href='"+getUrlString("screen=settings&mode=sangu")+"'>Sangu</a></td>");

// adjust links to incoming attacks/support
if (user_data.editAttackLink) {
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