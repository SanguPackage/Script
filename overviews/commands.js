(function() {
    //console.time("overview-commands");
    try {
        overviewTable = $("#commands_table");
        tableHandler.init("commands_table", {
            hasBottomTotalRow: true
        });

        var commandListType = getQueryStringParam("type");

        var menu = "";
        menu += "<table class=vis width='100%'>";
        menu += "<tr>";
        if (location.href.indexOf('type=all') > -1 || location.href.indexOf('&type=') == -1) {
            menu += "<th width='1%'>";
            menu += "<input type=button id=filterReturning value='" + trans.sp.commands.filterReturn + "' title=\"" + trans.sp.commands.filterReturnTooltip + "\">";
            menu += "</th>";
        }

        menu += "<th width='1%' nowrap>";
        menu += "<input type=checkbox id=sortSum " + (user_data.command.sumRow ? "checked" : "") + "> " + trans.sp.commands.totalRows + " ";
        var isSupport = location.href.indexOf('type=support') > -1;
        menu += "<input type=button id=sortIt value='" + trans.sp.commands.group + "'>";

        menu += "</th><th width='98%'>";

        menu += "<input type=button id=BBCodeOutput value='" + trans.sp.commands.bbCodeExport + "' title='" + trans.sp.commands.bbCodeExportTooltip + "'>";

        if (commandListType !== "attack" && commandListType !== "return") {
            menu += "&nbsp; &nbsp;";
            menu += "<input type=text id=supportPlayerName size=>&nbsp;";
            menu += "<input type=button id=supportPlayerExport value='" + trans.sp.commands.supportPlayerExport + "' title='" + trans.sp.commands.supportPlayerExportTooltip + "'>";
        }

        menu += "</th></tr></table>";

        // second row
        menu += "<table><tr><th width='1%' nowrap>";
        menu += "<input type=checkbox id=defReverseFilter title='" + trans.sp.commands.filtersReverse + "'> " + trans.sp.commands.filtersReverseInfo + ": ";

        menu += "</th><th width='1%' nowrap>";
        menu += "<span style='background-color: #ecd19a; border: 1px solid black' id='unitFilterBox'>";
        menu += "&nbsp; <img src='graphic/unit/unit_snob.png' id=filtersnob>&nbsp; <img src='graphic/unit/unit_spy.png' id=filterspy>&nbsp; <img src='graphic/face.png' id=filterFake>&nbsp;";
        menu += "&nbsp; </span>";

        menu += "</th><th width='1%' nowrap>";
        menu += "<input type=text size=12 id=defFilterTextValue value=''>";
        menu += "<input type=button id=defFilterText value='" + trans.sp.commands.freeTextFilter + "'>";

        menu += "</th><th width='97%' nowrap>";
        menu += "<input type=textbox size=3 id=defFilterContinentText maxlength=2><input type=button id=defFilterContinent value='" + trans.sp.commands.continentFilter + "'>";

        menu += "</th></tr>";
        menu += "</table>";
        $("#commands_table").before(menu);

        $("#select_all").replaceWith("<input type='checkbox' id='selectAll'>");
        var selectAllCheckboxes = function() {
            var isChecked = $("#selectAll").is(":checked");
            $("#commands_table tr:visible").find(":checkbox").prop("checked", isChecked);
        };
        $("#selectAll").change(selectAllCheckboxes);

        var offsetToUnits = 3;

        $("#defReverseFilter").change( function () {
            var isChecked = $(this).is(":checked");
            var defTrans = trans.sp.commands;
            $("#unitFilterBox").find("img:eq(0)").attr("title", !isChecked ? defTrans.nobleFilter : defTrans.nobleFilterRev);
            $("#unitFilterBox").find("img:eq(1)").attr("title", isChecked ? defTrans.spyFilter : defTrans.spyFilterRev);
            $("#unitFilterBox").find("img:eq(2)").attr("title", !isChecked ? defTrans.fakeFilter : defTrans.fakeFilterRev);

            $("#defFilterContinent").attr("title", isChecked ? defTrans.continentFilterTooltip : defTrans.continentFilterTooltipReverse);

            $("#defFilterText").attr("title", defTrans.freeTextFilterTooltip.replace("{filterType}", isChecked ? defTrans.freeTextFilterTooltipFilterTypeWith : defTrans.freeTextFilterTooltipFilterTypeWithout));
        });

        $("#defReverseFilter").change();
        var hasGrouped = false;

        // generate bb code or JSON (for player os) export
        $("#BBCodeOutput,#supportPlayerExport").click(function () {
            trackClickEvent($(this).attr("id"));
            var villages = [];
            var request = {};
            var filter = hasGrouped ? "tr.command" : "tr:gt(0)";
            $("#commands_table " + filter).filter(":visible").each(function () {
                var row = $(this);
                var cells = $("td", row);
                var firstCell = cells.first();
                var commandType = firstCell.find("img:first").attr("src");

                if (typeof commandType !== 'undefined'
                    && commandType.indexOf("command/cancel.png") == -1
                    && commandType.indexOf("command/other_back.png") == -1
                    && commandType.indexOf("command/back.png") == -1
                    && commandType.indexOf("command/return.png") == -1) {

                    // We get the village coords from the description of the command
                    // Meaning if the user changes the name to "blabla" that we can't parse it
                    var village = getVillageFromCoords($.trim(firstCell.text()));
                    //assert(village.isValid, $.trim(firstCell.text()) + " could not be converted to village");
                    if (village.isValid) {
                        if (request[village.coord] == undefined) {
                            request[village.coord] = { village: village.coord, attacks: [], hasSupport: false };
                            villages.push(village.coord);
                        }

                        var unitsSent = {};
                        $.each(world_data.units,
                            function (i, val) {
                                unitsSent[val] = parseInt(cells.eq(offsetToUnits + i).text(), 10);
                            });

                        var isSupport = false;
                        if (commandListType == "support") {
                            isSupport = true;
                        }
                        else if (commandListType == "attack") {
                            isSupport = false;
                        } else {
                            isSupport = cells.first().has("img[src*='command/support.png']").length == 1;
                        }

                        request[village.coord].hasSupport = isSupport;
                        request[village.coord].attacks.push({
                            isSupport: isSupport,
                            units: unitsSent,
                            unitsString: buildAttackString(null, unitsSent, null, isSupport, user_data.command.bbCodeExport.requiredTroopAmount),
                            commandName: isSupport ? $.trim(firstCell.text()) : "",
                            commandId: isSupport ? firstCell.find(":checkbox").attr("value") : null,
                            arrivalDate: getDateFromTodayTomorrowTW(cells.eq(2).text())
                        });
                    }
                }
            });

            var exportWidgets = [];
            if ($(this).attr("id") === "BBCodeOutput") {
                var requestsPer500 = [""];
                var requestComposed = "";
                for (var i = 0; i < villages.length; i++) {
                    var currentVillage = request[villages[i]];
                    var currentText = "";
                    currentText += "[spoiler][code]";
                    var attackCount = 0;
                    var supportCount = 0;
                    var lastAttack = null;
                    var largestAttack = 0;
                    var totalPop = 0;
                    for (var attackId = 0; attackId < currentVillage.attacks.length; attackId++) {
                        var currentAttack = currentVillage.attacks[attackId];
                        if (currentAttack.isSupport) {
                            supportCount++;
                            $.each(world_data.units, function (i, val) {
                                totalPop += currentAttack.units[val] * world_data.unitsPositionSize[i];
                            });
                        } else {
                            attackCount++;
                            if (lastAttack == null || lastAttack < currentAttack.arrivalDate) {
                                lastAttack = currentAttack.arrivalDate;
                            }
                        }
                        if (largestAttack < currentAttack.unitsString.length) {
                            largestAttack = currentAttack.unitsString.length;
                        }
                    }

                    for (var attackId = 0; attackId < currentVillage.attacks.length; attackId++) {
                        var currentAttack = currentVillage.attacks[attackId];
                        currentText += currentAttack.unitsString;
                        var extraTabs = (largestAttack - currentAttack.unitsString.length) / 1;
                        if (Math.ceil(extraTabs) == extraTabs) {
                            extraTabs = Math.ceil(extraTabs);
                        }
                        for (var tabs = 0; tabs < extraTabs + 1; tabs++) {
                            currentText += " ";
                        }

                        currentText += "\t" + twDateFormat(currentAttack.arrivalDate, true) + "\n";
                    }
                    currentText += "[/code][/spoiler]\n";

                    var headerTemplate;
                    if (!currentVillage.hasSupport && attackCount !== 0) {
                        headerTemplate = trans.sp.commands.exportAttackHeader;
                    }
                    else if (currentVillage.hasSupport && attackCount === 0) {
                        headerTemplate = trans.sp.commands.exportDefenseHeader;
                    } else {
                        headerTemplate = trans.sp.commands.exportCompleteHeader;
                    }

                    requestComposed +=
                        headerTemplate
                            .replace("{#}", attackCount)
                            .replace("{support#}", supportCount)
                            .replace("{totalStack}", formatNumber(totalPop))
                            .replace("{lastAttack}", lastAttack !== null ? twDateFormat(lastAttack, true) : "")
                            .replace("{village}", "[village]" + villages[i] + "[/village]")
                            + "\n " + currentText;

                    // splits per 500 [ characters (limit in TW)
                    var amountBracket = requestsPer500[requestsPer500.length - 1].match(/\[/g);
                    if (amountBracket != null && (requestComposed.match(/\[/g).length + amountBracket.length > server_settings.allowedSquareBrackets)) {
                        requestsPer500.push("");
                    }
                    requestsPer500[requestsPer500.length - 1] += requestComposed;
                    requestComposed = "";
                }

                for (i = 0; i < requestsPer500.length; i++) {
                    exportWidgets.push("<textarea cols=80 rows=10 class=restackArea>" + requestsPer500[i] + "</textarea>");
                }

            } else {
                // JSON export for player support
                var exportAttacks = [],
                    playerName = $.trim($("#supportPlayerName").val()),
                    filter = playerName.length === 0
                        ? function(attackString) { return true; }
                        : function(attackString) { return attackString.indexOf(playerName) !== -1 };

                for (var i = 0; i < villages.length; i++) {
                    var currentVillage = request[villages[i]];

                    if (currentVillage.hasSupport) {
                        for (var attackId = 0; attackId < currentVillage.attacks.length; attackId++) {
                            var currentAttack = currentVillage.attacks[attackId];
                            if (currentAttack.isSupport && filter(currentAttack.commandName)) {
                                exportAttacks.push({
                                    commandName: currentAttack.commandName,
                                    commandId: currentAttack.commandId
                                });
                                /*q(villages[i]);
                                q(currentVillage)
                                q(currentAttack);
                                q("---------------------");*/
                            }
                        }
                    }
                }

                if (exportAttacks.length > 0) {
                    exportWidgets.push("<textarea style='width: 96%' rows=10 class=restackArea>" + JSON.stringify(exportAttacks, null, 4) + "</textarea>");
                } else {
                    alert(trans.sp.commands.exportNone);
                }
            }

            if (exportWidgets.length > 0) {
                if ($("#textsArea").length == 0) {
                    $(this).parent().parent().parent().append("<tr><td id=textsArea colspan=3></td></tr>");
                } else {
                    $("#textsArea").html("");
                }
                for (var i = 0; i < exportWidgets.length; i++) {
                    $("#textsArea").append(exportWidgets[i]);
                }
                $("#textsArea").append("<br><input type=button value='" + trans.sp.all.close + "' id=closeTextsArea>");
                $("#closeTextsArea").click(function() {
                    $("#textsArea").parent().remove();
                });
            }
        });

        function filterCommandRows(filterStrategy) {
            // return true to hidethe row; false keep row visible (without reverse filter checkbox)
            var reverseFilter = $("#defReverseFilter").is(":checked");
            var goners = $();
            var filter = hasGrouped ? "tr.command" : "tr:gt(0)";
            $("#commands_table " + filter).filter(":visible").each(function () {
                if ($("th", this).length != 0) {
                    // don't do anything anymore when on the total row
                    return;
                }
                if (!reverseFilter != !filterStrategy($(this))) {
                    goners = goners.add($(this));
                    $("input:eq(1)", this).val("");
                }
            });
            goners.remove();

            // Show totals
            var amountOfCommandos = $("#commands_table " + filter).length;
            if (hasGrouped) {
                $("#commands_table tr.sumLine").hide();
            } else {
                amountOfCommandos--;
            }

            $("#commands_table th:first").text(trans.sp.commands.tableTotal.replace("{0}", amountOfCommandos));
            $("#amountOfAttacks").text(amountOfCommandos);
            if ($("#amountOfAttacks").length == 1) {
                $("#amountOfTargets").val("???");
            }

            $("#commands_table tr").not(":visible").find(":checkbox").prop("checked", false);
        }

        // Filter sent back, returning and cancelled commands
        $("#filterReturning").click(function () {
            $(this).attr("disabled", "disabled");
            trackClickEvent("FilterReturning");
            filterCommandRows( function (row) {
                var firstCellImage = $("td:first img:first", row).attr("src");
                return firstCellImage.indexOf("command/other_back.png") != -1
                    || firstCellImage.indexOf("command/back.png") != -1
                    || firstCellImage.indexOf("command/return.png") != -1
                    || firstCellImage.indexOf("command/cancel.png") != -1;
            });
        });

        $("#defFilterText").click(function () {
            trackClickEvent("FilterText");
            var compareTo = $("#defFilterTextValue").val().toLowerCase();
            if (compareTo.length > 0) {
                filterCommandRows(function (row) {
                    return row.text().toLowerCase().indexOf(compareTo) == -1;
                });
            }
        });

        $("#filterspy").click(function () {
            trackClickEvent("FilterSpy");
            var position = $.inArray($(this).attr("id").substr(6), world_data.units);
            filterCommandRows(function (row) {
                if (row.find("td").eq(position + offsetToUnits).text() == "0") {
                    return false;
                }
                var totalScout = row.find("td").eq(position + offsetToUnits).text();

                var cell = row.find("td:eq(" + (offsetToUnits - 1) + ")");
                for (var i = 0; i < world_data.units.length; i++) {
                    cell = cell.next();
                    if (totalScout < cell.text()) {
                        return false;
                    }
                }
                return true;
            });
        });

        $("#filtersnob").click(function () {
            trackClickEvent("FilterSnob");
            var position = $.inArray($(this).attr("id").substr(6), world_data.units) + offsetToUnits;
            filterCommandRows(function (row) {
                return row.find("td").eq(position).text() == "0";
            });
        });

        $("#filterFake").click(function () {
            trackClickEvent("FilterFake");
            var maxPop = user_data.command.filterFakeMaxPop;
            filterCommandRows(function (row) {
                var total = 0;
                var cell = row.find("td:eq(" + (offsetToUnits - 1) + ")");
                for (var i = 0; i < world_data.units.length; i++) {
                    cell = cell.next();
                    total += parseInt(cell.text(), 10);

                    // An attack with a noble is (almost) never a fake:
                    if (i == world_data.units.length - 1 && cell.text() != "0") {
                        return false;
                    }

                    if (total > maxPop) {
                        return false;
                    }
                }
                return true;
            });
        });

        $("#defFilterContinent").click(function () {
            trackClickEvent("FilterContinent");
            var continent = parseInt($("#defFilterContinentText").val(), 10);
            if (!isNaN(continent)) {
                filterCommandRows(function (row) {
                    var village = getVillageFromCoords(row.find("td:first").text());
                    var village2 = getVillageFromCoords(row.find("td:eq(1)").text());
                    if (!village.isValid || !village2.isValid) {
                        return true;
                    }
                    return village.continent() != continent && village2.continent() != continent;
                });
            }
        });

        // Sort/group incoming attacks
        $("#sortIt").click(function () {
            trackClickEvent("Sort");
            hasGrouped = true;
            var newTable = "";
            var targets = [];
            var amountOfCommandos = 0;
            var sum = $('#sortSum').is(':checked');
            $("#filterReturning").attr("disabled", true);

            $("#commands_table").find("tr:gt(0)").filter(":visible").each(function () {
                var target = $.trim($(".quickedit-label", this).text());
                var village = getVillageFromCoords(target);
                if (village.isValid) {
                    amountOfCommandos++;
                    if (targets[village.coord] == undefined) {
                        targets.push(village.coord);
                        targets[village.coord] = new Array();
                    }
                    targets[village.coord].push($(this));
                }
            });

            var mod = 0;
            if (isSupport) {
                $.each(targets, function (i, v) {
                    mod++;
                    var amount = 0;
                    var totalDef = new Array();
                    totalDef['pop'] = 0;
                    $.each(world_data.units, function (index, value) { totalDef[value] = 0; });

                    $.each(targets[v], function (index, value) {
                        var villageId = $("td:eq(1) a:first", value).attr("href").match(/id=(\d+)/)[1];
                        newTable += "<tr class='command nowrap row_" + (mod % 2 == 0 ? 'b' : 'a') + (villageId == game_data.village.id ? " selected" : "") + "'>" + value.html() + "</tr>";
                        amount++;

                        var unitAmounts = $("td:gt(2)", value);
                        $.each(world_data.units, function (iUnit, vUnit) {
                            var amount = parseInt(unitAmounts.eq(iUnit).html(), 10);
                            if (amount == 1) {
                                totalDef[vUnit] = amount;
                            } else {
                                totalDef[vUnit] += amount;
                            }
                            totalDef['pop'] += amount * world_data.unitsSize['unit_' + vUnit];
                        });
                    });

                    if (sum) {
                        newTable += "<tr class='sumLine'><td align=right colspan=3><b>" + trans.sp.commands.totalRowsText.replace("{0}", amount).replace("{1}", formatNumber(totalDef['pop'])) + "&nbsp;</b></td>";
                        $.each(world_data.units, function (iUnit, vUnit) {
                            newTable += "<td>" + (totalDef[vUnit] == 0 ? "&nbsp;" : formatNumber(totalDef[vUnit])) + "</td>";
                        });
                        newTable += "</tr>";
                    }
                });
            } else {
                // attacks (meaning: no support commands)
                $.each(targets, function (i, v) {
                    mod++;
                    var amount = 0;
                    var lastArrival = '';
                    $.each(targets[v], function (index, value) {
                        var villageId = $("td:eq(1) a:first", value).attr("href").match(/id=(\d+)/)[1];

                        var currentArrival = $(value).find("td:eq(2)").text();
                        if (lastArrival == currentArrival) {
                            // Don't show when it's on the same second
                            // Only practical on full second worlds really
                            newTable += "<tr class='command nowrap row_" + (mod % 2 == 0 ? 'b' : 'a') + (villageId == game_data.village.id ? " selected" : "") + "'>";
                            $(this).find("td").each(function (i) {
                                if (i == 2) {
                                    newTable += "<td>&nbsp;</td>";
                                }
                                else if ($(this).text() == 0) {
                                    newTable += "<td class=hidden>0</td>";
                                } else {
                                    newTable += "<td>" + $(this).html() + "</td>";
                                }
                            });
                            newTable += "</tr>";
                        }
                        else {
                            newTable += "<tr class='command nowrap row_" + (mod % 2 == 0 ? 'b' : 'a') + (villageId == game_data.village.id ? " selected" : "") + "'>" + value.html() + "</tr>";
                        }
                        lastArrival = currentArrival;
                        amount++;
                    });

                    if (sum) {
                        newTable += "<tr class='sumLine'><td align=right colspan=" + (3 + world_data.units.length) + ">" + amount + "&nbsp;</td></tr>";
                    }
                });
            }

            var menu = $("#commands_table tr").first().html(),
                totalRow = $("#commands_table tr:last");
            $("#commands_table").html("<table id='commands_table' class='vis'>" + menu + newTable + totalRow.outerHTML() + "</table>");
            $("#selectAll").change(selectAllCheckboxes);

            // total number of attacks
            if ($("#amountOfAttacks").length == 0) {
                var totalDesc = (isSupport ? trans.sp.commands.totalSupport : trans.sp.commands.totalAttack);
                var totalVillagesDesc = isSupport ? trans.sp.commands.totalVillagesSupport : trans.sp.commands.totalVillagesAttack;
                var pageSize = $("input[name='page_size']");
                if (pageSize.length == 0) {
                    pageSize = $("input[type='submit']:last");
                    pageSize.after("<table class=vis><tr class='row_a'><th>" + totalVillagesDesc + "</th><td><input type=text size=5 value=" + targets.length + " id=amountOfTargets></td></tr><tr class='row_a'><th>" + totalDesc + ":</th><td id='amountOfAttacks'>" + amountOfCommandos + "</td></tr></table>");
                } else {
                    pageSize[0].id = "amountOfTargets";
                    pageSize.parent().prev().text(totalVillagesDesc);
                    pageSize = pageSize.val(targets.length).parent().parent().parent();
                    pageSize.append('<tr><th colspan=2>' + totalDesc + ':</th><td id="amountOfAttacks">' + amountOfCommandos + '</td></tr>');
                }
            } else {
                $("#amountOfTargets").val(targets.length);
                $("#amountOfAttacks").text(amountOfCommandos);
            }
        });
    } catch (e) { handleException(e, "overview-commands"); }
    //console.timeEnd("overview-commands");
}());
