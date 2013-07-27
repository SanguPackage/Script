(function() {
    //console.time("overview-incomings");
    try {
        overviewTable = $("#incomings_table");
        tableHandler.init("incomings_table", {
            hasBottomTotalRow: true
        });

        // Group attacks per village
        var menu = "";
        menu += "<table width='100%' class=vis>";
        menu += "<tr><th width='1%'>";
        menu += "<input type=button id=sortIt value='" + trans.sp.incomings.dynamicGrouping + "'>";
        menu += "</th><th width='1%' nowrap>";
        menu += "&nbsp;&nbsp; <input type=checkbox id=sortShowTotalRow " + (user_data.command.sumRow ? "checked" : "") + "> " + trans.sp.incomings.summation + " ";
        menu += "<input type=button id=sortQuick value='" + trans.sp.incomings.fastGrouping + "'>";
        menu += "</th><th width='97%'>";
        menu += "<input type=button id=filterAttack value='" + trans.sp.incomings.showNewIncomings + "'>";
        menu += "</th><th width='1%' nowrap>";
        menu += "<input type=button id=commandsImport value='" + trans.sp.incomings.commandsImport + "' title='" + trans.sp.incomings.commandsImportTooltip + "'>";
        menu += "</th></tr>";
        menu += "</table>";
        $("#incomings_table").before(menu);

        $("#select_all").replaceWith("<input type='checkbox' id='selectAll'>");
        $("#selectAll").click(function() {
            var isChecked = $("#selectAll").is(":checked");
            $("#incomings_table tr:visible").find(":checkbox").attr("checked", isChecked);
        });

        // Amount of attacks
        function showAmountOfAttacks(amountOfVillages, amountOfCommands) {
            if ($("#amountOfAttacks").size() == 0) {
                var pageSize = $("input[name='page_size']");
                pageSize.parent().prev().text(trans.sp.commands.totalVillagesAttack);
                pageSize = pageSize.val(amountOfVillages).parent().parent().parent();
                pageSize.append('<tr><th colspan=2 id="amountOfAttacks">' + trans.sp.incomings.amount + '</th><td>' + amountOfCommands + '</td></tr>');
            }

            $("#incomings_table tr").not(":visible").find(":checkbox").attr("checked", false);
        }

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

                        $("#incomings_table").find("tr:gt(0)").not("tr:last").each(function () {
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

        // Sort incoming attacks
        $("#sortIt").click(function () {
            this.disabled = true;
            $("#sortQuick").attr("disabled", true);
            trackClickEvent("Sort");

            var rows = $("#incomings_table").find("tr:gt(0):visible").not("tr:last");
            rows.sortElements(function (a, b) {
                a = getVillageFromCoords($("td:eq(1)", a).text());
                b = getVillageFromCoords($("td:eq(1)", b).text());

                return (a.x * 1000 + a.y) > (b.x * 1000 + b.y) ? 1 : -1;
            });

            var amountOfVillages = 0;
            var current = "";
            rows.each(function () {
                var village = $("td:eq(1)", this);
                if (current != village.text()) {
                    current = village.text();
                    amountOfVillages++;
                }
                var type = amountOfVillages % 2 == 0 ? 'row_a' : 'row_b';

                var villageId = village.find("a:first").attr("href").match(/village=(\d+)/)[1];
                this.className = type + (villageId == game_data.village.id ? " selected" : "");
            });

            showAmountOfAttacks(amountOfVillages, rows.size());
        });

        // Quick sort: performs faster but also freezes the screen (ie no countdowns)
        // --> This might also be good in case the page is refreshing too often otherwise
        $("#sortQuick").click(function () {
            trackClickEvent("SortQuick");
            this.disabled = true;
            $("#sortIt").attr("disabled", true);

            var newTable = "";
            var targets = [];
            var commandCounter = 0;
            var addTotalRow = $('#sortShowTotalRow').is(':checked');

            $("#incomings_table").find("tr:gt(0)").each(function () {
                var target = $("td:eq(1)", this).text();
                var village = getVillageFromCoords(target);
                if (village.isValid) {
                    commandCounter++;
                    if (targets[village.coord] == undefined) {
                        targets.push(village.coord);
                        targets[village.coord] = new Array();
                    }
                    targets[village.coord].push($(this));
                }
            });

            var mod = 0;
            $.each(targets, function (i, v) {
                mod++;
                var amount = 0;
                $.each(targets[v], function (index, row) {
                    var villageId = row.find("td:eq(1) a:first").attr("href").match(/village=(\d+)/)[1];
                    newTable += "<tr class='nowrap row_" + (mod % 2 == 0 ? 'b' : 'a')
                        + (villageId == game_data.village.id ? " selected" : "") + "'>"
                        + row.html() + "</tr>";
                    amount++;
                });

                if (addTotalRow) {
                    newTable += "<tr><td align=right colspan=6>" + amount + "&nbsp;</td></tr>";
                }
            });

            var menu = $("#incomings_table tr").first().html();
            $("#incomings_table").html("<table id='incomings_table' class='vis'>" + menu + newTable + "</table>");

            showAmountOfAttacks(targets.length, commandCounter);
        });

        $("#filterAttack").click(function () {
            trackClickEvent("FilterNewAttacks");
            var goners = $();
            $("#incomings_table tr:gt(0)").not("tr:last").each(function() {
                if ($.trim($("td:first", this).text()) != trans.tw.command.attack) {
                    goners = goners.add($(this));
                    $(":checkbox", this).attr("checked", false);
                }
            });
            goners.remove();
        });
    } catch (e) { handleException(e, "overview-incomings"); }
    //console.timeEnd("overview-incomings");
}());