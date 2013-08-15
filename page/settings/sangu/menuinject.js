(function() {
    var settingsMenu = $("table.vis:first", content_value);
    settingsMenu.append(
        "<tr><td>&nbsp;</td></tr><tr><th><a href='"
            + getUrlString("screen=settings&mode=sangu")
            + "'>Sangu Package</a></th></tr>");

    settingsMenu.append(
        "<tr id='sanguImportRow'><td>"
            + "<a href='#' id='sanguImport'>" + trans.sp.sp.settings.importSettings + "</a>"
            + "</td></tr>"
            + "<tr id='sanguExportRow'><td>"
            + "<a href='#' id='sanguExport'>" + trans.sp.sp.settings.exportSettings + "</a>"
            + "</td></tr>");

    settingsMenu.after(
        "<br>"
            + "<a target='_blank' href='http://"+server_settings.sangu+"'>"
            + "<div style='width: 100%; text-align: center; border: 1px solid black; background-color: yellow; padding: 10px 0 10px;'>"
            + "Sangu Website"
            + "</div>"
            + "</a>");

    /**
     * Creates the textarea (and other UI elements) for displaying the user_data
     * @param activate {string} either Import or Export
     * @param deactivate {string} either Export or Import
     * @param textAreaValue {string} the content to assign to the textarea
     */
    function importExportHandler(activate, deactivate, textAreaValue) {
        var settingsContainer = $("#sanguSettingsTextArea");
        $("#sangu"+activate+"Row").addClass("row_b");
        $("#sangu"+deactivate+"Row").hide();

        $("#sanguSettingsForm").hide();
        if (settingsContainer.length === 0) {
            //sanguConfigTitle is the h3 defined in inject.js
            $("#sanguConfigTitle").parent().append(
                trans.sp.sp.settings.importSettingsDesc + "<br><br>"
                    + "<textarea id='sanguSettingsTextArea' style='width: 100%; height: 500px'>"
                    + textAreaValue
                    + "</textarea>");
        } else {
            if (textAreaValue.length > 0) {
                settingsContainer.val(textAreaValue);
            }
        }
    }

    $("#sanguExport").click(function() {
        importExportHandler("Export", "Import", JSON.stringify(user_data, null, 4));
        $("#sanguSettingsTextArea").select();
        return false;
    });

    $("#sanguImport").click(function() {
        var importSanguSettings = $("#importSanguSettings");
        importExportHandler("Import", "Export", "");

        if (importSanguSettings.length === 0) {
            $("#sanguSettingsTextArea")
                .after("<br><input type='button' id='importSanguSettings' value='" + trans.sp.sp.settings.importSettings + "'>");

            $("#importSanguSettings").click(function() {
                var overwriteCurrentSettings = true,
                    newUserData;

                try {
                    newUserData = JSON.parse($("#sanguSettingsTextArea").val());

                    if (typeof newUserData.proStyle === 'undefined') {
                        overwriteCurrentSettings = confirm(trans.sp.sp.settings.importError + trans.sp.sp.settings.importErrorContinueAnyway);
                    }

                    if (overwriteCurrentSettings) {
                        user_data = $.extend({}, user_data, newUserData);
                        pers.set("sangusettings", JSON.stringify(user_data));
                        alert(trans.sp.sp.settings.importSettingsSuccess);
                    }

                } catch (ex) {
                    alert(trans.sp.sp.settings.importError + "\n" + ex.message);
                }
            });
        }
        $("#sanguSettingsTextArea").focus();

        return false;
    });
})();