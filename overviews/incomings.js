(function() {
    //console.time("overview-incomings");
    try {
        overviewTable = $("#incomings_table");
        tableHandler.init("incomings_table", {
            hasBottomTotalRow: true
        });

        // build sangu menu
        var menu = "";
        menu += "<table width='100%' class=vis>";
        menu += "<tr><th width='1%'>";
        menu += "<input type=button id=sortIt value='" + trans.sp.incomings.dynamicGrouping + "'>";
        menu += "</th><th width='1%' nowrap>";
        menu += "<input type=checkbox id=sortShowTotalRow " + (user_data.command.sumRow ? "checked" : "") + "> " + trans.sp.incomings.summation + " ";
        menu += "<input type=button id=sortQuick value='" + trans.sp.incomings.fastGrouping + "'>";
        menu += "</th><th width='97%'>";
        menu += "<input type=button id=filterAttack value='" + trans.sp.incomings.showNewIncomings + "'>";
        menu += "</th><th width='1%' nowrap>";
        menu += "<input type=button id=commandsImport value='" + trans.sp.incomings.commandsImport + "' title='" + trans.sp.incomings.commandsImportTooltip + "'>";
        menu += "</th></tr>";
        menu += "</table>";
        overviewTable.before(menu);

        $("#select_all").replaceWith("<input type='checkbox' id='selectAll'>");
        $("#selectAll").change(function() {
            var isChecked = $("#selectAll").is(":checked");
            $("tr", overviewTable).find(":checkbox").prop("checked", isChecked);
        });

        // total row stuff
        function showAmountOfAttacks(amountOfVillages, amountOfCommands) {
            if ($("#amountOfAttacks").size() == 0) {
                var pageSize = $("input[name='page_size']");
                pageSize.parent().prev().text(trans.sp.commands.totalVillagesAttack);
                pageSize = pageSize.val(amountOfVillages).parent().parent().parent();
                pageSize.append('<tr><th colspan=2 id="amountOfAttacks">' + trans.sp.incomings.amount + '</th><td>' + amountOfCommands + '</td></tr>');
            }
        }

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

        function getVillageRows() {
            return overviewTable.find("tr:gt(0)").not("tr:last");
        }

        // DYNAMIC sort incoming attacks
        $("#sortIt").click(function () {
            this.disabled = true;
            $("#sortQuick").attr("disabled", true);
            trackClickEvent("Sort");

            var rows = getVillageRows();
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

        // QUICK sort: performs faster but also freezes the screen (ie no countdowns)
        // --> This might also be good in case the page is refreshing too often otherwise
        $("#sortQuick").click(function () {
            trackClickEvent("SortQuick");
            this.disabled = true;
            $("#sortIt").attr("disabled", true);

            var newTable = "";
            var targets = [];
            var commandCounter = 0;
            var addTotalRow = $('#sortShowTotalRow').is(':checked');

            getVillageRows().each(function () {
                var target = $("td:eq(1)", this).text();
                var village = getVillageFromCoords(target);
                if (village.isValid) {
                    commandCounter++;
                    if (targets[village.coord] == undefined) {
                        targets.push(village.coord);
                        targets[village.coord] = [];
                    }
                    targets[village.coord].push($(this));
                }
            });

            var mod = 0;
            $.each(targets, function (i, v) {
                mod++;
                var rowColor = "row_" + (mod % 2 == 0 ? 'b' : 'a');
                var amount = 0;
                $.each(targets[v], function (index, row) {
                    var villageId = row.find("td:eq(1) a:first").attr("href").match(/village=(\d+)/)[1];
                    newTable += "<tr class='nowrap " + rowColor + "'"
                        + (villageId == game_data.village.id ? " selected" : "") + "'>"
                        + row.html() + "</tr>";
                    amount++;
                });

                if (addTotalRow) {
                    if (amount === 1) {
                        newTable += "<tr class='" + rowColor + "'><td align=right colspan=7>&nbsp;</td></tr>";
                    } else {
                        newTable += "<tr class='" + rowColor + "'><td align=right colspan=7><b>" + trans.sp.incomings.amount + "&nbsp; " + amount + "</b>&nbsp; &nbsp;</td></tr>";
                    }
                }
            });

            var menu = $("tr:first", overviewTable).html();
            var totalRow = $("tr:last", overviewTable).html();
            overviewTable.html("<table id='incomings_table' class='vis'>" + menu + newTable + totalRow + "</table>");

            showAmountOfAttacks(targets.length, commandCounter);
        });

        $("#filterAttack").click(function () {
            trackClickEvent("FilterNewAttacks");
            var goners = $();
            var remainingVillages = 0;
            getVillageRows().each(function() {
                var self = $(this);
                if ($.trim($("td:first", self).text()) != trans.tw.command.attack) {
                    goners = goners.add(self);
                } else {
                    remainingVillages++;
                }
            });
            goners.remove();

            var amountOfCommandsHeaderCell = $("tr:first", overviewTable).find("th:first");
            assert(amountOfCommandsHeaderCell.length === 1, "couldn't find the command headercell");
            amountOfCommandsHeaderCell.html(amountOfCommandsHeaderCell.html().replace(/\(\d+\)/, "(" + remainingVillages + ")"));
        });
    } catch (e) { handleException(e, "overview-incomings"); }
    //console.timeEnd("overview-incomings");
}());