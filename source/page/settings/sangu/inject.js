(function() {
    // contentPage is the place we will add the settings menu to
    var contentPage = $("#content_value table:first td:last").attr("width", "99%"),
        sanguTitle = "<h3 id='sanguConfigTitle'>" + trans.sp.sp.configuration.replace("{version}", sangu_version) + "</h3>";

    // Reset sangu settings links
    var resetForm = "<a href='#' id='resetSettings'>&raquo; " + trans.sp.sp.settings.reset + "</a>";
    resetForm += "<br>";
    resetForm += "<a href='#' id='resetAllSettings'>&raquo; " + trans.sp.sp.settings.resetAll + "</a>";

    // skeleton injection
    contentPage.html(sanguTitle + "<div id='sanguSettingsForm'>" + resetForm + "<br><br></div>");

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
})();