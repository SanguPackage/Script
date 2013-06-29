// Activate / deactivate the tool
var isSanguActive = pers.get("sanguActive") == "true";
if (location.href.indexOf('changeStatus=') > -1) {
	isSanguActive = location.href.indexOf('changeStatus=true') > -1;
	pers.set("sanguActive", isSanguActive);
	pers.setGlobal("fixedToolTip_sanguActivatorTooltip", 1);
}

var activatorImage = isSanguActive ? "green" : 'red';
var activatorTitle = (!isSanguActive ? trans.sp.sp.activatePackage : trans.sp.sp.deactivatePackage) + " (v" + sangu_version + ")";

if (pers.get("forceCompatibility") === '' || pers.get("forceCompatibility") === 'false') {
    if (isSanguActive) {
        // Check compatibility with TW version
        if (pers.getGlobal("scriptWarningVersion") != server_settings.tw_version) {
            try {
                ScriptAPI.register('Sangu Package', server_settings.tw_version, 'Laoujin', server_settings.email);
            } catch (e) {
                $("#script_list a[href='mailto:"+server_settings.sanguEmail+"']").after(" &nbsp;<a href='' id='removeScriptWarning'>"+trans.sp.sp.removeScriptWarning+"</a>");
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
}

$("#storage").parent()
	.after(
		"<td class='icon-box' nowrap><a href=" + location.href.replace("&changeStatus=" + isSanguActive, "") 
		+ "&changeStatus=" + (!isSanguActive) + "><img src='graphic/dots/" + activatorImage 
		+ ".png' title='" + activatorTitle 
		+ "' id='sangu_activator' /></a>&nbsp;</td>");

// First time run message - Position beneath resource/storage display
if (!isSanguActive) {
	var position = $("#storage").position();
	var options = {
		left: position.left - 150, 
		top: position.top + 35
	};
	var content = {body: trans.sp.sp.firstTimeRun.replace("{img}", "<img src='graphic/dots/red.png' />")};
	createFixedTooltip("sanguActivatorTooltip", content, options);
}