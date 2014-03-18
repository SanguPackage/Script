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
    var deleteImage = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAABjUlEQVR42mOYGq/1vz9cHo77QmX+"
        + "9wRL/u8KEP3f4Sv4v82L93+Hj8D/Tj/h/63uXP8ZQJKbV/T9P7pz7v9zh5ZgxSA5kJpaO4b/DL0h"
        + "0mCBW+fW/X96fRsYv3uw9/+r27vgfJAcSE29A1ADyAkgU0ASHx7t/79rSvL/+6cWg9kH5+WBaZAc"
        + "SE2jI9N/hu4AMbiGa7s6/y/K0/vf4if6f3Wd+/98R/7/naUR/59c2wpWU2cPtAHkIRAH5IR39/f8"
        + "Pzg75f/0RKX/FQ5s/3212P+f3jUD7ESQmmpboAaQz0GcDw/3g62/uLnx/4w0jf/Zpgz//dUZ/q+d"
        + "WfH/zb3dYDXlNkANjU7MYM7zG9v+3z06/f/KWvv/SSas/6dnW/xPN2H4H+Wg8v/BpY1gNSVWQA0g"
        + "d8H88ObO9v8d8br/t87IB9u2c17J/2fXNsM9XWAB1AAKKuRgfQg0DeQEkBNBtiIHa6ElUEOTMwvR"
        + "EVcM0lAJ9Hkp0G0gD1UAcbk1hF8MxCAT882B2AKCM4EBAQBhdn41NRNSiwAAAABJRU5ErkJggg==";

    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".sanguHide { margin-left: 2px; float: right; cursor: pointer; "
        + "background: url(" + deleteImage + "); width: 12px; height: 12px; }";
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