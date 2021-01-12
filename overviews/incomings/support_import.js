// IMPORT os exported by other player
$("#commandsImport").click(function() {
    if ($("#textsArea").length == 0) {
        $(this).parent().parent().parent().append("<tr><td id=textsArea colspan=5></td></tr>");
        $("#textsArea").append(
            "<textarea cols=80 rows=10 id=commandImportText></textarea>"
                + "<br>"
                + "<input type=button value='" + trans.sp.incomings.commandsImport + "' id=commandsImportReal>"
                + "<input type=button value='" + trans.sp.all.close + "' id=closeTextsArea>");

        $("#closeTextsArea").click(function() {
            $("#textsArea").parent().remove();
        });

        $("#commandsImportReal").click(function() {
            var commandsToImport;
            try {
                commandsToImport = JSON.parse($("#commandImportText").val());
                var test = commandsToImport[0].commandName;
            }
            catch (e) {
                alert(trans.sp.incomings.commandsImportError);
            }

            var amountReplaced = 0,
                commandsSent = [],
                i;

            for (i = 0; i < commandsToImport.length; i++) {
                commandsSent[commandsToImport[i].commandId] = commandsToImport[i].commandName;
            }

            table.getVillageRows().each(function () {
                var firstCell = $("td:first", this),
                    commandId = firstCell.find(":input:first").attr("name");

                //q("inputfield: " + firstCell.find(":input:first").length);
                //q("commandId = " + commandId + " in cell: " + firstCell.text());

                //assert(commandId, "couldn't find command id inputfield");
                //assert(commandId.indexOf("command_ids") === 0, "inputfields have been renamed");
                commandId = parseInt(commandId.match(/\d+/)[0], 10);
                if (typeof commandsSent[commandId] !== 'undefined') {
                    var inputField = $(':input[id^="editInput"]', firstCell);
                    //assert(inputField.length === 1, "couldn't find the inputfield");
                    inputField.val(commandsSent[commandId]);
                    inputField.next().click();

                    amountReplaced++;
                }
            });

            alert(trans.sp.incomings.commandsImportSuccess
                .replace("{replaced}", amountReplaced)
                .replace("{total}", commandsToImport.length));
        });
    }
});
