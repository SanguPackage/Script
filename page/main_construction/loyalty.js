// show loyalty when building
// destroy button is disabled now (but for how long?)
if (server_settings.ajaxAllowed && user_data.main.ajaxLoyalty) {
	ajax("overview", function (overview) {
		var loyalty = $("#show_mood div.vis_item", overview);
		if (loyalty.length == 1) {
			$(".modemenu tr:first").append("<td><b>" + trans.tw.main.loyaltyHeader + "</b> " + loyalty.html() + "</td>");
		}
	});
}
