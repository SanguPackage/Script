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