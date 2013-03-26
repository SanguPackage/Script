// Activate / deactivate the tool
var isSanguActive = pers.get("sanguActive") == "true";
if (location.href.indexOf('changeStatus=') > -1) {
	isSanguActive = location.href.indexOf('changeStatus=true') > -1;
	pers.set("sanguActive", isSanguActive);
}

var activatorImage = isSanguActive ? "green" : 'red';
var activatorTitle = (!isSanguActive ? trans.sp.sp.activatePackage : trans.sp.sp.deactivatePackage) + " (v" + sangu_version + ")";

if (isSanguActive) {
	// Send usage statistics to GA once/day
	var loginMonitor = pers.get("sanguLogin");
	if (loginMonitor !== '') {
		var parts = loginMonitor.match(/(\d+)/g);
		loginMonitor = new Date(parts[0], parts[1]-1, parts[2]);
		
		if (Math.abs(loginMonitor.getTime() - (new Date()).getTime()) > 1000 * 3600 * 24) {
			loginMonitor = '';
		}
	}
	if (loginMonitor === '') {
		loginMonitor = new Date();
		loginMonitor.setHours(0, 0, 0);
		loginMonitor = loginMonitor.getFullYear() + '-' + pad(loginMonitor.getMonth()+1, 2) + '-' +  pad(loginMonitor.getDate(), 2);
		trackEvent("UserScripts", "Startup", loginMonitor);
		pers.set("sanguLogin", loginMonitor);
	}
	
	// Check compatibility with TW version
	if (pers.getGlobal("scriptWarningVersion") != server_settings.tw_version) {
		var sanguEmail = "sangu.be";
		try {
			ScriptAPI.register('Sangu Package', server_settings.tw_version, 'Laoujin', sanguEmail);
		} catch (e) {
			$("#script_list a[href='mailto:"+sanguEmail+"']").after(" &nbsp;<a href='' id='removeScriptWarning'>"+trans.sp.activator.removeScriptWarning+"</a>");
			$("#removeScriptWarning").click(function() {
				pers.setGlobal("scriptWarningVersion", server_settings.tw_version);
			});
		}
	}
}

// gray icon when tw version doesn't match
if (pers.getGlobal("scriptWarningVersion") == server_settings.tw_version) {
	activatorImage = "grey";
	activatorTitle = trans.sp.sp.activatePackageWithCompatibility.replace("{version}", sangu_version);
}

$("#storage").parent()
	.after(
		"<td class='icon-box' nowrap><a href=" + location.href.replace("&changeStatus=" + isSanguActive, "") 
		+ "&changeStatus=" + (!isSanguActive) + "><img src='graphic/dots/" + activatorImage 
		+ ".png' title='" + activatorTitle 
		+ "' /></a>&nbsp;</td>");

function createFixedTooltip(id, position, title, content) {
	$("#content_value").after('<div id="' + id + '" class="vis" style="z-index: 100001; margin: 2px; width: 350px; display: block; position:absolute; top: '+position.top+'px; left: '+position.left+'px; border: 1px solid black; background-color: #F4E4BC">'
			+ '<h4>' + '<img class="closeTooltip" style="float: right; cursor: pointer;" src="graphic/minus.png">' + title + '</h4>'
			+ '<div style="display: block; text-align: left; margin: 2px;">' + content + '</div>'
			+ '</div>');
	
	$(".closeTooltip").click(function() { 
		$("#" + id).hide(); 
		pers.setGlobal("sanguFirstRun", "1");
	});
}

// First time run message - Position beneath resource/storage display
if (pers.getGlobal("sanguFirstRun") == '') {
	if (isSanguActive) {
		pers.setGlobal("sanguFirstRun", "1");
		
	} else {
		var position = $("#storage").position();
		position = {left: position.left - 150, top: position.top + 35};
		createFixedTooltip("sanguActivatorTooltip", position, "Sangu Package", trans.sp.sp.firstTimeRun);
	}
}