// Activate / deactivate the tool	
var isSanguActive = getCookie("sanguActive") == "true";
if (location.href.indexOf('changeStatus=') > -1) {
	isSanguActive = location.href.indexOf('changeStatus=true') > -1;
	setCookie("sanguActive", isSanguActive);
}
$("#storage").parent().after("<td class='icon-box' nowrap><a href=" + location.href.replace("&changeStatus=" + isSanguActive, "") + "&changeStatus=" + (!isSanguActive) + "><img src='graphic/dots/" + (isSanguActive ? 'green' : 'red') + ".png' title='" + (!isSanguActive ? trans.sp.sp.activatePackage : trans.sp.sp.deactivatePackage) + " (v" + sangu_versie + ")' /></a>&nbsp;</td>");