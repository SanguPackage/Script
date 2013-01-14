var maxSitDays = 60;
var daysTable = $("#content_value table.vis:eq(1)");
var days = $("td:last", daysTable).text();
days = maxSitDays - parseInt(days.substr(0, days.indexOf(" ")), 10);
if (days > 0) {
	var tillTime = new Date();
	tillTime.setDate(tillTime.getDate() + days);
	daysTable.append("<tr><td>" + trans.sp.rest.sittingAttackTill + "</td><td>" + (tillTime.getDate() + "." + pad(tillTime.getMonth() + 1, 2) + "." + tillTime.getFullYear()) + "</td></tr>");
} else {
	daysTable.find("td:last").css("background-color", user_data.colors.error);
}