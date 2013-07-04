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
            $("#units_form").append(htmlStr);
        }

        // tw 'Last' village - change text
        var existingLastLink = $("#target_attack").parent().prev().find("a:last");
        if (existingLastLink.size() != 0) {
            var regXY = existingLastLink.attr("onclick").toString().match(/val\((\d+)\);\$\('#inputy'\)\.val\((\d+)\)/);
            if (regXY != null) {
                htmlStr = printCoord({x: regXY[1], y: regXY[2]}, "&raquo; " + regXY[1] + "|" + regXY[2]);
                existingLastLink.attr("title", existingLastLink.text().substr(2));
                existingLastLink.html(htmlStr);
            }
        }

        // Add target village
        var targetVillage = getVillageFromCoords(spTargetVillageCookie());
        if (targetVillage.isValid) {
            dist = getDistance(targetVillage.x, vilHome.x, targetVillage.y, vilHome.y, speedCookie);
            $("#units_form").append("<br>" + printCoord(targetVillage, "&raquo; " + trans.sp.all.target + ": " + targetVillage.x + "|" + targetVillage.y) + " &nbsp;<span id=targetVilTime>" + dist.html + "</span>");
        }
    } catch (e) { handleException(e, "place-lastandtargetvillage"); }
}());