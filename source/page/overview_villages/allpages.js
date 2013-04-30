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

if (user_data.overviews.addFancyImagesToOverviewLinks) {
	var overviewLinks = $("#overview_menu a");
	overviewLinks.each(function(index) {
		var overviewLink = $(this),
			imageToAdd = "";
		
		switch (index) {
			case 0:
				overviewLink.parent().css("background-image", 'url("http://cdn2.tribalwars.net/graphic/icons/header.png")');
				overviewLink.parent().css("background-repeat", "no-repeat");
				overviewLink.parent().css("background-position", "-324px 0px");
				overviewLink.prepend("&nbsp; &nbsp;");
				break;
			case 1:
				imageToAdd = "graphic/buildings/storage.png";
				break;
			case 2:
				imageToAdd = "graphic/buildings/market.png";
				break;
			case 3:
				imageToAdd = "graphic/unit/unit_knight.png";
				break;
			case 4:
				imageToAdd = "graphic/command/attack.png";
				break;
			case 5:
				imageToAdd = "graphic/unit/att.png";
				break;
			case 6:
				imageToAdd = "graphic/buildings/main.png";
				break;
			case 7:
				imageToAdd = "graphic/buildings/smith.png";
				break;
			case 8:
				imageToAdd = "graphic/group_right.png";
				overviewLink.prepend("<img src='http://cdn2.tribalwars.net/"+imageToAdd+"' title='"+overviewLink.text()+"' /> &nbsp;");
				imageToAdd = "graphic/group_left.png";
				break;
			case 9:
				imageToAdd = "graphic/premium/coinbag_15x15.png";
				overviewLink.parent().width(150);
				break;
		}
		if (imageToAdd !== "") {
			overviewLink.prepend("<img src='http://cdn2.tribalwars.net/"+imageToAdd+"' title='"+overviewLink.text()+"' /> &nbsp;");
		}
		
		overviewLinks.parent().hover(function() {
				// Mouseover state
				$(this).animate({ backgroundColor: "#FFF5DA" /*#F0E2BE*/ }, { duration: 500, queue: false });
			},
			function() {
				// Mouseout state
			   $(this).animate({ backgroundColor: "#F4E4BC" }, { duration: 500, queue: false });
		});
	});
}