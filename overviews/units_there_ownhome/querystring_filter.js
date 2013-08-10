var search = window.location.search.substring(1).split("&");
for (i = 0; i < search.length; i++) {
    var item = search[i].split("=");
    switch (item[0]) {
        case 'unit':
            doFilter = true;
            unitIndex = world_data.units.indexOf(item[1]);
            break;
        case 'amount':
            doFilter = true;
            unitAmount = parseInt(item[1], 10);
            break;
        case 'changeSpeed':
            changeSpeed = item[1];
            if (changeSpeed != false) {
                //spSpeedCookie(changeSpeed);
                currentPageSpeed = changeSpeed;
            }
            break;

        case 'targetvillage':
            var newTargetVillage = getVillageFromCoords(item[1]);
            spTargetVillageCookie(newTargetVillage.coord);
            break;

        case 'sort':
            sort = item[1] == "true";
            break;
    }
}