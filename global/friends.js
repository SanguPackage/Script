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

            /**
             * Insert a 'friends' link with visual online/offline indication
             */
            function updateTWFriendsLink() {
                var friendsLink = $("<a href='" + getUrlString("&screen=buddies") + "'></a>");
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
                $("#linkContainer").append(" - ");
                $("#linkContainer").append(friendsLink);
            }

            /**
             * Parse the #content_value and update the friends link.
             * Is called from ajax call.
             * @param {string} overview the #content_value of the friends page
             */
            function parseFriendsTable(overview) {
                var friendsTable = $("h3+table.vis:first", overview);
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

                    // localStorage save of online friends
                    pers.set("friendsOnline", JSON.stringify(friends));

                    updateTWFriendsLink();
                }
            }

            var friends = pers.get("friendsOnline");

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
                    ajax("buddies", parseFriendsTable);
                } else {
                    updateTWFriendsLink();
                }
            }
        } catch (e) { handleException(e, "friends"); }
        //console.timeEnd("friends");
    }());
}



