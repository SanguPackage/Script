(function() {
    // contentPage is the place we will add the settings menu to
    var contentPage = $("#content_value table:first td:last").attr("width", "99%"),
        sanguTitle = "<h3 id='sanguConfigTitle'>" + trans.sp.sp.configuration.replace("{version}", sangu_version) + "</h3>";

    function gimmeTheMoney() {
        function createButton(paypalCode, euroAmount, tooltip) {
            return '<div align="center">'
                + '<form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_blank">'
                + '<input type="hidden" name="cmd" value="_s-xclick">'
                + '<input type="hidden" name="hosted_button_id" value="' + paypalCode + '">'
                + '<input type="image" src="https://www.paypalobjects.com/nl_NL/BE/i/btn/btn_donate_SM.gif" border="0" name="submit" title="'+tooltip+'">'
                + '<img alt="" border="0" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1">'
                + '<br>' + trans.sp.sp.donate.buttonAmount.replace("{amount}", euroAmount)
                + '</form></div>';
        }

        var html = "<h3>"+trans.sp.sp.donate.title+"</h3>";
        html += trans.sp.sp.donate.whyWouldI;
        html += "<br>" + trans.sp.sp.donate.books
            .replace("{abegin}", "<a target='_blank' href='http://www.amazon.com/wishlist/1RFQ21NSF4PAI/ref=cm_wl_prev_ret?_encoding=UTF8&reveal='>")
            .replace("{aend}", "</a>");

        html += "<br><br>"
            + "<table width='100%'><tr>"
            + "<td>" + createButton("FA9MAMFAYKANL", 5, trans.sp.sp.donate.beer) + "</td>"
            + "<td>" + createButton("R9RX6XBCV6T4G", 10, trans.sp.sp.donate.food) + "</td>"
            + "<td>" + createButton("ELG8Y2GLSXAVA", 20, trans.sp.sp.donate.yaye) + "</td>"
            + "</tr>"
            + "</table>";

        return html;
    }

    // Reset sangu settings links
    var resetForm = "<a href='#' id='resetSettings'>&raquo; " + trans.sp.sp.settings.reset + "</a>";
    resetForm += "<br>";
    resetForm += "<a href='#' id='resetAllSettings'>&raquo; " + trans.sp.sp.settings.resetAll + "</a>";

    // skeleton injection
    contentPage.html(sanguTitle + "<div id='sanguSettingsForm'>" + resetForm + gimmeTheMoney() + "<br><br></div>");

    gimmeTheMoney();
    $("#sanguSettingsForm").append("<br><br>");

    $("#resetSettings").click(function() {
        if (confirm(trans.sp.sp.settings.reset)) {
            pers.set('sangusettings', '');
            location.reload(false);
        }
        return false;
    });

    $("#resetAllSettings").click(function() {
        if (confirm(trans.sp.sp.settings.resetAll)) {
            pers.clear();
            location.reload(false);
        }
        return false;
    });

    (function() {
        var sanguSettingsForm,
            configIterator;

        // build the property handler editting form
        sanguSettingsForm = $("#sanguSettingsForm");
        for (configIterator = 0; configIterator < user_data_configs.length; configIterator++) {
            buildConfigForm(sanguSettingsForm, user_data_configs[configIterator]);
            sanguSettingsForm.append("<br>");
        }
    })();

    // notable contributors
    (function() {
        var notableHtml = "<u>" + trans.sp.sp.donate.notable + "</u>";
        notableHtml += "<br><br><b>sakeb</b>: Nogmaals bedankt voor 'JavaScript: The Good Parts'! :)";
        notableHtml += "<br><b>Daniel Ivanov</b>";
        notableHtml += "<br><br>";

        $("#sanguSettingsForm").append(notableHtml);
    })();
})();