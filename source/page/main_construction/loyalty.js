// show loyalty when building
// destroy button is disabled now (but for how long?)
if (user_data.ajaxLoyalty)
	ajax("overview", function (overview) {
		var toestemming = $("#show_mood div.vis_item", overview);
		if (toestemming.size() == 1)
			$(".modemenu tr:first").append("<td><b>" + trans.tw.main.loyaltyHeader + "</b> " + toestemming.html() + "</td>");
	});