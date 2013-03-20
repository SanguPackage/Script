// Activate / deactivate the tool
var isSanguActive = pers.get("sanguActive") == "true";
if (location.href.indexOf('changeStatus=') > -1) {
	isSanguActive = location.href.indexOf('changeStatus=true') > -1;
	pers.set("sanguActive", isSanguActive);
}

var loginMonitor = pers.get("sanguLogin");
if (loginMonitor === '') {
	loginMonitor = new Date("2013-03-18");
	loginMonitor.setHours(0, 0, 0);
} else {
	loginMonitor = Date.parse(loginMonitor);
}
if (Math.abs(loginMonitor.getTime() - (new Date()).getTime()) > 1000 * 3600 * 24) {
	loginMonitor = new Date();
	loginMonitor.setHours(0, 0, 0);
	loginMonitor = loginMonitor.getFullYear() + '-' + (loginMonitor.getMonth()+1) + '-' +  loginMonitor.getDate();
	trackEvent("UserScripts", "Startup", loginMonitor);
	pers.set("sanguLogin", loginMonitor);	
}

$("#storage").parent()
	.after(
		"<td class='icon-box' nowrap><a href=" + location.href.replace("&changeStatus=" + isSanguActive, "") 
		+ "&changeStatus=" + (!isSanguActive) + "><img src='graphic/dots/" + (isSanguActive ? 'green' : 'red') 
		+ ".png' title='" + (!isSanguActive ? trans.sp.sp.activatePackage : trans.sp.sp.deactivatePackage) 
		+ " (v" + sangu_version + ")' /></a>&nbsp;</td>");
		

/*function createFixedTooltip(id, position, title, content) {
	$("#content_value").after('<div id="' + id + '" class="vis" style="z-index: 100001; margin: 2px; width: 350px; display: block; position:absolute; top: '+position.top+'px; left: '+position.left+'px; border: 1px solid black; background-color: #F4E4BC">'
			+ '<h4>' + '<img class="closeTooltip" style="float: right; cursor: pointer;" src="graphic/minus.png">' + title + '</h4>'
			+ '<div style="display: block; text-align: left; margin: 2px;">' + content + '</div>'
			+ '</div>');
	
	$(".closeTooltip").click(function() { $("#" + id).hide(); } );
}


// Position beneath resource/storage display
var position = $("#storage").position();
position = {left: position.left - 150, top: position.top + 35};
createFixedTooltip("sanguActivatorTooltip", position, "Sangu Package", "Er is een nieuwe versie van het Sangu Package beschikbaar! <a href='http://sangu.be' target='_blank'>Nu downloaden!</a>");
*/