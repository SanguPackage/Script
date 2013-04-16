// make the editting groups box less wide
// add alternating row colors
$("#edit_group_href").click(function () {
	var groupTable = $("#group_list");
	groupTable.width(300);

	groupTable.find("th:first").attr("colspan", "3");
	var mod = 0;
	groupTable.find("tr:gt(0)").each(function () {
		mod++;
		$(this).addClass("row_" + (mod % 2 == 0 ? "a" : "b"));
	});
});

// change troops overview link to active sangu page
if (user_data.command.changeTroopsOverviewLink) {
	var troopsOverviewLink = $("#overview_menu a[href*='mode=units']");
	troopsOverviewLink.attr("href", troopsOverviewLink.attr("href") + "&type=own_home");
}