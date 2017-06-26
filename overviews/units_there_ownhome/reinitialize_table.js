/**
 * Creates a select box with all unit types in this world
 * @param {string} id the DOM ID
 * @param {string} select the currently selected unit
 */
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

menu += "</th><th nowrap width='1%'>";
menu += "<input type=text size=5 id=filterWalkingTimeValue>";
menu += "<input type=button id=filterWalkingTime value='" + trans.sp.troopOverview.filterWalkingTime + "' title='" + trans.sp.troopOverview.filterWalkingTimeTooltip + "'> ";

menu += "</th><th width='95%'>";

menu += "<input type=button id=snobFilter value='" + trans.sp.troopOverview.filterNoble + "' title='" + trans.sp.troopOverview.filterNobleTooltip + "'> &nbsp; ";
menu += "<input type=button id=attackFilter value='" + trans.sp.troopOverview.filterUnderAttack + "' title='" + trans.sp.troopOverview.filterUnderAttackTooltip + "'> &nbsp; ";

menu += "</th><th width='1%'>";

menu += "<input type=button id=calculateStack value='" + trans.sp.troopOverview.calcStack + "' title='" + trans.sp.troopOverview.calcStackTooltip + "'>";
menu += "</th>";

menu += "</tr></table>";

// second row
menu += "<table><tr><th width='1%' nowrap>";
menu += "<input type=checkbox id=defReverseFilter title='" + trans.sp.commands.filtersReverse + "'> " + trans.sp.commands.filtersReverseInfo + ": ";

menu += "</th><th width='1%' nowrap>";
menu += "<input type=text size=12 id=defFilterTextValue value=''>";
menu += "<input type=button id=defFilterText value='" + trans.sp.commands.freeTextFilter + "'>";

menu += "</th><th width='97%' nowrap>";
menu += "<input type=textbox size=3 id=defFilterContinentText maxlength=2><input type=button id=defFilterContinent value='" + trans.sp.commands.continentFilter + "'>";

menu += "</th>";

if (location.href.indexOf('type=there') > -1) {
    menu += "<th width='1%'><input type=button id=defRestack value='" + trans.sp.troopOverview.restack + "'></th>";
}
menu += "<th nowrap width='1%' style='padding-right: 8px; padding-top: 3px;'>";

menu += "<input type=checkbox id=sortIt title='" + trans.sp.troopOverview.sortTooltip + "'"
    + (user_data.command.filterAutoSort ? " checked" : "") + "> "
    + trans.sp.troopOverview.sort;

menu += "</th></tr>";
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


target = getVillageFromCoords(spTargetVillageCookie());
menu += "<th nowrap>" + trans.sp.all.targetEx
    + " <input type=text id=targetVillage name=targetVillage size=8 value='"
    + (target.isValid ? target.coord : "") + "'>"
    + "<input type=button class='btn' id=targetVillageButton value='"
    + trans.sp.troopOverview.setTargetVillageButton + "'></th>";
menu += "</tr>";






// function to replace the village rows
tableHandler.init("units_table", {
    rowReplacer: function (row) {
        //q($(row).html());
        var mod = "row_a";
        var newRow = "";
        var finalRow = "";
        var addThisRow = true;
        var cells = $("td:gt(0)", row);
        var units = {};
        var villageCell = $("td:first", row);
        var villageId = $("span.quickedit-vn", villageCell).attr("data-id");

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
                //newRow += "<img src='https://www.tribalwars.vodka/graphic/delete_small.png' style='margin-bottom: 3px; position: relative' title='" + trans.sp.troopOverview.removeVillage + "' /> ";
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
});

var newTable = tableHandler.getReplacedVillageRows();
$("#units_table")
    .html("<table width='100%' class='vis' id='units_table' target='false'>" + menu + newTable + "</table>")
    .before(sanguMenu);


// Tooltips
$("#defReverseFilter").change( function () {
    var isChecked = $(this).is(":checked");
    var defTrans = trans.sp.troopOverview;

    $("#defFilterContinent").attr("title", isChecked ? defTrans.continentFilterTooltip : defTrans.continentFilterTooltipReverse);
    $("#defFilterText").attr("title", defTrans.freeTextFilterTooltip.replace("{filterType}", isChecked ? defTrans.freeTextFilterTooltipFilterTypeWith : defTrans.freeTextFilterTooltipFilterTypeWithout));
});
$("#defReverseFilter").change();


// Initial focus on target inputbox
$('#targetVillage').click(function () {
    $(this).focus().select();
});



// "Attacks per page" -> change to # villages in the list
var pageSize = $("input[name='page_size']");
var villageAmountCell = $("#units_table tr:first th:first");
//assert(villageAmountCell.length === 1, "village cell Dorp (xxx) niet gevonden");
villageAmountCell.text(villageAmountCell.text() + " (0)");
function setVillageCount(amount) {
    pageSize.val(amount);
    villageAmountCell.text(villageAmountCell.text().replace(/\d+/, amount));
}

pageSize.parent().prev().text(trans.sp.overviews.totalVillages);
setVillageCount(villageCounter);