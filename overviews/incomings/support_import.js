// IMPORT os exported by other player
$("#commandsImport").click(function() {
    if ($("#textsArea").size() == 0) {
        $(this).parent().parent().parent().append("<tr><td id=textsArea colspan=4></td></tr>");
        $("#textsArea").append(
            "<textarea cols=80 rows=10 id=commandImportText></textarea>"
                + "<br>"
                + "<input type=button value='" + trans.sp.incomings.commandsImport + "' id=commandsImportReal>"
                + "<input type=button value='" + trans.sp.all.close + "' id=closeTextsArea>");

        $("#closeTextsArea").click(function() {
            $("#textsArea").parent().remove();
        });

        $("#commandsImportReal").click(function() {
            try {
                var commandsToImport = JSON.parse($("#commandImportText").val()),
                    test = commandsToImport[0].commandName,
                    amountReplaced = 0,
                    commandsSent = [],
                    i;

                for (i = 0; i < commandsToImport.length; i++) {
                    commandsSent[commandsToImport[i].commandId] = commandsToImport[i].commandName;
                }

                overviewTable.find("tr:gt(0)").not("tr:last").each(function () {
                    var firstCell = $("td:first", this),
                        commandId = firstCell.find(":checkbox").attr("name");

                    assert(commandId.indexOf("id_") === 0, "inputfields have been renamed");
                    commandId = parseInt(commandId.substr(3), 10);
                    if (typeof commandsSent[commandId] !== 'undefined') {
                        var inputField = $(':input[id^="editInput"]', firstCell);
                        assert(inputField.length === 1, "couldn't find the inputfield");
                        inputField.val(commandsSent[commandId]);
                        inputField.next().click();

                        amountReplaced++;
                    }
                });

                alert(trans.sp.incomings.commandsImportSuccess
                    .replace("{replaced}", amountReplaced)
                    .replace("{total}", commandsToImport.length));
            }
            catch (e) {
                alert(trans.sp.incomings.commandsImportError);
            }
        });
    }
});