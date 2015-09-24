(function() {
    try {
        // sangupackage last village
        var cookie = pers.get("lastVil"),
            coord = getVillageFromCoords(cookie),
            dist;

        if (coord.isValid) {
            dist = getDistance(coord.x, vilHome.x, coord.y, vilHome.y, speedCookie);
            var htmlStr = printCoord(coord, "&raquo; " + trans.sp.all.last + ": " + coord.x + "|" + coord.y);
            htmlStr += " &nbsp; <span id=lastVilTime>" + dist.html + "</span>";
            $("#command-data-form").append(htmlStr);
        }

        // Add target village
        var targetVillage = getVillageFromCoords(spTargetVillageCookie());
        if (targetVillage.isValid) {
            dist = getDistance(targetVillage.x, vilHome.x, targetVillage.y, vilHome.y, speedCookie);
            $("#command-data-form").append("<br>" + printCoord(targetVillage, "&raquo; " + trans.sp.all.target + ": " + targetVillage.x + "|" + targetVillage.y) + " &nbsp;<span id=targetVilTime>" + dist.html + "</span>");
        }
    } catch (e) { handleException(e, "place-lastandtargetvillage"); }
}());