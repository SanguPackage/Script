if (server_settings.ajaxAllowed && user_data.global.visualizeFriends) {
    (function() {
        //console.time("friends");
        try {
            function Friends() {
                this.lastCheck = new Date().getTime();
                this.online = {
                    names: "",
                    amount: 0
                };
                this.offlineAmount = 0;
            }

            function parseFriendsTable(overview) {
                var friendsTable = $("table.vis:first", overview);
                if (friendsTable.size() == 1) {
                    var friendRows = friendsTable.find("tr:gt(0)");
                    friendRows.each(function() {
                        var friendName = $("a:first", this).text();
                        var statusIndicatorImage = $("img:first", this);
                        if (/red\.png/.test(statusIndicatorImage.attr("src"))) {
                            friends.offlineAmount++;
                        } else {
                            friends.online.names += ", " + friendName;
                            friends.online.amount++;
                        }
                    });

                    pers.set("friendsOnline", JSON.stringify(friends));
                }
            }

            var friendsLink = $("#footer_left").find("a[href$='&screen=buddies']"),
                friends = pers.get("friendsOnline");

            // check friends page only every 5 minutes (or when on friends page itself)
            if ($("#village_link").val() == "/game.php?screen=buddies") {
                friends = new Friends();
                parseFriendsTable(content_value);
            }
            else {
                if (friends) {
                    friends = JSON.parse(friends);
                }
                if (!friends || friends.lastCheck < new Date().getTime() - 1000 * 60 * 3) {
                    friends = new Friends();
                    ajax("buddies", parseFriendsTable, {async: false});
                }
            }

            friendsLink.html(
                trans.sp.rest.friendsOnline
                    .replace("{friends}", friendsLink.text())
                    .replace("{onlineimg}", "<img src='graphic/dots/green.png' />")
                    .replace("{online#}", friends.online.amount)
                    .replace("{offlineimg}", "<img src='graphic/dots/red.png' />")
                    .replace("{offline#}", friends.offlineAmount)
            );
            if (friends.online.amount > 0) {
                friendsLink.attr("title", trans.sp.rest.friendsOnlineTitle.replace("{playerNames}", friends.online.names.substr(1)));
            }
        } catch (e) { handleException(e, "friends"); }
        //console.timeEnd("friends");
    }());
}



