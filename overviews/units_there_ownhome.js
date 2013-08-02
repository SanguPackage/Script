(function() {
    //console.time("overview-thereownhome");
    try {
        var villageCounter = 0;
        var rowSize = world_data.units.length + 1;
        if (world_config.hasMilitia) {
            rowSize++;
        }

        function ReplaceUnitRow(row) {
            //q($(row).html());
            var mod = "row_a";
            var newRow = "";
            var finalRow = "";
            var addThisRow = true;
            var cells = $("td:gt(0)", row);
            var units = {};
            var villageCell = $("td:first", row);
            var villageId = $("span[id*='label_text']", villageCell).attr("id").substr(11);

            cells.each(function (index, element) {
                if (doFilter && index - 1 == unitIndex && parseInt(this.innerHTML, 10) < unitAmount) {
                    //q("index:" + index + ' == '+ unitIndex + " : " + row.html() + ' * 1 < ' + unitAmount);
                    addThisRow = false;
                    return false;
                }
                else if (index == rowSize) {
                    //q(index + "==" + rowSize);
                    newRow += "<td>";
                    newRow += "<img src='/graphic/dots/red.png' title='" + trans.sp.troopOverview.removeVillage + "' style='margin-bottom: 2px' /> ";
                    //newRow += "<img src='http://cdn2.tribalwars.net/graphic/delete_small.png' style='margin-bottom: 3px; position: relative' title='" + trans.sp.troopOverview.removeVillage + "' /> ";
                    newRow += "<a href='" + $("a", element).attr('href').replace("mode=units", "") + "&sanguX=0&sanguY=0' class='attackLinks'>";
                    newRow += "<img src='/graphic/command/attack.png' title='" + trans.sp.troopOverview.toThePlace + "' style='margin-bottom: 1px' />";
                    // Works only with leftclick onclick='this.src=\"/graphic/command/return.png\";'
                    newRow += "</a>";
                    newRow += "</td>";
                } else {
                    //q("units:" + world_data.units[index - 1]);
                    var cellDisplay = this.innerHTML;
                    if (cellDisplay === "0") {
                        cellDisplay = "&nbsp;";
                    }
                    else if (cellDisplay.indexOf('="has_tooltip"') > -1)  {
                        cellDisplay = cellDisplay.replace('="has_tooltip"', '="has_tooltip" title="'+trans.sp.troopOverview.cheapNobles+'"');
                    }

                    newRow += "<td>" + cellDisplay + "</td>";
                    if (index > 0) {
                        units[world_data.units[index - 1]] = parseInt(element.innerHTML, 10);
                    }
                    // innerHTML can contain a + sign for the nobles: "+" indicates nobles can be rebuild cheaply
                    // The snobs are not important here
                }
            });

            if (addThisRow) {
                var villageType = calcTroops(units);
                if (doFilter) {
                    mod = villageCounter % 2 == 0 ? "row_a" : "row_b";
                } else {
                    mod = !villageType.isDef ? "row_a" : "row_b";
                }

                //$("td:first span[id*='label_text']", row).attr("id").substr(11);

                var coord = getVillageFromCoords(villageCell.text());

                //finalRow += "<tbody>";
                finalRow += "<tr arrival='0' data-coord-x='" + coord.x + "' data-coord-y='" + coord.y + "' "
                    + " class='row_marker " + mod + (game_data.village.id == villageId ? " selected" : "") + "'>";
                finalRow += "<td>" + villageCell.html() + "</td>";
                finalRow += newRow;
                finalRow += "<td></td></tr>";
                //finalRow += "</tbody>";

                villageCounter++;

                return finalRow;
            }
            return "";
        }

        tableHandler.init("units_table", {
            rowReplacer: ReplaceUnitRow
        });

        var overviewMenuRowFilter = "tr:visible:gt(0)";

        function makeUnitBox(id, select) {
            var box = "<select id=" + id + ">";
            $.each(world_data.units, function (i, v) {
                box += "<option value=" + i + (v == select ? " selected" : "") + ">" + trans.tw.units.names[v] + "</option>";
            });
            box += "</select>";
            return box;
        }

        var menu = "<table width='100%' class='vis'>";
        menu += "<tr>";
        menu += "<th nowrap width='1%'>";
        menu += "<input type=text size=5 id=filterAxeValue value='" + user_data.command.filterMinDefault + "'>";
        menu += makeUnitBox("filterAxeType", user_data.command.filterMinDefaultType);
        menu += "<input type=button id=filterAxe value='" + trans.sp.troopOverview.filterTroops + "'";
        menu += " title='" + trans.sp.troopOverview.filterTroopsTooltip + "'> ";

        menu += "</th><th nowrap width='1%'>";

        menu += "<select id=filterPopValueType><option value=1>" + trans.sp.all.more + "</option>";
        menu += "<option value=-1>" + trans.sp.all.less + "</option></select>";
        menu += "<input type=text size=5 id=filterPopValue value='" + user_data.command.filterMinPopulation + "'>";
        menu += "<input type=button id=filterPop value='" + trans.sp.troopOverview.filterPopulation + "' title='" + trans.sp.troopOverview.filterPopulationTooltip + "'> ";

        menu += "</th><th width='96%'>";

        menu += "<input type=button id=calculateStack value='" + trans.sp.troopOverview.calcStack + "' title='" + trans.sp.troopOverview.calcStackTooltip + "'> &nbsp; ";
        menu += "<input type=button id=snobFilter value='" + trans.sp.troopOverview.filterNoble + "' title='" + trans.sp.troopOverview.filterNobleTooltip + "'> &nbsp; ";
        menu += "<input type=button id=attackFilter value='" + trans.sp.troopOverview.filterUnderAttack + "' title='" + trans.sp.troopOverview.filterUnderAttackTooltip + "'> &nbsp; ";

        menu += "</th><th nowrap width='1%' style='padding-right: 8px; padding-top: 3px;'>";

        menu += "<input type=checkbox id=sortIt title='" + trans.sp.troopOverview.sortTooltip + "'"
            + (user_data.command.filterAutoSort ? " checked" : "") + "> "
            + trans.sp.troopOverview.sort;

        menu += "</th>";

        if (location.href.indexOf('type=there') > -1) {
            menu += "<th><input type=button id=defRestack value='" + trans.sp.troopOverview.restack + "'></th>";
        }
        menu += "</tr>";
        menu += "</table>";

        // Sangu filter menu
        var sanguMenu = menu;

        // Overview table menu
        menu = "<tr id=units_table_header>";
        menu += "<th>" + trans.sp.troopOverview.village + "</th>";
        menu += "<th>" + trans.sp.troopOverview.nightBonus + "</th>";
        $.each(world_data.units, function (i, v) {
            menu += "<th><img src='/graphic/unit/unit_" + v + ".png' title=\"" + trans.sp.troopOverview.selectUnitSpeed.replace("{0}", trans.tw.units.names[v]) + "\" alt='' id=" + v + " /></th>";
        });
        if (world_config.hasMilitia) {
            menu += "<th><img src='/graphic/unit/unit_militia.png' title='" + trans.tw.units.militia + "' alt='' id=militia /></th>";
        }
        menu += "<th>" + trans.sp.troopOverview.commandTitle + "</th>";

        var currentPageSpeed = spSpeedCookie();

        // Do initial filter? (based on querystring)
        var search = window.location.search.substring(1).split("&");
        var doFilter = false;
        var unitIndex = user_data.command.filterMinDefault, unitAmount = user_data.command.filterMinDefault, sort = false, changeSpeed = false;
        for (i = 0; i < search.length; i++) {
            var item = search[i].split("=");
            switch (item[0]) {
                case 'unit':
                    doFilter = true;
                    unitIndex = world_data.units.indexOf(item[1]);
                    break;
                case 'amount':
                    doFilter = true;
                    unitAmount = parseInt(item[1], 10);
                    break;
                case 'changeSpeed':
                    changeSpeed = item[1];
                    if (changeSpeed != false) {
                        //spSpeedCookie(changeSpeed);
                        currentPageSpeed = changeSpeed;
                    }
                    break;

                case 'targetvillage':
                    var newTargetVillage = getVillageFromCoords(item[1]);
                    spTargetVillageCookie(newTargetVillage.coord);
                    break;

                case 'sort':
                    sort = item[1] == "true";
                    break;
            }
        }

        var target = getVillageFromCoords(spTargetVillageCookie());
        menu += "<th nowrap>" + trans.sp.all.targetEx
            + " <input type=text id=targetVillage name=targetVillage size=8 value='"
                + (target.isValid ? target.coord : "") + "'>"
            + "<input type=button id=targetVillageButton value='"
                + trans.sp.troopOverview.setTargetVillageButton + "'></th>";
        menu += "</tr>";

        var newTable = tableHandler.getReplacedVillageRows();
        $("#units_table")
            .html("<table width='100%' class='vis' id='units_table' target='false'>" + menu + newTable + "</table>")
            .before(sanguMenu);

        $('#targetVillage').click(function () {
            $(this).focus().select();
        });

        (function() {
            var position = $("#targetVillageButton").position(),
                options = {
                    left: position.left - 300,
                    top: position.top + 35
                },
                content = {
                    title: trans.sp.troopOverview.helpTitle,
                    body: trans.sp.troopOverview.help.replace("{unitIcon}", "<img src='graphic/unit/unit_ram.png'>, <img src='graphic/unit/unit_spear.png'>, ...")
                };

            createFixedTooltip("troopOverviewTooltip", content, options);
        }());

        // Recalculate arrival times as the target village changes
        $("#targetVillageButton").click(function () {
            trackClickEvent("TargetVillageSet");
            var targetMatch = getVillageFromCoords($('#targetVillage').val(), true);
            $("#units_table").attr("target", targetMatch.isValid);
            if (!targetMatch.isValid) {
                spTargetVillageCookie("");
                alert(trans.sp.troopOverview.setTargetVillageButtonAlert);
                $("#targetVillage").focus();

            } else {
                $(".attackLinks", tableHandler.overviewTable).each(function() {
                    // add target coordinates to attack image href which are read in place
                    var hrefWithVillageCoords = $(this).attr("href");
                    hrefWithVillageCoords = hrefWithVillageCoords.replace(/sanguX=(\d+)&sanguY=(\d+)/, "sanguX="+targetMatch.x+"&sanguY="+targetMatch.y);
                    $(this).attr("href", hrefWithVillageCoords);
                });

                spTargetVillageCookie(targetMatch.coord);
                $("#units_table").find(overviewMenuRowFilter).each(function () {
                    var unitRow = $(this),
                        dist = getDistance(targetMatch.x, unitRow.data("coord-x"), targetMatch.y, unitRow.data("coord-y"), currentPageSpeed);

                    $("td:last", unitRow).html(dist.html);
                    $(this).attr("arrival", dist.travelTime);
                    if (dist.isNightBonus) {
                        $("td:eq(1)", unitRow).css("background-color", user_data.colors.error);
                    } else {
                        $("td:eq(1)", unitRow).css("background-color", '');
                    }
                });

                if ($("#sortIt").is(":checked")) {
                    $("#units_table").find(overviewMenuRowFilter).sortElements(function (a, b) {
                        return parseInt($(a).attr("arrival"), 10) > parseInt($(b).attr("arrival"), 10) ? 1 : -1;
                    });
                }
            }
        });

        // "Attacks per page" -> change to # villages in the list
        var pageSize = $("input[name='page_size']");
        var villageAmountCell = $("#units_table tr:first th:first");
        assert(villageAmountCell.length === 1, "village cell Dorp (xxx) niet gevonden");
        villageAmountCell.text(villageAmountCell.text() + " (0)");
        function setVillageCount(amount) {
            pageSize.val(amount);
            villageAmountCell.text(villageAmountCell.text().replace(/\d+/, amount));
        }

        pageSize.parent().prev().text(trans.sp.overviews.totalVillages);
        setVillageCount(villageCounter);

        // Distance village to target village
        // Change active speed by clicking on a unit icon
        // ATTN: border style duplicated in trans.troopOverview.help
        $('#' + currentPageSpeed).parent().css("border", "2px green dotted");
        $('#' + spSpeedCookie()).parent().css("border", "3px red solid");
        $("#units_table_header").click(function (e) {
            if (e.target.nodeName === 'IMG' && e.target.id !== "militia") {
                currentPageSpeed = e.target.id;
                $("img", this).parent().css("border", "0px");
                $('#' + currentPageSpeed).parent().css("border", "2px green dotted");
                $('#' + spSpeedCookie()).parent().css("border", "3px red solid");
                $("#targetVillageButton").click();
            }
        });

        $("#units_table_header").dblclick(function (e) {
            if (e.target.nodeName === 'IMG' && e.target.id !== "militia") {
                currentPageSpeed = e.target.id;
                spSpeedCookie(e.target.id);
                $("img", this).parent().css("border", "0px");
                $('#' + currentPageSpeed).parent().css("border", "2px green dotted");
                $('#' + spSpeedCookie()).parent().css("border", "3px red solid");
                $("#targetVillageButton").click();
            }
        });

        if (sort) {
            $("#targetVillageButton").click();
        }

        // delete a table row
        $("#units_table").mouseup(function (e) {
            if (e.target.nodeName === 'IMG') {
                if (e.target.title == trans.sp.troopOverview.removeVillage) {
                    setVillageCount(parseInt(pageSize.val(), 10) - 1);
                    $(e.target).parent().parent().remove();
                }
            }
        });

        // remove row or add border to command cell when middle mouse click (open in new tab)
        $(".attackLinks", tableHandler.overviewTable).bind("mousedown", function(e) {
            if (e.which == 2) {
                var cell = $(e.target).parent().parent();
                if (user_data.command.middleMouseClickDeletesRow) {
                    cell.parent().remove();
                } else {
                    cell.css("border", (parseInt(cell.css("border-width").substr(0, 1), 10) + 1) + "px red solid");
                }
            }
        });

        // change by default selected unit the filter will be active for
        $("#filterAxeType").change(function () {
            var unit = world_data.units[$(this).val()];
            if (typeof user_data.command.filterMin[unit] !== 'undefined') {
                $("#filterAxeValue").val(user_data.command.filterMin[unit]);
            } else {
                $("#filterAxeValue").val(user_data.command.filterMinOther);
            }
        });

        // Filter rows with less than x axemen (or another unit)
        $("#filterAxe").click(function () {
            trackClickEvent("FilterUnitAmount");
            var villageCounter = 0;
            var goners = $();
            var minAxeValue = parseInt($("#filterAxeValue").val(), 10);
            var unit = parseInt($('#filterAxeType').val(), 10);
            $("#units_table").find(overviewMenuRowFilter).each(function () {
                var val = $("td:eq(" + (unit + 2) + ")", this).html();
                if (val == '&nbsp;' || parseInt(val, 10) < minAxeValue) {
                    goners = goners.add($(this));
                    $("input:first", $(this)).val("");
                }
                else
                    villageCounter++;
            });
            goners.remove();
            setVillageCount(villageCounter);
        });

        // Calculate stack
        $("#calculateStack").click(function () {
            trackClickEvent("CalculateStack");
            if (!this.disabled) {
                this.disabled = true;
                $("#units_table").find(overviewMenuRowFilter).each(function () {
                    var total = 0;
                    $("td:gt(1)", this).each(function (i) {
                        if (!($.trim(this.innerHTML) == '' || this.innerHTML == '&nbsp;' || i >= world_data.unitsPositionSize.length)) {
                            total += this.innerHTML * world_data.unitsPositionSize[i];
                        }
                    });
                    $("td:eq(1)", this).text(formatNumber(total)).css("background-color", getStackColor(total));
                });
            }
        });

        // Calculate Restack BB codes
        if (location.href.indexOf('type=there') > -1) {
            $("#defRestack").click(function () {
                trackClickEvent("BBCodeOutput");
                $("#calculateStack").click();

                var request = "";
                $("#units_table").find(overviewMenuRowFilter).each(function () {
                    var total = parseInt($("td:eq(1)", $(this)).text().replace(/\./, ''), 10);
                    if (user_data.restack.to - total > user_data.restack.requiredDifference) {
                        var villageCoord = getVillageFromCoords($(this).find("td:first span[id*='label_']").text());
                        request += "[village]" + villageCoord.coord + "[/village] (" + parseInt((user_data.restack.to - total) / 1000, 10) + "k)\n";
                    }
                });

                if ($("#textsArea").size() == 0) {
                    $(this).parent().parent().parent().append("<tr><td id=textsArea colspan=5></td></tr>");
                } else {
                    $("#textsArea").html("");
                }

                var title = trans.sp.troopOverview.restackTitle
                    .replace("{to}", parseInt(user_data.restack.to / 1000, 10))
                    .replace("{requiredDiff}", parseInt(user_data.restack.requiredDifference / 1000, 10));
                $("#textsArea").append(title + "<br><textarea cols=35 rows=10 id=defRestackArea>" + request + "</textarea>");

                $("#textsArea").append("<br><input type=button value='" + trans.sp.all.close + "' id=closeTextsArea>");
                $("#closeTextsArea").click(function() {
                    $("#textsArea").parent().remove();
                });
            });
        }

        // filter rows with less then x population
        $("#filterPop").click(function () {
            trackClickEvent("FilterFarm");
            $("#calculateStack").click();
            var villageCounter = 0;
            var goners = $();
            var min = parseInt($("#filterPopValue").val(), 10);
            var reverseFilter = $("#filterPopValueType").val() == "-1";
            $("#units_table").find(overviewMenuRowFilter).each(function () {
                var line = $(this);
                $("td:eq(1)", this).each(function () {
                    var amount = parseInt($(this).text().replace('.', ''), 10);
                    if ((!reverseFilter && amount < min) || (reverseFilter && amount > min)) {
                        goners = goners.add(line);
                        $("input:first", line).val("");
                    }
                    else villageCounter++;
                });
            });
            goners.remove();
            setVillageCount(villageCounter);
        });

        // Filter rows without snobs/nobles
        $("#snobFilter").click(function () {
            trackClickEvent("FilterSnob");
            var villageCounter = 0;
            var goners = $();
            $("#units_table").find(overviewMenuRowFilter).each(function () {
                if ($.trim($("td:eq(" + (world_data.unitsPositionSize.length + 1) + ")", this).text()) === '') {
                    goners = goners.add($(this));
                    $("input:first", $(this)).val("");
                } else
                    villageCounter++;
            });
            goners.remove();
            setVillageCount(villageCounter);
        });

        // hide rows not under attack
        $("#attackFilter").click(function () {
            trackClickEvent("FilterUnderAttack");
            var villageCounter = 0;
            var goners = $();
            $("#units_table").find(overviewMenuRowFilter).each(function () {
                //q("'" + $(this).html() + "'");
                //q("---------------------------------------------------");
                if ($('td:first:not(:has(img[title=\'' + trans.tw.command.attack + '\']))', this).size() != 0) {
                    goners = goners.add($(this));
                    $("input:first", $(this)).val("");
                } else {
                    villageCounter++;
                }
            });
            goners.remove();
            setVillageCount(villageCounter);
        });
    } catch (e) { handleException(e, "overview-thereownhome"); }
    //console.timeEnd("overview-thereownhome");
}());