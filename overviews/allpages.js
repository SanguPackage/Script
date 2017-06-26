// make the editting groups box less wide
// and add alternating row colors
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
//				overviewLink.parent()
//                    .css("background-image", 'url("https://www.tribalwars.vodka/graphic/icons/header.png")')
//				    .css("background-repeat", "no-repeat")
//				    .css("background-position", "-324px 0px")
//				    .css("background-size", "200px Auto");
//
//				overviewLink.prepend("&nbsp; &nbsp;");
				break;
			case 1:
				imageToAdd = "graphic/buildings/storage.png";
				break;
			case 2:
				imageToAdd = "graphic/buildings/market.png";
				break;
			case 3:
				if (overviewLink.parent().hasClass("selected")) {
					$("table.modemenu:last a", content_value).each(function(index) {
						imageToAdd = "";
						switch (index) {
							case 1:
								imageToAdd = "graphic/buildings/place.png";
								break;
							case 2:
								imageToAdd = "graphic/pfeil.png";
								break;
							case 3:
							case 4:
								$(this).css("opacity", "0.5");
								break;
							case 5:
								imageToAdd = "graphic/command/support.png";
								break;
							case 6:
								imageToAdd = "graphic/rechts.png";
								break;
						}
						
						if (imageToAdd !== "") {
                            $(this).prepend("<img src='https://www.tribalwars.vodka/"+imageToAdd+"' title='"+overviewLink.text() + " &gt; " + $(this).text()+"' /> &nbsp;");
						}
					});
				}
				
				imageToAdd = "graphic/unit/unit_knight.png";
				break;
			case 4:
				if (overviewLink.parent().hasClass("selected")) {
					$("table.modemenu:last a", content_value).each(function(index) {
						imageToAdd = "";
						switch (index) {
							case 1:
								imageToAdd = "graphic/command/attack.png";
								break;
							case 2:
								imageToAdd = "graphic/command/support.png";
								break;
							case 3:
								imageToAdd = "graphic/command/return.png";
								break;
						}
						
						if (imageToAdd !== "") {
                            $(this).prepend("<img src='https://www.tribalwars.vodka/"+imageToAdd+"' title='"+overviewLink.text() + " &gt; " + $(this).text()+"' /> &nbsp;");
						}
					});
				}
			
				imageToAdd = "graphic/command/attack.png";
				break;
			case 5:
				if (overviewLink.parent().hasClass("selected")) {
					$("table.modemenu:last a", content_value).each(function(index) {
						imageToAdd = "";
						switch (index) {
							case 1:
								imageToAdd = "graphic/command/attack.png";
								break;
							case 2:
								imageToAdd = "graphic/command/support.png";
								break;
						}
						
						if (imageToAdd !== "") {
                            $(this).prepend("<img src='https://www.tribalwars.vodka/"+imageToAdd+"' title='"+overviewLink.text() + " &gt; " + $(this).text()+"' /> &nbsp;");
						}
					});
				}
			
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
                overviewLink.prepend("<img src='https://www.tribalwars.vodka/"+imageToAdd+"' title='"+overviewLink.text()+"' /> &nbsp;");
				imageToAdd = "graphic/group_left.png";
				break;
			case 9:
				imageToAdd = "graphic/premium/coinbag_14x14.png";
				overviewLink.parent().width(150);
				break;
		}
		if (imageToAdd !== "") {
            overviewLink.prepend("<img src='https://www.tribalwars.vodka/"+imageToAdd+"' title='"+overviewLink.text()+"' />&nbsp;&nbsp;");
		}
	});
}