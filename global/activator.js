// Activate / deactivate the tool
var isSanguActive = pers.get("sanguActive") == "true";
if (location.href.indexOf('changeStatus=') > -1) {
	isSanguActive = location.href.indexOf('changeStatus=true') > -1;
	pers.set("sanguActive", isSanguActive);
	pers.setGlobal("fixedToolTip_sanguActivatorTooltip", 1);
}

var activatorImage = isSanguActive ? "green" : 'red';
var activatorTitle = (!isSanguActive ? trans.sp.sp.activatePackage : trans.sp.sp.deactivatePackage) + " (v" + sangu_version + ")";

function isSanguCompatible() {
    return sangu_version.indexOf(game_data.majorVersion) === 0;
}

if (pers.get("forceCompatibility") === '' || pers.get("forceCompatibility") === 'false') {
    if (isSanguActive) {
        // Check compatibility with TW version
        if (!isSanguCompatible()) {
            try {
                ScriptAPI.register('Sangu Package', sangu_version, 'Laoujin', server_settings.sanguEmail);
            } catch (e) {
                $("#script_list a[href$='mailto:"+server_settings.sanguEmail+"']").after(" &nbsp;<a href='' id='removeScriptWarning'>"+trans.sp.sp.removeScriptWarning+"</a>");
                $("#removeScriptWarning").click(function() {
                    pers.set("forceCompatibility", "true");
                });
            }
        }
    }

    // gray icon when tw version doesn't match
    if (!isSanguCompatible()) {
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
    (function() {
        var position = $("#storage").position(),
            options = {
                left: position.left - 150,
                top: position.top + 35
            },
            content = {body: trans.sp.sp.firstTimeRun.replace("{img}", "<img src='graphic/dots/red.png' />")};

        createFixedTooltip("sanguActivatorTooltip", content, options);
    }());
}