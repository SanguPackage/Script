var isDodge = pers.getCookie("sanguDodge" + getQueryStringParam("village"));
if (isDodge) {
	// Display dodge time and slowest unit in the village (cookied from the mainTagger)
	isDodge = isDodge.split("~");
	var header = $("h2:first", content_value);
	$("tbody:first", content_value)
		.prepend(
			"<tr><td><table width=100% cellpadding=0 cellspacing=0><tr><td width=99% style='font-size: 18pt'><b>" + header.html() 
			+ "</b></td><td nowrap width=250><div title='" + trans.sp.map.dodgeLastTagged + "' style='border: 1px solid black; padding: 2px; background-color: " 
			+ (isDodge[0] == 'unit_snob' ? user_data.colors.special : user_data.colors.good) + "'><img src=graphic/unit/" + isDodge[0] + ".png> <b>" + isDodge[1] 
			+ "</b></div></td></tr></table></td></tr>");
	header.remove();
}