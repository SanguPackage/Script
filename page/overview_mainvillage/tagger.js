// Incoming/outgoing attacks
var mainTable = $("#overviewtable");
var incomingTable = $("#show_incoming_units table.vis:first");
var outgoingTable = $("#show_outgoing_units");
if (incomingTable.size() == 1 || outgoingTable.size() == 1) {
	if (incomingTable.size() == 1) {
		// tagger - add header
        // inputBoxWidth : clicking the button focusses the newly created inputbox
        //                 solution is to no longer show inputboxes on screen load
        /*if (user_data.mainTagger2.inputBoxWidth != null) {
            $("a.rename-icon", incomingTable).click();
            $("span.quickedit", incomingTable).each(function() {
                var renameSpan = this;
                //setTimeout(function() {
                $("span.quickedit-edit input:first", renameSpan).width(user_data.mainTagger2.inputBoxWidth);
                //}, 1);
            });
        }*/

		if (user_data.mainTagger2.active && incomingTable.has("img[src*='attack']").size() != 0) {
			$("th:first", incomingTable).append("<input type=button value='" + trans.sp.tagger.openButton + "' id=openTaggerButton>");
			$("#openTaggerButton").click(function () {
				$(this).hide();

				incomingTable.click(function (e) {
					if (e.target.nodeName === 'IMG') {
						var direction = $(e.target).attr("direction");
						if (direction.length > 0) {
							var rowIndex = parseInt($(e.target).attr("rowIndex"), 10);
							direction = direction == "up";
							$("input.incAt", incomingTable).each( function () {
								var rowIndexAttributeValue = parseInt($(this).attr("rowIndex"), 10);
								if ((direction && rowIndexAttributeValue <= rowIndex) || (!direction && rowIndexAttributeValue >= rowIndex)) {
									$(this).prop("checked", true);
								} else {
									$(this).prop("checked", false);
								}
							});
						}
					}
				});

				var rows = $("tr", incomingTable);
				var dodgeMenu = "<tr><td>";
				dodgeMenu += '<img src="graphic/command/support.png" alt="" id="checkSupport" title="' + trans.sp.tagger.checkAllSupport + '" />';
				dodgeMenu += "&nbsp;";
				dodgeMenu += '<img src="graphic/command/return.png" alt="" id="uncheckSupport" title="' + trans.sp.tagger.uncheckAllSupport + '" />';
				dodgeMenu += "<th colspan=3>";
				dodgeMenu += trans.sp.tagger.renameTo + "<input type=textbox size=30 id=commandInput value='" + user_data.mainTagger2.defaultDescription + "'></th>";
				dodgeMenu += "<th>" + trans.sp.tagger.slowest + "</th>";
				dodgeMenu += "</td>";
				dodgeMenu += "<td colspan=1 id=slowestUnitCell>";
				if (slowest_unit != null) {
					dodgeMenu += "<img title='"+trans.sp.tagger.slowestTip+"' src='graphic/unit/" + slowest_unit + ".png' slowestunit='" + slowest_unit + "'>";
				}
				dodgeMenu += "</td></tr>";
				incomingTable.find("tbody:first").prepend(dodgeMenu);

				// checkbox manipulation
				$("#uncheckSupport").click(function () {
					$("input.incSupport", incomingTable).prop("checked", false);
				});

				$("#checkSupport").click(function () {
					$("input.incSupport", incomingTable).prop("checked", true);
				});

				var buttonParent = $("#commandInput").parent();
                var commandIdToCoordCache = []; // No Ajax call on multiple renames with {xy}
				function renameCommand(commandName) {
                    var dodgeCell; // capture last cell for dodgeCell coloring

                    function getCommandIdFromDodgeCell(dodgeCell) {
                        return Number(dodgeCell.find("span.quickedit").first().attr("data-id"));
                    }

                    function getVillageCoordsFromCommandId(commandId, callback) {
                        if (server_settings.ajaxAllowed) {
                            if (commandIdToCoordCache[commandId]) {
                                callback(commandIdToCoordCache[commandId]);

                            } else {
                                ajax('screen=info_command&type=other&id='+commandId, function (overview) {
                                    var originVillageLink = $(".village_anchor:first", overview).find("a[href]"),
                                        originVillageDesc = originVillageLink.html(),
                                        originVillage = getVillageFromCoords(originVillageDesc);

                                    commandIdToCoordCache[commandId] = originVillage.coord;

                                    callback(originVillage.coord);
                                });
                            }
                        }
                        callback('');
                    }

                    function executeRename(dodgeCell, commandName) {
                        function keepTwIcon(dodgeCell, commandName) {
                            var oldName = $(".quickedit-label", dodgeCell).text().toUpperCase(),
                                newName = commandName,
                                i,
                                unitName;

                            for (i = 0; i < user_data.mainTagger2.reservedWords.length; i++) {
                                unitName = user_data.mainTagger2.reservedWords[i];
                                if (oldName.indexOf(unitName.toUpperCase()) !== -1) {
                                    newName = unitName + ' ' + newName;
                                    return newName; // Only one icon possible
                                }
                            }
                            return newName;
                        }

                        var button = dodgeCell.find("input[type='button']"),
                            newName =  user_data.mainTagger2.keepReservedWords ? keepTwIcon(dodgeCell, commandName) : commandName;

                        button.prev().val(newName);
                        button.click();
                    }

					$("input.taggerCheckbox", incomingTable).each(function () {
                        var openRenameButton;

						if ($(this).is(":checked")) {
							dodgeCell = $(this).parent().next();

                            openRenameButton = $("a.rename-icon", dodgeCell);
                            if (openRenameButton.is(":visible")) {
                                openRenameButton.click();
                            }

                            if (commandName.indexOf("{xy}") !== -1) {
                                getVillageCoordsFromCommandId(getCommandIdFromDodgeCell(dodgeCell), function(vilCoords) {
                                    var nameWithCoords = commandName.replace("{xy}", vilCoords);
                                    setTimeout(executeRename(dodgeCell, nameWithCoords),200);
                                });

                            } else {
                                setTimeout(executeRename(dodgeCell, commandName),200);
                            }
						}
					});

					if (dodgeCell != null) {
						var unitSpeed = $("#slowestUnitCell img").attr("slowestunit");
						if (unitSpeed != undefined) {
							dodgeCell = dodgeCell.parent().find("td").last().prev();
							pers.setCookie("sanguDodge" + getQueryStringParam("village"), unitSpeed + "~" + dodgeCell.text(), user_data.mainTagger2.minutesDisplayDodgeTimeOnMap);

							$(".dodgers", incomingTable).css("background-color", "").attr("title", "");
							dodgeCell.css("background-color", user_data.colors.good).attr("title", trans.sp.tagger.activeDodgeTime);
						}
					}
				}

				// std tag button
				var button = $("<input type=button title='" + trans.sp.tagger.renameTooltip + "' value='" + trans.sp.tagger.rename + "' onclick='select();'>");
				button.click(function () {
					trackClickEvent("MainTagger-CustomRename");
					var tagName = $("#commandInput").val();
					renameCommand(tagName);
				});
				buttonParent.append(button);

				if (user_data.mainTagger2.otherDescs != null && user_data.mainTagger2.otherDescs != false) {
					$.ctrl = function(key, callback, args) {
					    $(document).keydown(function(e) {
						if(!args) args=[]; // IE barks when args is null 
						if(e.keyCode == key.charCodeAt(0) && e.ctrlKey) {
						    e.preventDefault();
						    e.stopPropagation();
						    callback.apply(this, args);
						    return false;
						}
					    });        
					};
					// custom buttons
					$.each(user_data.mainTagger2.otherDescs, function (index, val) {
					    if (val.active) {
						var button = $("<input type=button title='" + trans.sp.tagger.renameButtonShortcutTooltip.replace("{hitkey}", val.hitKey)
                            + "' data-rename-to='" + val.renameTo + "' value='" + val.name
                            + "' class=\"mainTaggerButtons\">").click(
						    function () {
                                // Cannot use input:checked : this works for Firefox but there is a bug in Opera
                                trackClickEvent("MainTagger-ConfigRename");
                                renameCommand($(this).attr("data-rename-to"));
						    });
		    
						    buttonParent.append(button);
					    }
					    $.ctrl(val.hitKey, function(s) {
                            trackClickEvent("MainTagger-ConfigRename");
                            renameCommand(val.renameTo);
					    });
					});
				}

				// add checkboxes
				var lastRowIndex = rows.size(),
                    lastSend = 0,
                    prevSendTime = 0,
				    firstNight = true,
				    amountOfAttacks = 0;

				rows.each(function (rowIndex, rowValue) {
					var row = $(rowValue);
					if (rowIndex == 0) {
						// headerrow
						var header = "<td width=1% nowrap>";
						header += "<img src='graphic/command/attack.png' title='" + trans.sp.tagger.checkAllAttacks + "' id=checkAll>&nbsp;<img src='graphic/command/cancel.png' title='" + trans.sp.tagger.uncheckAllAttacks + "' id=uncheckAll>";
						header += "</td>";

						row.replaceWith("<tr>" + header + "<th width='68%'>" + trans.sp.tagger.incomingTroops + "</th><th width='30%'>" + trans.sp.tagger.arrival + "</th><th width='10%'>" + trans.sp.tagger.arrival + "</th><th width=10% nowrap>" + trans.sp.tagger.dodgeTime + "</th><th width='1%'>&nbsp;</th>" + "</tr>");

						$("#checkAll").click(function () {
							$("input.incAt", incomingTable).prop("checked", true);
						});

						$("#uncheckAll").click( function () {
							$("input.incAt", incomingTable).prop("checked", false);
						});
						
					} else {
						// non header row types
						if (row.find("th").size() != 0) {
							// this part is only executed when attacks can be ignored
							// select all checkbox row (right above link rows)
							$("th:first", row).replaceWith("<th><input type=checkbox id=selectAllIgnore> " + $("th:first", row).text() + "</th>");
							$("#selectAllIgnore").click(function () {
								var ingoreBoxes = $("input[name^='id_']", incomingTable);
								var isChecked = $("#selectAllIgnore").is(":checked");
								ingoreBoxes.each(function() {
									$(this).attr("checked", isChecked);
								});
							});

							row.prepend("<td title='" + trans.sp.tagger.totalAttacksOnVillage + "' align=center><b># " + amountOfAttacks + "</b></td>").find("td:last").attr("colspan", 4);
							
						} else if (row.find("td").size() == 1) {
							// link-rows (bottom)
							if ($("#switchModus").size() == 0) {
								if ($("#selectAllIgnore").size() == 0) {
									// attack hiding disabled in tw settings -> there is not yet a totalrow
									row.prepend("<td title='" + trans.sp.tagger.totalAttacksOnVillage + "' align=center><b># " + amountOfAttacks + "</b></td>");
								} else {
                                    row.prepend("<td>&nbsp;</td>");
                                }

								row.before("<tr><td>&nbsp;</td><td colspan=5><a href='' id=switchModus>" + trans.sp.tagger.switchModus + "</a></td></tr>");
								$("#switchModus").click(function () {
									trackClickEvent("MainTagger-OpenClose");
									var editSpans = $("input.incAt", incomingTable).parent().parent().find("span.quickedit"),
                                        isInDisplayMode = function (editSpan) {
                                            return editSpan.find("span:first").is(":visible");
                                        },
                                        switchToOpen = isInDisplayMode(editSpans.first());

                                    editSpans.each(function() {
                                        var editSpan = $(this),
                                            isDisplayMode = isInDisplayMode(editSpan);

                                        if (switchToOpen && isDisplayMode) {
                                            // make input form visible
                                            $("a.rename-icon", editSpan).click();
                                            //setTimeout(function() {
                                            $("span.quickedit-edit input:first", editSpan).width(user_data.mainTagger2.inputBoxWidth);
                                            //}, 1);

                                        } else if (!switchToOpen && !isDisplayMode) {
                                            // make label display visible
                                            editSpan.find("span:first").show();
                                            editSpan.find("span:last").remove();
                                        }
                                    });

									return false;
								});
							} else {
                                row.prepend("<td>&nbsp;</td>");
                            }
							row.find("td:last").attr("colspan", 5);
						} else {
							// normal incoming rows
							var checkboxCell = "<td><input type=checkbox rowIndex=" + rowIndex + " class='taggerCheckbox ";
							var incomingType = $("img[src*='graphic/command/support.png']", this).size() == 1 ? 'incSupport' : "incAt";
							checkboxCell += incomingType + "'";
							if (rowIndex == 1) {
								checkboxCell += " id=checkFirst";
							}

							var currentArrivalTime = getDateFromTodayTomorrowTW($("td:eq(1)", this).text());
							if (incomingType == 'incAt' && isDateInNightBonus(currentArrivalTime)) {
								// nightbonus
								row.find("td:eq(1)").css("background-color", user_data.colors.error);
							}

							// extra column with dodge time
							if (incomingType == 'incAt') {
								var dodgeTime = getTimeFromTW($("td:eq(2)", this).text());
								row.find("td:last").before("<td class=dodgers>" + twDurationFormat(dodgeTime.totalSecs / 2 / 60) + "</td>");
								amountOfAttacks++;
							} else {
								row.append("<td>&nbsp;</td>");
							}

							// dotted line after x hours no incomings
							if (prevSendTime == 0 || (currentArrivalTime - prevSendTime) / 1000 / 60 > user_data.mainTagger2.minutesWithoutAttacksDottedLine) {
								if (prevSendTime != 0) {
									row.find("td").css("border-top", "1px dotted black");
								}
								
								prevSendTime = currentArrivalTime;
							}
							
							// black line after each nightbonus
							if (lastSend == 0 || currentArrivalTime > lastSend) {
								if (lastSend != 0) {
									row.find("td").css("border-top", "1px solid black");
									firstNight = false;
								}

								lastSend = new Date(currentArrivalTime);
								if (lastSend.getHours() >= world_config.nightbonus.till) {
									lastSend.setDate(lastSend.getDate() + 1);
									lastSend.setHours(world_config.nightbonus.from);
									lastSend.setMinutes(0);
									lastSend.setSeconds(0);
								} else if (lastSend.getHours() < world_config.nightbonus.from) {
									lastSend.setHours(world_config.nightbonus.from);
									lastSend.setMinutes(0);
									lastSend.setSeconds(0);
								} else {
									lastSend.setHours(world_config.nightbonus.till);
									lastSend.setMinutes(0);
									lastSend.setSeconds(0);
								}
							}

							// Automatically select?
							if (incomingType == "incAt") {
								if (firstNight) {
									var isDefaultDesc = false;
									if (!isDefaultDesc) {
										checkboxCell += " checked=true";
									}
								}

								$("span:eq(2)", row).find("input:first").click(function () {
									$(this).select();
								});

								// extra buttons
								$("td:eq(0)", row).append("<img src='graphic/oben.png' title='" + trans.sp.tagger.allAbove + "' rowIndex=" + rowIndex + " direction='up'> <img src='graphic/unten.png' title='" + trans.sp.tagger.allBelow + "' rowIndex=" + rowIndex + " direction='down'>");
							}

							row.prepend(checkboxCell + "></td>");

							if (user_data.mainTagger2.colorSupport != null && incomingType != "incAt") {
								row.find("td").css("background-color", user_data.mainTagger2.colorSupport);
							}
						}
					}
				});
			});
		}
	}

	// show tagger?
	if (user_data.mainTagger2.autoOpen) {
		$("#openTaggerButton").click();
	}
	
	// Show attack rename inputboxes 
	if (user_data.mainTagger2.autoOpenCommands) {
		$("#switchModus").click();
	}

    // BUG: This breaks the TW remembering of the div positions!!
	var newLayout = "<tbody><tr><td colspan=2><div class='outerBorder' id=myprettynewcell>";
	newLayout += "</div></td></tr></tbody>";
	mainTable.append(newLayout);

	var prettyCell = $("#myprettynewcell");
	prettyCell.append($("#show_incoming_units"));
	prettyCell.append($("#show_outgoing_units"));
}
