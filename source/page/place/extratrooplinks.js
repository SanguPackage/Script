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
	createRallyPointScript(linksContainer, world_data.units, trans.sp.place.attackLinkNames.fake, 0, function (amount, v, tag) {
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
							$.each(user_data.place.attackLinks.nobleSupport, function (i, val) {
								if (unitVal == val.Unit && villageType.isMatch(val.VillageType)) {
									send -= Math.ceil(units.snob * (val.Population / world_data.unitsSize['unit_' + unitVal]));
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
			createRallyPointScript(linksContainer, ["spy"], trans.sp.place.attackLinkNames.scout + v, 0, function (amount, v, tag) {
				return tag;
			}, v);
		}
	});
}

if (units.snob > 0 && user_data.place.attackLinks.noblePlaceLink) {
	createRallyPointScript(linksContainer, world_data.units, trans.sp.place.attackLinkNames.nobleMax, 0, function (amount, v, tag) {
		if (v == 'snob') {
			return 1;
		}
		if (tag > 0) {
			var returned = null;
			$.each(user_data.place.attackLinks.nobleSupport, function (i, val) {
				if (v == val.Unit && villageType.isMatch(val.VillageType)) {
					returned = amount - Math.ceil((tag - 1) * (val.Population / world_data.unitsSize['unit_' + v]));
				}
			});
			if (returned != null) {
				return returned;
			}
		}
		return amount;
	}, units.snob);

	if (units.snob > 1 || user_data.place.attackLinks.noblePlaceLinksForceShow) {
		createRallyPointScript(linksContainer, world_data.units, trans.sp.place.attackLinkNames.nobleMin, 0, function (amount, v, tag) {
			if (v == 'snob') {
				return 1;
			}
			var returned = 0;
			$.each(user_data.place.attackLinks.nobleSupport, function (i, val) {
				if (v == val.Unit && villageType.isMatch(val.VillageType)) {
					returned = Math.ceil(1 * (val.Population / world_data.unitsSize['unit_' + v]));
				}
			});
			return returned;
		});
	}

	if (units.snob > 0) {
		createRallyPointScript(linksContainer, world_data.units, trans.sp.place.attackLinkNames.nobleDivide, 0, function (amount, v, tag) {
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