if (user_data.overview.canHideDiv) {
    //console.time("main_overview_deletebuttons");

    /**
     * Array with domIds of the hideable divs
     * @type {Array}
     */
    var currentlyHidden = pers.get("mainvillage_hiddendivs");
    currentlyHidden = currentlyHidden ? JSON.parse(currentlyHidden) : [];

    // add the X images
    $("#leftcolumn,#rightcolumn").find("div.moveable").each(function() {
        var self = $(this),
            domId = this.id;

        if (!self.hasClass("hidden_widget")) {
            if (currentlyHidden.indexOf(domId) !== -1) {
                self.hide();
            } else {
                var header = self.find("h4:first");
                header.prepend(
                    '<span class="sanguHide" '
                        + " title='" + trans.sp.main.hideDiv + "'"
                        + ' data-divid="' + domId + '"></span>');
            }
        }
    });

    // X image event
    $(".sanguHide", content_value).click(function() {
        var toHideId = $(this).attr("data-divid");
        currentlyHidden.push(toHideId);
        $("#" + toHideId).hide();
        q(currentlyHidden);

        pers.set("mainvillage_hiddendivs", JSON.stringify(currentlyHidden));
    });

    // css for X image
    var deleteImage = "data:image/png;base64,"
        + "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAAAXNSR0IArs4c6QAAAARnQU1BAACx"
        + "jwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAadEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41"
        + "LjExR/NCNwAAAT5JREFUOE9jmBqv1R8uD0F9oTI9wZJdAaLI7A5fwTYv3g4fgU4/4VZ3Lgag6OYV"
        + "fUd3zj13aAkeBFQAVFZrx8DQGyIN5Nw6t+7p9W14EFABUFm9AwMD0GqgAUChDw/340FABUBljY5M"
        + "DN0BYsRrADkJ6Bs0DZe2NL68sfHN3R1XtrfCBSEaKm0YGIAeR9awoj22M1p5z+SIHX0hczI0t/fF"
        + "oGtodGJG1vD8+ubqYPXOEMnJMTI9EYqPz69E1oDFDw/PreyPUkw1YiiwYV9Z5fDq1lZkDVj8sKgh"
        + "NFiTIcdHPd5RIc2Se/eUZGQNWPwARH1VMU+vbb51akV7UQhcEKEBzQ+4EERDqRUDA9BZxGsotGBg"
        + "AMY28UkDpKHJmYX4xAfSAPQH0GXlNlAGEBVbMQAlkNn55gz5QNKCIdOUAQAxTOqhn6cegQAAAABJ"
        + "RU5ErkJggg==";

    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".sanguHide { margin-left: 2px; float: right; cursor: pointer; "
        + "background: url(" + deleteImage + "); width: 16px; height: 16px; }";
    document.body.appendChild(css);

    // show everything link
    content_value.append(
        "<br><a href='#' id='resetSanguMenu'>"
            + trans.sp.main.showHiddenDivs.replace("{amount}", currentlyHidden.length)
            + "</a>"
    );

    $("#resetSanguMenu").click(function() {
        pers.set("mainvillage_hiddendivs", "");
        location.reload();
    });



    //console.timeEnd("main_overview_deletebuttons");
}