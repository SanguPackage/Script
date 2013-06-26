var user_data_configs = [];

/*user_data_configs.push({
    id: "other",
    title: sangu_trans.other.title,
    save: function() { pers.set('sangusettings', JSON.stringify(user_data)); },
    properties: {
        proStyle: {
            tooltip: sangu_trans.other.proStyleTooltip,
            label: sangu_trans.other.proStyle,
            propUI: {
                getter: function() { return user_data.proStyle; },
                setter: function(value) { user_data.proStyle = value; },
                editor: "bool"
            }
        },
        farmLimitColors: {
            label: sangu_trans.other.farmLimitStackColors,
            propUI: {
                getter: function(propIndex) {
                    return user_data.farmLimit.stackColors;
                },
                setter: function(value, propIndex) { user_data.farmLimit.stackColors = value; },
                editor: "array:color"
            }
        }
    }
});*/

/*user_data_configs.push({
    id: "other",
    title: sangu_trans.other.title,
    save: function() { pers.set('sangusettings', JSON.stringify(user_data)); },
    properties: {
        farmLimitCombinedTest: {
            label: sangu_trans.other.farmLimitStackColors,
                propUI: {
                getter: function() {
                    return user_data.farmLimit.test;
                },
                setter: function(value) {
                    user_data.farmLimit.test = value;
                },
                editor: "color+number"
            }
        },
        farmLimitColorsCombined: {
         label: sangu_trans.other.farmLimitStackColors,
         propUI: {
         getter: function() { return user_data.farmLimit.stacksConfig; },
         setter: function(value) { user_data.farmLimit.stacksConfig = value; },
         editor: "array|addNew:color+number|delete"
         }
         }
    }
});*/


/*
user_data_configs.push({
    id: "global",
    title: sangu_trans.global.title,
    save: function() { pers.set('sangusettings', JSON.stringify(user_data)); },
    properties: {
        resourcesTitle: {
            type: "subtitle",
            label: sangu_trans.global.resources.title
        },
        resourcesActivate: {
            label: sangu_trans.global.resources.activate,
            propUI: {
                getter: function() { return user_data.global.resources.active; },
                setter: function(value) { user_data.global.resources.active = value; },
                editor: "bool"
            }
        },
        resourceColors: {
            label: sangu_trans.global.resources.colors,
            propUI: {
                getter: function() { return user_data.global.resources.backgroundColors; },
                setter: function(value) { user_data.global.resources.backgroundColors = value; },
                editor: "array|inline:color"
            }
        },
        resourcesBlinkWhenFull: {
            label: sangu_trans.global.resources.blinkWhenStorageFull,
            propUI: {
                getter: function() { return user_data.global.resources.blinkWhenStorageFull; },
                setter: function(value) { user_data.global.resources.blinkWhenStorageFull = value; },
                editor: "bool"
            }
        },
        incomingsTitle: {
            type: "subtitle",
            label: sangu_trans.global.incomingsTitle
        },
        incomingsEditLinks: {
            label: sangu_trans.global.incomingsEditLinks,
            tooltip: sangu_trans.global.incomingsEditLinksTooltip,
            propUI: {
                getter: function() { return user_data.global.incomings.editLinks; },
                setter: function(value) { user_data.global.incomings.editLinks = value; },
                editor: "bool"
            }
        },
        incomingsTrack: {
            label: sangu_trans.global.incomingsTrack,
            propUI: {
                getter: function() { return user_data.global.incomings.track; },
                setter: function(value) { user_data.global.incomings.track = value; },
                editor: "bool"
            }
        },
        jumperTitle: {
            type: "subtitle",
            label: sangu_trans.global.jumperTitle
        },
        jumperActivate: {
            label: trans.sp.sp.settings.activate,
            propUI: {
                getter: function() { return user_data.jumper.enabled; },
                setter: function(value) { user_data.jumper.enabled = value; },
                editor: "bool"
            }
        },
        jumperAutoOpen: {
            label: sangu_trans.global.jumperAutoOpen,
            propUI: {
                getter: function() { return user_data.jumper.autoShowInputbox; },
                setter: function(value) { user_data.jumper.autoShowInputbox = value; },
                editor: "bool"
            }
        },
        colorsTitle: {
            type: "subtitle",
            label: sangu_trans.global.colorsTitle
        },
        colorsError: {
            label: sangu_trans.global.colorsError,
            propUI: {
                getter: function() { return user_data.colors.error; },
                setter: function(value) { user_data.colors.error = value; },
                editor: "color"
            }
        },
        colorsGood: {
            label: sangu_trans.global.colorsGood,
            propUI: {
                getter: function() { return user_data.colors.good; },
                setter: function(value) { user_data.colors.good = value; },
                editor: "color"
            }
        },
        colorsNeutral: {
            label: sangu_trans.global.colorsNeutral,
            propUI: {
                getter: function() { return user_data.colors.neutral; },
                setter: function(value) { user_data.colors.neutral = value; },
                editor: "color"
            }
        },
        colorsSpecial: {
            label: sangu_trans.global.colorsSpecial,
            propUI: {
                getter: function() { return user_data.colors.special; },
                setter: function(value) { user_data.colors.special = value; },
                editor: "color"
            }
        },
        otherSettingsTitle: {
            type: "subtitle",
            label: sangu_trans.global.otherSettingsTitle
        },
        visualizeFriends: {
            label: sangu_trans.global.visualizeFriends,
            propUI: {
                getter: function() { return user_data.global.visualizeFriends; },
                setter: function(value) { user_data.global.visualizeFriends = value; },
                editor: "bool"
            }
        }
    }
});




user_data_configs.push({
    id: "main",
    title: sangu_trans.main.title,
    save: function() { pers.set('sangusettings', JSON.stringify(user_data)); },
    properties: {
        villageNames: {
            tooltip: sangu_trans.main.villageNamesTooltip,
            label: sangu_trans.main.villageNames,
            propUI: {
                getter: function() { return user_data.main.villageNames; },
                setter: function(value) { user_data.main.villageNames = value; },
                editor: "array|addNew:text|delete"
            }
        },
        villageNameClick: {
            tooltip: sangu_trans.main.villageNameClickTooltip,
            label: sangu_trans.main.villageNameClick,
            propUI: {
                getter: function() { return user_data.main.villageNameClick; },
                setter: function(value) { user_data.main.villageNameClick = value; },
                editor: "bool"
            }
        },
        ajaxLoyalty: {
            label: sangu_trans.main.ajaxLoyalty,
            show: server_settings.ajaxAllowed,
            propUI: {
                getter: function() { return user_data.main.ajaxLoyalty; },
                setter: function(value) { user_data.main.ajaxLoyalty = value; },
                editor: "bool"
            }
        }
    }
});



user_data_configs.push({
    id: "incoming",
    title: sangu_trans.incoming.title,
    save: function() { pers.set('sangusettings', JSON.stringify(user_data)); },
    properties: {
        autoOpenTagger: {
            label: sangu_trans.incoming.autoOpenTagger,
            propUI: {
                getter: function() { return user_data.incoming.autoOpenTagger; },
                setter: function(value) { user_data.incoming.autoOpenTagger = value; },
                editor: "bool"
            }
        },
        forceOpenTagger: {
            label: sangu_trans.incoming.forceOpenTagger,
            propUI: {
                getter: function() { return user_data.incoming.forceOpenTagger; },
                setter: function(value) { user_data.incoming.forceOpenTagger = value; },
                editor: "bool"
            }
        },
        renameInputTexbox: {
            label: sangu_trans.incoming.renameInputTexbox,
            tooltip: sangu_trans.incoming.renameInputTexboxTooltip,
            propUI: {
                getter: function() { return user_data.incoming.renameInputTexbox; },
                setter: function(value) { user_data.incoming.renameInputTexbox = value; },
                editor: "text"
            }
        },
        invertSort: {
            label: sangu_trans.incoming.invertSort,
            tooltip: sangu_trans.incoming.invertSortTooltip,
            propUI: {
                getter: function() { return user_data.incoming.invertSort; },
                setter: function(value) { user_data.incoming.invertSort = value; },
                editor: "bool"
            }
        }
    }
});

user_data_configs.push({
    id: "mainTagger",
    title: sangu_trans.mainTagger.title,
    save: function() { pers.set('sangusettings', JSON.stringify(user_data)); },
    properties: {
        activate: {
            label: sangu_trans.global.resources.activate,
            propUI: {
                getter: function() { return user_data.mainTagger.active; },
                setter: function(value) { user_data.mainTagger.active = value; },
                editor: "bool"
            }
        },
        autoOpen: {
            label: sangu_trans.mainTagger.autoOpen,
            propUI: {
                getter: function() { return user_data.mainTagger.autoOpen; },
                setter: function(value) { user_data.mainTagger.autoOpen = value; },
                editor: "bool"
            }
        },
        inputBoxWidth: {
            label: sangu_trans.mainTagger.inputBoxWidth,
            propUI: {
                getter: function() { return user_data.mainTagger.inputBoxWidth; },
                setter: function(value) { user_data.mainTagger.inputBoxWidth = value; },
                editor: "number|step=5"
            }
        },
        autoOpenCommands: {
            label: sangu_trans.mainTagger.autoOpenCommands,
            propUI: {
                getter: function() { return user_data.mainTagger.autoOpenCommands; },
                setter: function(value) { user_data.mainTagger.autoOpenCommands = value; },
                editor: "bool"
            }
        },
        minutesDisplayDodgeTimeOnMap: {
            label: sangu_trans.mainTagger.minutesDisplayDodgeTimeOnMap,
            tooltip: sangu_trans.mainTagger.minutesDisplayDodgeTimeOnMapTooltip,
            propUI: {
                getter: function() { return user_data.mainTagger.minutesDisplayDodgeTimeOnMap; },
                setter: function(value) { user_data.mainTagger.minutesDisplayDodgeTimeOnMap = value; },
                editor: "number"
            }
        },
            minutesWithoutAttacksDottedLine: {
            label: sangu_trans.mainTagger.minutesWithoutAttacksDottedLine,
            propUI: {
                getter: function() { return user_data.mainTagger.minutesWithoutAttacksDottedLine; },
                setter: function(value) { user_data.mainTagger.minutesWithoutAttacksDottedLine = value; },
                editor: "number|step=60"
            }
        },
        colorSupport: {
            label: sangu_trans.mainTagger.colorSupport,
            propUI: {
                getter: function() { return user_data.mainTagger.colorSupport; },
                setter: function(value) { user_data.mainTagger.colorSupport = value; },
                editor: "color"
            }
        },
        defaultDescription: {
            label: sangu_trans.mainTagger.defaultDescription,
            propUI: {
                getter: function() { return user_data.mainTagger.defaultDescription; },
                setter: function(value) { user_data.mainTagger.defaultDescription = value; },
                editor: "text"
            }
        }




    }
});

user_data_configs.push({
    id: "confirm",
    title: sangu_trans.confirm.title,
    save: function() { pers.set('sangusettings', JSON.stringify(user_data)); },
    properties: {
        addExtraOkButton: {
            label: sangu_trans.confirm.addExtraOkButton,
            propUI: {
                getter: function() { return user_data.confirm.addExtraOkButton; },
                setter: function(value) { user_data.confirm.addExtraOkButton = value; },
                editor: "bool"
            }
        },
        replaceNightBonus: {
            label: sangu_trans.confirm.replaceNightBonus,
            show: world_config.nightbonus.active,
            propUI: {
                getter: function() { return user_data.confirm.replaceNightBonus; },
                setter: function(value) { user_data.confirm.replaceNightBonus = value; },
                editor: "bool"
            }
        },
        replaceTribeClaim: {
            label: sangu_trans.confirm.replaceTribeClaim,
            propUI: {
                getter: function() { return user_data.confirm.replaceTribeClaim; },
                setter: function(value) { user_data.confirm.replaceTribeClaim = value; },
                editor: "bool"
            }
        },
        addCatapultImages: {
            label: sangu_trans.confirm.addCatapultImages,
            propUI: {
                getter: function() { return user_data.confirm.addCatapultImages; },
                setter: function(value) { user_data.confirm.addCatapultImages = value; },
                editor: "bool"
            }
        }
    }
});
*/

user_data_configs.push({
    id: "profile",
    title: sangu_trans.profile.title,
    save: function() { pers.set('sangusettings', JSON.stringify(user_data)); },
    properties: {
        show: {
            label: sangu_trans.global.resources.activate,
            propUI: {
                getter: function() { return user_data.profile.show; },
                setter: function(value) { user_data.profile.show = value; },
                editor: "bool"
            }
        },
        moveClaim: {
            label: sangu_trans.profile.moveClaim,
            propUI: {
                getter: function() { return user_data.profile.moveClaim; },
                setter: function(value) { user_data.profile.moveClaim = value; },
                editor: "bool"
            }
        },
        mapLink: {
            type: "subtitle",
            label: sangu_trans.profile.mapLink.title
        },
        mapLinkShow: {
            label: sangu_trans.global.resources.activate,
            propUI: {
                getter: function() { return user_data.profile.mapLink.show; },
                setter: function(value) { user_data.profile.mapLink.show = value; },
                editor: "bool"
            }
        },
        mapLinkFill: {
            label: sangu_trans.profile.mapLink.fill,
            propUI: {
                getter: function() { return user_data.profile.mapLink.fill; },
                setter: function(value) { user_data.profile.mapLink.fill = value; },
                editor: "color"
            }
        },
        mapLinkZoom: {
            label: sangu_trans.profile.mapLink.zoom,
            propUI: {
                getter: function() { return user_data.profile.mapLink.zoom; },
                setter: function(value) { user_data.profile.mapLink.zoom = value; },
                editor: "number|step=10"
            }
        },
        mapLinkGrid: {
            label: sangu_trans.profile.mapLink.grid,
            propUI: {
                getter: function() { return user_data.profile.mapLink.grid; },
                setter: function(value) { user_data.profile.mapLink.grid = value; },
                editor: "bool"
            }
        },
        mapLinkGridContinentNumbers: {
            label: sangu_trans.profile.mapLink.gridContinentNumbers,
            propUI: {
                getter: function() { return user_data.profile.mapLink.gridContinentNumbers; },
                setter: function(value) { user_data.profile.mapLink.gridContinentNumbers = value; },
                editor: "bool"
            }
        },
        mapLinkPlayerColor: {
            label: sangu_trans.profile.mapLink.playerColor,
            propUI: {
                getter: function() { return user_data.profile.mapLink.playerColor; },
                setter: function(value) { user_data.profile.mapLink.playerColor = value; },
                editor: "color"
            }
        },
        mapLinkTribeColor: {
            label: sangu_trans.profile.mapLink.tribeColor,
            propUI: {
                getter: function() { return user_data.profile.mapLink.tribeColor; },
                setter: function(value) { user_data.profile.mapLink.tribeColor = value; },
                editor: "color"
            }
        },
        mapLinkCentreX: {
            label: sangu_trans.profile.mapLink.centreX,
            propUI: {
                getter: function() { return user_data.profile.mapLink.centreX; },
                setter: function(value) { user_data.profile.mapLink.centreX = value; },
                editor: "number|step=10"
            }
        },
        mapLinkCentreY: {
            label: sangu_trans.profile.mapLink.centreY,
            propUI: {
                getter: function() { return user_data.profile.mapLink.centreY; },
                setter: function(value) { user_data.profile.mapLink.centreY = value; },
                editor: "number|step=10"
            }
        },
        mapLinkOwnColor: {
            label: sangu_trans.profile.mapLink.ownColor,
            propUI: {
                getter: function() { return user_data.profile.mapLink.ownColor; },
                setter: function(value) { user_data.profile.mapLink.ownColor = value; },
                editor: "color"
            }
        },
        mapLinkMarkedOnly: {
            label: sangu_trans.profile.mapLink.markedOnly,
            propUI: {
                getter: function() { return user_data.profile.mapLink.markedOnly; },
                setter: function(value) { user_data.profile.mapLink.markedOnly = value; },
                editor: "bool"
            }
        },
        mapLinkBigMarkers: {
            label: sangu_trans.profile.mapLink.bigMarkers,
            propUI: {
                getter: function() { return user_data.profile.mapLink.bigMarkers; },
                setter: function(value) { user_data.profile.mapLink.bigMarkers = value; },
                editor: "bool"
            }
        },
        mapLinkYourTribeColor: {
            label: sangu_trans.profile.mapLink.yourTribeColor,
            propUI: {
                getter: function() { return user_data.profile.mapLink.yourTribeColor; },
                setter: function(value) { user_data.profile.mapLink.yourTribeColor = value; },
                editor: "color"
            }
        }
    }
});

/*
user_data_configs.push({
    id: "overviewsTroops",
    title: sangu_trans.overviews.command.title,
    save: function() { pers.set('sangusettings', JSON.stringify(user_data)); },
    properties: {
        changeTroopsOverviewLink: {
            label: sangu_trans.overviews.command.changeTroopsOverviewLink,
            propUI: {
                getter: function() { return user_data.command.changeTroopsOverviewLink; },
                setter: function(value) { user_data.command.changeTroopsOverviewLink = value; },
                editor: "bool"
            }
        },
        filterAutoSort: {
            label: sangu_trans.overviews.command.filterAutoSort,
            propUI: {
                getter: function() { return user_data.command.filterAutoSort; },
                setter: function(value) { user_data.command.filterAutoSort = value; },
                editor: "bool"
            }
        },
        filterMinPopulation: {
            label: sangu_trans.overviews.command.filterMinPopulation,
            propUI: {
                getter: function() { return user_data.command.filterMinPopulation; },
                setter: function(value) { user_data.command.filterMinPopulation = value; },
                editor: "number|step=1000"
            }
        },
        commandTitle: {
            type: "subtitle",
            label: sangu_trans.overviews.command.filterOnUnitTypeSeperator
        },
        filterMinDefaultType: {
            label: sangu_trans.overviews.command.filterMinDefaultType,
            propUI: {
                getter: function() { return user_data.command.filterMinDefaultType; },
                setter: function(value) { user_data.command.filterMinDefaultType = value; },
                editor: "unit"
            }
        },
        filterMinDefault: {
            label: sangu_trans.overviews.command.filterMinDefault,
            tooltip: sangu_trans.overviews.command.filterMinDefaultTooltip,
            propUI: {
                getter: function() { return user_data.command.filterMinDefault; },
                setter: function(value) { user_data.command.filterMinDefault = value; },
                editor: "number|step=100"
            }
        },
        filterMinSpear: {
            label: sangu_trans.overviews.command.filterMin.replace("{unitName}", trans.tw.units.names.spear),
            propUI: {
                getter: function() { return user_data.command.filterMin.spear; },
                setter: function(value) { user_data.command.filterMin.spear = value; },
                editor: "number|step=500"
            }
        },
        filterMinSword: {
            label: sangu_trans.overviews.command.filterMin.replace("{unitName}", trans.tw.units.names.sword),
            propUI: {
                getter: function() { return user_data.command.filterMin.sword; },
                setter: function(value) { user_data.command.filterMin.sword = value; },
                editor: "number|step=500"
            }
        },
        filterMinAxe: {
            label: sangu_trans.overviews.command.filterMin.replace("{unitName}", trans.tw.units.names.axe),
            propUI: {
                getter: function() { return user_data.command.filterMin.axe; },
                setter: function(value) { user_data.command.filterMin.axe = value; },
                editor: "number|step=500"
            }
        },
        filterMinArcher: {
            label: sangu_trans.overviews.command.filterMin.replace("{unitName}", trans.tw.units.names.archer),
            show: world_config.hasArchers,
            propUI: {
                getter: function() { return user_data.command.filterMin.archer; },
                setter: function(value) { user_data.command.filterMin.archer = value; },
                editor: "number|step=500"
            }
        },
        filterMinSpy: {
            label: sangu_trans.overviews.command.filterMin.replace("{unitName}", trans.tw.units.names.spy),
            propUI: {
                getter: function() { return user_data.command.filterMin.spy; },
                setter: function(value) { user_data.command.filterMin.spy = value; },
                editor: "number|step=100"
            }
        },
        filterMinLight: {
            label: sangu_trans.overviews.command.filterMin.replace("{unitName}", trans.tw.units.names.light),
            propUI: {
                getter: function() { return user_data.command.filterMin.light; },
                setter: function(value) { user_data.command.filterMin.light = value; },
                editor: "number|step=100"
            }
        },
        filterMinMarcher: {
            label: sangu_trans.overviews.command.filterMin.replace("{unitName}", trans.tw.units.names.marcher),
            show: world_config.hasArchers,
            propUI: {
                getter: function() { return user_data.command.filterMin.marcher; },
                setter: function(value) { user_data.command.filterMin.marcher = value; },
                editor: "number|step=100"
            }
        },
        filterMinHeavy: {
            label: sangu_trans.overviews.command.filterMin.replace("{unitName}", trans.tw.units.names.heavy),
            propUI: {
                getter: function() { return user_data.command.filterMin.heavy; },
                setter: function(value) { user_data.command.filterMin.heavy = value; },
                editor: "number|step=100"
            }
        },
        filterMinRam: {
            label: sangu_trans.overviews.command.filterMin.replace("{unitName}", trans.tw.units.names.ram),
            propUI: {
                getter: function() { return user_data.command.filterMin.ram; },
                setter: function(value) { user_data.command.filterMin.ram = value; },
                editor: "number|step=10"
            }
        },
        filterMinCatapult: {
            label: sangu_trans.overviews.command.filterMin.replace("{unitName}", trans.tw.units.names.catapult),
            propUI: {
                getter: function() { return user_data.command.filterMin.catapult; },
                setter: function(value) { user_data.command.filterMin.catapult = value; },
                editor: "number|step=10"
            }
        },
        filterMinSnob: {
            label: sangu_trans.overviews.command.filterMin.replace("{unitName}", trans.tw.units.names.snob),
            propUI: {
                getter: function() { return user_data.command.filterMin.snob; },
                setter: function(value) { user_data.command.filterMin.snob = value; },
                editor: "number"
            }
        },
        filterMinOther: {
            label: sangu_trans.overviews.command.filterMinOther,
            propUI: {
                getter: function() { return user_data.command.filterMinOther; },
                setter: function(value) { user_data.command.filterMinOther = value; },
                editor: "number|step=500"
            }
        },
        restackTitle: {
            type: "subtitle",
            label: sangu_trans.overviews.troopsRestack.title
        },
        troopsRestackTo: {
            label: sangu_trans.overviews.troopsRestack.to,
            propUI: {
                getter: function() { return user_data.restack.to; },
                setter: function(value) { user_data.restack.to = value; },
                editor: "number|step=1000"
            }
        },
        requiredDifference: {
            label: sangu_trans.overviews.troopsRestack.requiredDifference,
            propUI: {
                getter: function() { return user_data.restack.requiredDifference; },
                setter: function(value) { user_data.restack.requiredDifference = value; },
                editor: "number"
            }
        },
        fieldsDistanceFilterDefault: {
            label: sangu_trans.overviews.troopsRestack.fieldsDistanceFilterDefault,
            propUI: {
                getter: function() { return user_data.restack.fieldsDistanceFilterDefault; },
                setter: function(value) { user_data.restack.fieldsDistanceFilterDefault = value; },
                editor: "number"
            }
        },
        filterReverse: {
            label: sangu_trans.overviews.troopsRestack.filterReverse,
            tooltip: sangu_trans.overviews.troopsRestack.filterReverseTooltip,
            propUI: {
                getter: function() { return user_data.restack.filterReverse; },
                setter: function(value) { user_data.restack.filterReverse = value; },
                editor: "bool"
            }
        },
        defaultPopulationFilterAmount: {
            label: sangu_trans.overviews.troopsRestack.defaultPopulationFilterAmount,
            propUI: {
                getter: function() { return user_data.restack.defaultPopulationFilterAmount; },
                setter: function(value) { user_data.restack.defaultPopulationFilterAmount = value; },
                editor: "number|step=1000"
            }
        }
    }
});

user_data_configs.push({
    id: "overviewsCommands",
    title: sangu_trans.overviews.commands.title,
    save: function() { pers.set('sangusettings', JSON.stringify(user_data)); },
    properties: {
        sumRow: {
            label: sangu_trans.overviews.commands.sumRow,
            propUI: {
                getter: function() { return user_data.command.sumRow; },
                setter: function(value) { user_data.command.sumRow = value; },
                editor: "bool"
            }
        },
        filterFakeMaxPop: {
            label: sangu_trans.overviews.commands.filterFakeMaxPop,
            propUI: {
                getter: function() { return user_data.command.filterFakeMaxPop; },
                setter: function(value) { user_data.command.filterFakeMaxPop = value; },
                editor: "number|step=100"
            }
        },
        requiredTroopAmount: {
            label: sangu_trans.overviews.commands.requiredTroopAmount,
            propUI: {
                getter: function() { return user_data.command.bbCodeExport.requiredTroopAmount; },
                setter: function(value) { user_data.command.bbCodeExport.requiredTroopAmount = value; },
                editor: "number|step=100"
            }
        }
    }
});

user_data_configs.push({
    id: "overviewsResources",
    title: sangu_trans.overviews.resources.title,
    save: function() { pers.set('sangusettings', JSON.stringify(user_data)); },
    properties: {
        requiredResDefault: {
            label: sangu_trans.overviews.resources.requiredResDefault,
            propUI: {
                getter: function() { return user_data.resources.requiredResDefault; },
                setter: function(value) { user_data.resources.requiredResDefault = value; },
                editor: "number|step=10000"
            }
        },
        requiredMerchants: {
            label: sangu_trans.overviews.resources.requiredMerchants,
            propUI: {
                getter: function() { return user_data.resources.requiredMerchants; },
                setter: function(value) { user_data.resources.requiredMerchants = value; },
                editor: "number|step=10"
            }
        },
        filterMerchants: {
            label: sangu_trans.overviews.resources.filterMerchants,
            propUI: {
                getter: function() { return user_data.resources.filterMerchants; },
                setter: function(value) { user_data.resources.filterMerchants = value; },
                editor: "bool"
            }
        },
        highlightColor: {
            label: sangu_trans.overviews.resources.highlightColor,
            propUI: {
                getter: function() { return user_data.resources.highlightColor; },
                setter: function(value) { user_data.resources.highlightColor = value; },
                editor: "color"
            }
        },
        filterRows: {
            label: sangu_trans.overviews.resources.filterRows,
            propUI: {
                getter: function() { return user_data.resources.filterRows; },
                setter: function(value) { user_data.resources.filterRows = value; },
                editor: "bool"
            }
        },
        bbcodeMinimumDiff: {
            label: sangu_trans.overviews.resources.bbcodeMinimumDiff,
            propUI: {
                getter: function() { return user_data.resources.bbcodeMinimumDiff; },
                setter: function(value) { user_data.resources.bbcodeMinimumDiff = value; },
                editor: "number|step=2000"
            }
        }
    }
});

// Buildingsoverview:
(function() {
    var properties = {},
        i;

    for (i = 0; i < world_data.buildings.length; i++) {
        (function() {
            var captured_index = i,
                building_name = world_data.buildings[captured_index];
            properties[building_name+'_min'] = {
                label: sangu_trans.overviews.buildings.minLevel.replace("{building}", building_name),
                propUI: {
                    getter: function() { return user_data.buildings[building_name][0]; },
                    setter: function(value) { user_data.buildings[building_name][0] = value; },
                    editor: "number"
                }
            };

            properties[building_name+'_max'] = {
                label: sangu_trans.overviews.buildings.maxLevel.replace("{building}", building_name),
                propUI: {
                    getter: function() { return user_data.buildings[building_name][1]; },
                    setter: function(value) { user_data.buildings[building_name][1] = value; },
                    editor: "number"
                }
            };
        })();
    }

    user_data_configs.push({
        id: "overviewsBuildings",
        title: sangu_trans.overviews.buildings.title,
        save: function() { pers.set('sangusettings', JSON.stringify(user_data)); },
        properties: properties
    });
})();

user_data_configs.push({
    id: "other",
    title: sangu_trans.other.title,
    save: function() { pers.set('sangusettings', JSON.stringify(user_data)); },
    properties: {
        fancyImages: {
            label: sangu_trans.overviews.addFancyImagesToOverviewLinks,
            propUI: {
                getter: function() { return user_data.overviews.addFancyImagesToOverviewLinks; },
                setter: function(value) { user_data.overviews.addFancyImagesToOverviewLinks = value; },
                editor: "bool"
            }
        },
        proStyle: {
            tooltip: sangu_trans.other.proStyleTooltip,
            label: sangu_trans.other.proStyle,
            propUI: {
                getter: function() { return user_data.proStyle; },
                setter: function(value) { user_data.proStyle = value; },
                editor: "bool"
            }
        },
        displayDays: {
            label: sangu_trans.other.displayDays,
            propUI: {
                getter: function() { return user_data.displayDays; },
                setter: function(value) { user_data.displayDays = value; },
                editor: "bool"
            }
        },
        calculateSnob: {
            label: sangu_trans.other.calculateSnob,
            show: !world_config.coins,
            propUI: {
                getter: function() { return user_data.other.calculateSnob; },
                setter: function(value) { user_data.other.calculateSnob = value; },
                editor: "bool"
            }
        },
        overviewLinks: {
            label: sangu_trans.other.overviewLinks,
            propUI: {
                getter: function() { return user_data.overviews.addFancyImagesToOverviewLinks; },
                setter: function(value) { user_data.overviews.addFancyImagesToOverviewLinks = value; },
                editor: "bool"
            }
        },
        showPlayerProfileOnVillage: {
            label: sangu_trans.other.showPlayerProfileOnVillage,
            propUI: {
                getter: function() { return user_data.showPlayerProfileOnVillage; },
                setter: function(value) { user_data.showPlayerProfileOnVillage = value; },
                editor: "bool"
            }
        },
        overviewAjaxSeperateSupport: {
            label: sangu_trans.other.ajaxSeperateSupport,
            show: server_settings.ajaxAllowed,
            propUI: {
                getter: function() { return user_data.overview.ajaxSeperateSupport; },
                setter: function(value) { user_data.overview.ajaxSeperateSupport = value; },
                editor: "bool"
            }
        },
        commandRenamerTitle: {
            type: "subtitle",
            label: sangu_trans.other.commandRenamer
        },
        commandRenamerActive: {
            label: sangu_trans.other.commandRenamerActive,
            propUI: {
                getter: function() { return user_data.attackAutoRename.active; },
                setter: function(value) { user_data.attackAutoRename.active = value; },
                editor: "bool"
            }
        },
        commandRenamerAddHaul: {
            label: sangu_trans.other.commandRenamerAddHaul,
            propUI: {
                getter: function() { return user_data.attackAutoRename.addHaul; },
                setter: function(value) { user_data.attackAutoRename.addHaul = value; },
                editor: "bool"
            }
        },
        farmLimitTitle: {
            type: "subtitle",
            label: sangu_trans.other.farmLimitTitle
        },
        farmLimitColors: {
            label: sangu_trans.other.farmLimitStackColors,
            propUI: {
                getter: function(propIndex) {
                    return user_data.farmLimit.stackColors;
                },
                setter: function(value, propIndex) { user_data.farmLimit.stackColors = value; },
                editor: "array|addNew:color|delete"
            }
        },
        farmLimitAcceptableOverstack: {
            label: sangu_trans.other.farmLimitAcceptableOverstack,
            tooltip: sangu_trans.other.farmLimitAcceptableOverstackTooltip.replace("{farmlimit}", 30 * world_config.farmLimit),
            show: world_config.farmLimit,
            propUI: {
                getter: function() { return user_data.farmLimit.acceptableOverstack; },
                setter: function(value) { user_data.farmLimit.acceptableOverstack = value; },
                editor: "array|addNew:float|delete|step=0.01"
            }
        },
        farmLimitUnlimitedStack: {
            label: sangu_trans.other.farmLimitUnlimitedStack,
            show: !world_config.farmLimit,
            propUI: {
                getter: function() { return user_data.farmLimit.unlimitedStack; },
                setter: function(value) { user_data.farmLimit.unlimitedStack = value; },
                editor: "array|addNew:number|delete|step=1000"
            }
        },
        villageInfoTitle: {
            type: "subtitle",
            label: sangu_trans.villageInfo.title
        },
        villageInfoActive: {
            label: sangu_trans.global.resources.activate,
            propUI: {
                getter: function() { return user_data.villageInfo.active; },
                setter: function(value) { user_data.villageInfo.active = value; },
                editor: "bool"
            }
        },
        villageInfooff_linkName: {
            label: sangu_trans.villageInfo.off_linkName,
            propUI: {
                getter: function() { return user_data.villageInfo.off_linkName; },
                setter: function(value) { user_data.villageInfo.off_linkName = value; },
                editor: "text|width=75"
            }
        },
        villageInfooff_link: {
            label: sangu_trans.villageInfo.off_link,
            propUI: {
                getter: function() { return user_data.villageInfo.off_link; },
                setter: function(value) { user_data.villageInfo.off_link = value; },
                editor: "text|width=75"
            }
        },
        villageInfodef_linkName: {
            label: sangu_trans.villageInfo.def_linkName,
            propUI: {
                getter: function() { return user_data.villageInfo.def_linkName; },
                setter: function(value) { user_data.villageInfo.def_linkName = value; },
                editor: "text|width=75"
            }
        },
        villageInfodef_link: {
            label: sangu_trans.villageInfo.def_link,
            propUI: {
                getter: function() { return user_data.villageInfo.def_link; },
                setter: function(value) { user_data.villageInfo.def_link = value; },
                editor: "text|width=75"
            }
        }
    }
});

*/