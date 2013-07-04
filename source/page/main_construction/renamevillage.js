(function() {
    console.time("main-renamevillage");
    try {
        if (user_data.main.villageNames != null && user_data.main.villageNames.length > 0) {
            var showButtons = true;
            $.each(user_data.main.villageNames, function (i, v) { if (game_data.village.name == v) showButtons = false; });

            if (showButtons) {
                var submitButton = $("input[type='submit']:last");
                $.each(user_data.main.villageNames, function (i, v) {
                    // rename village to one of the provided villageNames options
                    var button = $("<input type=button value='" + v + "'>")
                        .click(function () {
                            trackClickEvent("RenameVillage");
                            $("input[name='name']").val(v);
                            if (user_data.main.villageNameClick) {
                                $("input[type='submit']").click();
                            }
                        });
                    var input = submitButton.parent().append(button);
                });
            }
        }
    } catch (e) { handleException(e, "place-"); }
    console.timeEnd("main-renamevillage");
}());
