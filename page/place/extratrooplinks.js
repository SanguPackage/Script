(function() {
    try {
        // Values for minimal noble values
        let nobleUnitsToBalance = ["light", "heavy", "axe", "marcher", "spear", "sword", "archer", "spy", "ram", "catapult", "snob"];
        let nobleSupport = [{unit: 'light'},{unit: 'axe'},{unit: 'marcher'},{unit: 'heavy'},{unit: 'spear'},{unit: 'sword'},{unit: 'archer'}];
        if (!world_config.hasArchers){
          nobleSupport = [{unit: 'light'},{unit: 'axe'},{unit: 'heavy'},{unit: 'spear'},{unit: 'sword'}];;
        }
        let unitsNeeded = Math.ceil(game_data.village.points * world_config.minFake - 100);

        // Read troops available
        var units = [];
        units.total = 0;
        units.needed = 0;
        $("#command-data-form .unitsInput").each(function () {
            var amount = $(this).next().text().substr(1);
            units[this.name] = parseInt(amount.replace(")", ""), 10);
            units.total += units[this.name] * world_data.unitsSize['unit_'+this.name];
        });

        nobleSupport.forEach((el)=>
          units.needed += units[el.unit] * world_data.unitsSize['unit_'+el.unit]);

        // Add extra links next to "All troops"
        function createRallyPointScript(linksContainer, unitLoop, name, min, checkFunction, tag) {
            send = {};
            $.each(unitLoop, function (i, v) {
                if (units[v] >= min) {
                    send[v] = checkFunction(units[v], v, tag);
                }
            });
            linksContainer.append("&nbsp; &nbsp;<a href='#' onclick='" + fillRallyPoint(send) + "; return false'>" + name + "</a>");
        }

        var villageType = calcTroops(units);
        var linksContainer = $('#selectAllUnits').parent().attr("colspan", 4);

        // add fake attack
        var minFake = 0;
        if (world_config.hasMinFakeLimit) {
            minFake = getBuildingPoints();
            minFake *= world_config.minFake;
            if (units.ram > 0) {
                minFake -= world_data.unitsSize['unit_ram'];
            }
        }

        if (user_data.place.attackLinks.fakePlaceLink && units['total'] >= minFake) {
            createRallyPointScript(linksContainer, world_data.units, user_data.place.attackLinks.fakePlaceLinkName, 0, function (amount, v, tag) {
                if ((v == 'ram' || v == 'catapult') && !tag.rammed && amount > 0) {
                    tag.rammed = true;
                    return 1;
                }

                if (v == 'snob' || tag.toSend <= 0 || amount == 0) {
                    return 0;
                }

                if (user_data.place.attackLinks.fakePlaceExcludeTroops.indexOf(v) > -1) {
                    return 0;
                }

                var farmSize = world_data.unitsSize['unit_' + v];
                if (amount * farmSize > tag.toSend) {
                    amount = Math.ceil(tag.toSend / farmSize);
                }
                tag.toSend -= amount * farmSize;
                if (v == 'sword' && amount > 0) {
                    tag.toSend++;
                    amount--;
                }

                return amount;
            }, { toSend: minFake, rammed: false });
        }

        if (units['total'] > 0)
            $.each(user_data.place.customPlaceLinks, function (i, v) {
              let snobsAvailable = units.snob
                if (v.active && villageType.isMatch(v.type)) {
                    // villageType: off, def, all
                    if (v.required == undefined || units[v.required[0]] >= v.required[1]) {
                        // requires certain amount of troops
                        if (v.totalPop == undefined) {
                            // work with absolute numbers
                            createRallyPointScript(linksContainer, world_data.units, v.name, 0, function (amount, unitVal, tag) {
                                //q(v + ' - SEND:' + tag[v] + '; amount=' + amount + ';');
                                var send = tag[unitVal];
                                if (send != undefined && amount > 0) {
                                    //q("send: " + send + " // amount: " + amount + " // unitVal: " + unitVal);
                                    if (send < 0) {
                                        send = amount + send;
                                        if (send < 0) {
                                            send = 1;
                                        }
                                    }
                                    if ((amount - send) * world_data.unitsSize['unit_' + unitVal] < tag.sendAlong) {
                                        send = amount;
                                    }
                                    if (send > 0 && !tag.ignoreNobles) {
                                        $.each(nobleSupport, function (i, val) {
                                          let snobsPossible = Math.floor(send / unitsNeeded)
                                            if (unitVal == val.unit && snobsPossible <= snobsAvailable && send >= unitsNeeded) {
                                              send -= Math.ceil(snobsAvailable * (unitsNeeded / world_data.unitsSize["unit_" + unitVal]));
                                              snobsAvailable -= snobsPossible
                                            }
                                        });
                                    }
                                    //if (unitVal == 'light') q(send);

                                    if (send > amount) {
                                        return amount;
                                    }
                                    if (send > 0) {
                                        return send;
                                    }
                                }
                                return 0;
                            }, v);

                        } else { // do automatic calculation which division of troops to select
                            ////{ active: true, type: 'def', name: 'HelftZc', totalPop: 10000, divideOver: ['spear', 'heavy'] },
                            // TODO this doesn't yet work, does it?
                            // Probably not active...
                            var totalPop = 0;
                            $.each(v.divideOver, function (i, val) { totalPop += units[val] * world_data.unitsSize['unit_' + val]; });

                            createRallyPointScript(linksContainer, world_data.units, v.name, 0, function (amount, unitVal, tag) {
                                if ($.inArray(unitVal, tag.divideOver) == -1) {
                                    return 0;
                                }
                                if (totalPop < tag.totalPop) {
                                    return amount;
                                }

                                var currentUnitPercentage = (amount * world_data.unitsSize['unit_' + unitVal]) / totalPop;
                                return Math.floor(amount * currentUnitPercentage);
                            }, v);
                        }
                    }
                }
            });

        if (units.spy >= user_data.place.attackLinks.scoutVillage && user_data.place.attackLinks.scoutPlaceLinks != null && user_data.place.attackLinks.scoutPlaceLinks.length > 0) {
            $.each(user_data.place.attackLinks.scoutPlaceLinks, function (i, v) {
                if (units.spy >= v) {
                    createRallyPointScript(linksContainer, ["spy"], user_data.place.attackLinks.scoutPlaceLinksName.replace("{amount}", v), 0, function (amount, v, tag) {
                        return tag;
                    }, v);
                }
            });
        }

      if (units.snob > 0 && user_data.place.attackLinks.noblePlaceLink) {
        if (user_data.place.attackLinks.noblePlaceLinkFirstName) {
          let minimalTroopsReached = 0;
          let snobsUsed = 1
          createRallyPointScript(linksContainer, nobleUnitsToBalance, user_data.place.attackLinks.noblePlaceLinkFirstName, 0, function (amount, v, tag) {
            if (v == 'snob') {
              return 1;
            }
            if (tag > 0) {
              var returned = null;
              $.each(nobleSupport, function (i, val) {
                let totalSnobsPossible = Math.floor((units.needed - unitsNeeded) / unitsNeeded)

                if (v == val.unit && minimalTroopsReached < unitsNeeded * (tag - 1) && amount > 0) {
                  let snobsPossible = Math.floor(amount * world_data.unitsSize["unit_" + val.unit] / unitsNeeded);
                  let snobsToUse = totalSnobsPossible > snobsPossible? snobsPossible < (tag - 1) ? snobsPossible : (tag - snobsUsed) : totalSnobsPossible;

                  returned = amount - snobsToUse * (minimalTroops(val.unit, '100'));
                  minimalTroopsReached += (amount - returned) * world_data.unitsSize["unit_" + val.unit];
                  units.needed -= (amount - returned) * world_data.unitsSize["unit_" + val.unit];
                  snobsUsed += snobsToUse;

                }
              });
              if (returned != null) {
                return returned;
              }
            }


            return amount;
          }, units.snob);

        }

        if (user_data.place.attackLinks.noblePlaceLinkSupportName && (units.snob > 1 || user_data.place.attackLinks.noblePlaceLinksForceShow)) {
          let minimalTroopsReached = 0;
          createRallyPointScript(linksContainer, nobleUnitsToBalance, user_data.place.attackLinks.noblePlaceLinkSupportName, 0, function (amount, v, tag) {
            if (v == 'snob') {
              return 1;
            }
            var returned = 0;
            $.each(nobleSupport, function (i, val) {
              if (v == val.unit && minimalTroopsReached < unitsNeeded && amount >= unitsNeeded / world_data.unitsSize["unit_" + val.unit]) {
                returned = minimalTroops(val.unit, "100");
                minimalTroopsReached += returned * world_data.unitsSize["unit_" + val.unit];
              }
            });
            return returned;
          });
        }

            if (units.snob > 0 && user_data.place.attackLinks.noblePlaceLinkDivideName) {
                createRallyPointScript(linksContainer, world_data.units, user_data.place.attackLinks.noblePlaceLinkDivideName, 0, function (amount, v, tag) {
                    if (v == 'snob') {
                        return 1;
                    }
                    if (v == 'catapult') {
                        return 0;
                    }
                    if (v == 'ram' && !user_data.place.attackLinks.noblePlaceLinkDivideAddRam) {
                        return 0;
                    }
                    return Math.floor(amount / units.snob);
                });
            }
        }
    } catch (e) { handleException(e, "place-extratrooplinks"); }
}());
