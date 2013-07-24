(function() {
    //console.time("overview-prod");
    try {
        overviewTable = $("#production_table");
        tableHandler.init("production_table");

// Filter full storage rooms
        var resTable = $("#production_table");
        var menu = "<table class='vis' width='100%'>";
        menu += "<tr><th>";
        menu += " <input type=checkbox id=resFilter " + (user_data.resources.filterRows ? "checked" : "") + "> " + trans.sp.prodOverview.filter + " ";
        menu += "&nbsp;<input type=button id=resStorageFull value='" + trans.sp.prodOverview.filterFullGS + "' title=''>&nbsp; &nbsp; ";
        menu += "<select id=resAmountType><option value=1>" + trans.sp.all.more + "</option>";
        menu += "<option value=-1>" + trans.sp.all.less + "</option></select>";
        menu += "<input type=text id=resAmount size=6 value=" + user_data.resources.requiredResDefault + ">";
        menu += " <input type=button class=resFilter value='" + trans.tw.all.wood + "' resIndex=0><input type=button class=resFilter value='" + trans.tw.all.stone + "' resIndex=1><input type=button class=resFilter value='" + trans.tw.all.iron + "' resIndex=2><input type=button class=resFilter value='" + trans.sp.all.all + "' resIndex=-1>";
        menu += " " + trans.sp.all.withText + " <input type=checkbox id=resMerchant " + (user_data.resources.filterMerchants ? "checked" : "") + " title='" + trans.sp.prodOverview.merchantTooltip + "'>";
        menu += "<input type=text id=resMerchantAmount size=2 value=" + user_data.resources.requiredMerchants + " title='" + trans.sp.prodOverview.merchantAmountTooltip + "'> " + trans.sp.all.merchants + " ";
        menu += "&nbsp; &nbsp; <input type=button id=resBBCode value='" + trans.sp.prodOverview.bbCodes + "'> <input type=checkbox id=resBBCodeImages> " + trans.sp.prodOverview.bbCodesInfo;
        menu += "</th></tr></table>";
        resTable.before(menu);

        $("#resFilter").change(function () {
            var isCheck = $(this).is(":checked");
            $("#resFilter").attr("title", isCheck ? trans.sp.prodOverview.filterTooltip : trans.sp.prodOverview.filterTooltipReverse);
            $("#resStorageFull").attr("title", isCheck ? trans.sp.prodOverview.filterFullGSTooltip : trans.sp.prodOverview.filterFullGSTooltipReverse);
            $(".resFilter").each(function (index, value) {
                if (index == 3) {
                    $(value).attr("title", isCheck ? trans.sp.prodOverview.filterAllTooltip : trans.sp.prodOverview.filterAllTooltipReverse);
                } else {
                    $(value).attr("title", isCheck ? trans.sp.prodOverview.filter1Tooltip.replace("{0}", $(value).attr("value")) : trans.sp.prodOverview.filter1TooltipReverse.replace("{0}", $(value).attr("value")));
                }
            });
        });

        $("#resFilter").change();

        $("#resStorageFull").click(function () {
            trackClickEvent("FilterFullRes");
            filterRes('full', $("#resFilter").is(":checked"));
        });

        $("#resBBCode").click(function () {
            trackClickEvent("BBCodeOutput");
            var bbs = filterRes("bbcode", false);
            if ($("#bbcodeArea").size() == 0) {
                $(this).after("<textarea id=bbcodeArea cols=50 rows=10 wrap=off>");
            }

            $("#bbcodeArea").val(bbs);
        });

        function filterRes(resourceIndex, hideRows) {
            var resCode = [trans.tw.all.wood, trans.tw.all.stone, trans.tw.all.iron];
            var bbcodes = '';
            var goners = $();
            var stayers = $();
            var filterMerchants = $("#resMerchant").is(":checked");
            var filterMerchantsAmount = parseInt($("#resMerchantAmount").val(), 10);
            var minAmount = parseInt($("#resAmount").val(), 10);
            var reverse = $("#resAmountType").val() == "-1";
            var bbCodeImages = $("#resBBCodeImages").is(":checked");
            var minDif = user_data.resources.bbcodeMinimumDiff;

            if (reverse) {
                bbcodes = trans.sp.all.tooLittle + "\n";
            } else {
                bbcodes = trans.sp.all.tooMuch + "\n";
            }

            function doResource(resCell, resArray, resIndex, reverse, minAmount) {
                var resAmount = parseInt(resArray[resIndex], 10);
                if ((!reverse && resAmount > minAmount) || (reverse && resAmount < minAmount)) {
                    $("span[title]:eq(" + resIndex + ")", resCell).css("font-weight", "bold")
                    return false;
                }
                return true;
            }

            var hasNotes = $("th:first", resTable).text().indexOf(trans.tw.overview.village) == -1;
            resTable.find("tr:gt(0)").each(function () {
                var isOk = true;
                var resCell;
                if (hasNotes) {
                    resCell = $(this).find("td:eq(3)");
                } else {
                    resCell = $(this).find("td:eq(2)");
                }
                var resources = $.trim(resCell.text()).replace(/\./gi, "").split(" ");

                if (resourceIndex == 'bbcode') {
                    // All resources
                    var villageBBCode = '';
                    for (var i = 0; i < 3; i++) {
                        if ((!reverse && resources[i] - minDif > minAmount) || (reverse && parseInt(resources[i], 10) + parseInt(minDif, 10) < minAmount)) {
                            if (bbCodeImages) {
                                villageBBCode += "[img]http://www.tribalwars.nl/graphic/" + world_data.resources[i] + ".png[/img] ";
                            } else {
                                villageBBCode += resCode[i] + " ";
                            }
                            villageBBCode += parseInt(Math.abs(resources[i] - minAmount) / 1000, 10) + "k ";
                        }
                    }
                    if (villageBBCode.length > 0) {
                        var villageCell = $("td:eq(" + (hasNotes ? "1" : "0") + ") span:eq(1)", this);
                        bbcodes += "[village]" + getVillageFromCoords(villageCell.text()).coord + "[/village] " + villageBBCode + "\n";
                    }
                } else if (resourceIndex == 'full') {
                    // full storage rooms
                    if ($(".warn", this).size() > 0) {
                        resCell.css("background-color", user_data.resources.highlightColor);
                        isOk = false;
                    }

                } else {
                    // One specific resource
                    $("span[title]", resCell).css("font-weight", "normal");

                    if (resourceIndex == "-1") {
                        isOk = isOk && !(!doResource(resCell, resources, 0, reverse, minAmount)
                            | !doResource(resCell, resources, 1, reverse, minAmount)
                            | !doResource(resCell, resources, 2, reverse, minAmount));
                    } else {
                        isOk = isOk && doResource(resCell, resources, resourceIndex, reverse, minAmount);
                    }

                    if (!isOk) {
                        resCell.css("background-color", user_data.resources.highlightColor);
                    } else {
                        resCell.css("background-color", "");
                    }

                    if (filterMerchants) {
                        resCell = $(this).find("td:eq(4)");
                        if (hasNotes) {
                            resCell = resCell.next();
                        }
                        var merchants = resCell.text();
                        merchants = merchants.substr(0, merchants.indexOf("/"));
                        if (merchants < filterMerchantsAmount) {
                            resCell.css("background-color", user_data.colors.error);
                        } else {
                            resCell.css("background-color", "");
                        }
                    }
                }

                if (hideRows && isOk) {
                    goners = goners.add($(this));

                    // Village rename script will not rename villages if the hidden rename inputfield is on a hidden row
                    // --> People were using our script to filter the village list and then use a mass village renamer which also renamed the hidden village rows
                    $("input:first", $(this)).val("");

                }
                else if (!$(this).is(":visible")) {
                    stayers = stayers.add($(this));
                }
            });
            stayers.show();
            goners.hide();
            return bbcodes;
        }

        $(".resFilter").click(function () {
            trackClickEvent("FilterResource");
            filterRes($(this).attr("resIndex"), $("#resFilter").is(":checked"));
        });
    } catch (e) { handleException(e, "overview-prod"); }
    //console.timeEnd("overview-prod");
}());