// Configure the Sangu Package

/*
user_data = pers.get('sangusettings');
if (user_data !== '') {
    user_data = JSON.parse(user_data);

} else {*/
    user_data = {
        proStyle: true,
        displayDays: false, /* true: display (walking)times in days when > 24 hours. false: always displays in hours */
        walkingTimeDisplay: "{duration} || {arrival}",

        colors: {
            error: "#FF6347",
            good: "#32CD32",
            special: "#00FFFF",
            neutral: "#DED3B9"
        },

        global: {
            resources: {
                active: true, /* All pages: true/false: color the resources based on how much the storage is filled */
                backgroundColors: ['#ADFF2F', '#7FFF00', '#32CD32', '#3CB371', '#228B22', '#FFA500', '#FF7F50', '#FF6347', '#FF4500', '#FF0000'], /* All pages: Colors used for the previous setting. First is least filled, last is most filled storage place */
                blinkWhenStorageFull: true /* All pages: Blink the resources if the storage is full */
            },
            incomings: {
                editLinks: true, /* All pages: Edit the incoming attacks/support links: add "show all groups" and "show all pages" to the original links */
                track: true,
                indicator: "({current} <small>{difference}</small>)",
                indicatorTooltip: "Laatste tijdcheck: {elapsed} geleden",
                lastTimeCheckWarningMore: "{difference} nieuwe aanvallen. Laatste tijdcheck: {elapsed} geleden",
                lastTimeCheckWarningLess: "{difference} aanvallen minder. Laatste tijdcheck: {elapsed} geleden"
            },
            visualizeFriends: true,
            duplicateLogoffLink: false
        },

        scriptbar: {
            editBoxCols: 700,
            editBoxRows: 12
        },

        main: {
            villageNames: [], /* Add village names to the village headquarters to quickly edit the village name to a preset name. Set to [] or null to disable, for 1 village name use ['MyVillageName'] or for more names: ['name1', 'name2', 'name3'] */
            villageNameClick: true, /* true: one of the previous button clicked automatically changes the village name. false: only fills in the name in the textbox but does not click the button */
            ajaxLoyalty: true /* Get the loyalty at the building construction/destruction page */
        },

        other: {
            calculateSnob: true, /* nobles: calculates how many nobles can be produced immediately */
            reportPublish: ["own_units", "own_losses", "opp_units", "opp_losses", "carry", "buildings", "own_coords", "opp_coords", "belief"] /* Publishing report: automatically check the 'show' checkboxes */
        },

        market: {
            resizeImage: true,
            autoFocus: true
        },

        farmLimit: {
            stackColors: ['#DED3B9', '#3CB371', '#FF6347'],
            acceptableOverstack: [0.5, 1.2, 1.35], /* Different pages: % of acceptable overstack (only relevant for farmlimit worlds) */
            unlimitedStack: [24000, 60000, 100000] /* Different pages: Calculate stacks based on total troops (for non farmlimit worlds) */
        },

        command: { /* features for the own troops overview page */
            changeTroopsOverviewLink: true, /* Change the link to the own troops overview */
            middleMouseClickDeletesRow2: false, /* Let the new default overwrite the old one */

            filterMinPopulation: 18000, /* Default number filled in to filter on village stack */
            filterMinDefaultType: 'axe', /* This unit type is by default selected in the filter dropdown */
            filterMinDefault: 5000, /* The default number filled in to filter on troop amounts */
            filterMin: { axe: 7000, spear: 3000, archer: 3000, heavy: 500, catapult: 50, spy: 50, light: 2000, marcher: 2000, ram: 1, catapult: 50, snob: 2 }, /* Default filter numbers for the other units */
            filterMinOther: 5000, /* Use this number as the default when the unit is not present in filterMin */
            filterAutoSort: true, /* Automatically sort the list on walking distance when entering a target village */

            /* These features apply to the commands overview page */
			sumRow: true, /* Add a totalrow between different villages */
            filterFakeMaxPop: 300, /* Commands fake filter: Everything below 300 pop is considered a fake attack */
            bbCodeExport: { /* BB code export */
                requiredTroopAmount: 100
            }
        },

        incomings: {
            attackIdDescriptions: [
                {minValue: 10, text: "&nbsp;"},
                {minValue: 50, text: "10-50"},
                {minValue: 100, text: "50-100"},
                {minValue: 200, text: "100-200"},
                {minValue: 500, text: "200-500"},
                {minValue: 1000, text: "500-1000"},
                {minValue: 5000, text: "1000-5000"}
            ],
            attackIdHigherDescription: "5000+"
        },


        overviews: {
            addFancyImagesToOverviewLinks: true
        },

        incoming: { /* Features for the built in TW tagger */
            autoOpenTagger: true, 		/* Open the tagger automatically if the incoming attack has not yet been renamed */
            forceOpenTagger: true, 	/* Always open the tagger automatically */
            renameInputTexbox: "{unit} ({xy}) {player} F{fields}{night}", /* Possibilities: {id}:internal tw attack id {unit}: short unitname {xy}: coordinates {player} {village}: full village name {c}: continent. Set to "" to disable. */
            villageBoxSize: 600, 			/* Adjust the width of the table with the village information (support for 2-click) */
            invertSort: true		/* true=noblemen at the top and scouts at the bottom of the table */
        },

        overview: { /* The default village overview page */
            ajaxSeperateSupport: true, /* Village overview: Seperate own and supported troops */
            ajaxSeperateSupportStacks: true, /* Village overview: Calculate stacks for own and supported troops */
            canHideDiv: true
        },

        mainTagger: {
            active: true,
            autoOpen: true,
            inputBoxWidth: 300,
            defaultDescription: "OK",
            otherDescs:
                [
                    { active: true, name: "Dodgen", renameTo: "----------------------------------------- DODGE THIS" },
                    { active: true, name: "Nacht", renameTo: "NIGHTBONUS" },
                    { active: true, name: "Check stack", renameTo: "----------------------------------------- CHECK STACK" },
                    { active: true, name: "Timen!", renameTo: "***************************************** TIME IT!" },
                    { active: true, name: "Edelen!", renameTo: "----------------------------------------- NOBLE!!" },
                    { active: false, name: "Leeg1", renameTo: "It has to be, automatically" },
                    { active: false, name: "Leeg2", renameTo: "Check it out, you'd better work it out" },
                    { active: false, name: "Leeg3", renameTo: "Change to another route" },
                    { active: false, name: "Leeg4", renameTo: "My techniques, strategies, abilities" }
                ],
            autoOpenCommands: false,
            minutesDisplayDodgeTimeOnMap: 3,
            minutesWithoutAttacksDottedLine: 3 * 60,
            colorSupport: '#FFF5DA' /* Main village overview: give incoming support a different background color */
        },

        villageInfo4: [
            {
                /* On info_village page add extra link to attack. */
                active: true,
                off_link: {
                    name: "Aanvalleuh!",
                    group: 0,
                    filter: {
                        active: true,
                        unit: "axe",
                        amount: 5000
                    },
                    sort: true,
                    changeSpeed: "ram",
                    icon: "graphic/unit/unit_knight.png"
                },
                def_link: {
                    name: "Verdedigen!",
                    group: 0,
                    filter: {
                        active: true,
                        unit: "spear",
                        amount: 4000
                    },
                    sort: true,
                    changeSpeed: "spear",
                    icon: "graphic/command/support.png"
                }
            },
            {
                /* On info_village page add extra link to attack. */
                active: false,
                off_link: {
                    name: "&raquo; off2",
                    group: 0,
                    filter: {
                        active: false,
                        unit: "axe",
                        amount: 4000
                    },
                    sort: true,
                    changeSpeed: "ram"
                },
                def_link: {
                    name: "&raquo; Snelle Os!",
                    group: 0,
                    filter: {
                        active: true,
                        unit: "spear",
                        amount: 1000
                    },
                    sort: true,
                    changeSpeed: "spear"
                }
            }
        ],

        resources: {
            requiredResDefault: 250000,
            requiredMerchants: 50,
            filterMerchants: true,
            filterRows: false,
            bbcodeMinimumDiff: 50000,
			highlightColor: "#FF7F27"
        },

        jumper: {
            enabled: true,
            autoShowInputbox: false
        },

        attackAutoRename: {
            active: true,
            addHaul: false
        },

        confirm: {
            addExtraOkButton: false,
            replaceNightBonus: true,
            replaceTribeClaim: true,
            addCatapultImages: true
        },

        place: {
            attackLinks: {
                scoutVillage: 100,
                scoutPlaceLinks: [5, 100, 500],
				scoutPlaceLinksName: "Scout{amount}",
				
                fakePlaceLink: true,
                fakePlaceExcludeTroops: [],
				fakePlaceLinkName: "Fake",
				
                noblePlaceLink: true, /* (de)Activate all noble links */
				noblePlaceLinkFirstName: "NobleFirst", /* Name for the first noble which has most troops */
				
				noblePlaceLinkSupportName: "NobleMin", /* snob with only minimal support */
				noblePlaceLinksForceShow: true, /* Show NobleMin also where is only one 1 snob in the village */
				nobleSupport: [
					{ amount: 50, unit: 'light', villageType: 'off' }, 
					{ amount: 50, unit: 'heavy', villageType: 'def'}
				],
				
				noblePlaceLinkDivideName: "NobleDivide",
                noblePlaceLinkDivideAddRam: false /* false: Rams are not sent along with NobleDivide */
            },
            customPlaceLinks:
                [
                    // use minus zero numbers to leave so many units at home
                    { active: true, type: 'def', name: 'AllDef', spear: 25000, heavy: 5000, archer: 25000, sword: 25000, sendAlong: 0 },
                    { active: true, type: 'def', name: '1/2-Zc', spear: 4000, heavy: 1000, sendAlong: 500 },
                    { active: true, type: 'off', name: 'Smart'/*, spear: 25000*/, sword: -10, axe: 25000, spy: 1, light: 5000/*, heavy: 5000*/, marcher: 5000, ram: 5000, catapult: 5000, sendAlong: 0 },
                    { active: true, type: 'off', name: 'Bijl', spear: 25000, axe: 25000, spy: 1, light: 5000, heavy: 5000, marcher: 5000, sendAlong: 0 },
                    { active: true, type: 'off', name: 'Zwaard', spear: 25000, sword: -10, axe: 25000, spy: 1, light: 5000, heavy: 5000, marcher: 5000, sendAlong: 0, required: ['sword', 1] },

                    { active: false, type: 'def', name: 'AlleDef', spear: 25000, sword: 25000, heavy: 5000, archer: 25000, sendAlong: 0 },
                    { active: false, type: 'def', name: '3deZc', spear: 2500, heavy: 650, sendAlong: 0 },
                    { active: false, type: 'def', name: '4deZc', spear: 2000, heavy: 500, sendAlong: 0 },
                    { active: false, type: 'def', name: 'HelftZw', spear: 5000, sword: 5000, sendAlong: 500 },
                    { active: false, type: 'def', name: '3deZw', spear: 3300, sword: 3300, sendAlong: 0 },
                    { active: false, type: 'def', name: '4deZw', spear: 2500, sword: 2500, sendAlong: 0 }
                ]
        },

        /**
         * units_support_detail: options on the 2 def troop overview pages
         * on bbcode restack - and others!!)
         */
        restack: {
            to: 72000,
            requiredDifference: 1000,
            fieldsDistanceFilterDefault: 30,
            filterReverse: true,
            autohideWithoutSupportAfterFilter: true,
            calculateDefTotalsAfterFilter: true,
            defaultPopulationFilterAmount: 80000, /* this isn't related to restack */
            removeRowsWithoutSupport: false
        },

        showPlayerProfileOnVillage: false,
        profile: {
            show: true,
            moveClaim: true,
            mapLink: { 
				show: true, 
				fill: '#000000', 
				zoom: '200', 
				grid: true, 
				playerColor: '#ffff00', 
				tribeColor: '#0000FF', 
				centreX: 500, 
				centreY: 500, 
				ownColor: '#FFFFFF', 
				markedOnly: true, 
				yourTribeColor: "#FF0000"
			},
            playerGraph: [["points", false], ["villages", false], ["od", false], ["oda", false], ["odd", false], ["rank", false]], // small / big / false
            tribeGraph: [["points", false], ["villages", false], ["od", false], ["oda", false], ["odd", false], ["rank", false], ["members", 'big', true]],
            twMapPlayerGraph: { player: [true, true], p_player: [false, false], oda_player: [true, false], odd_player: [true, false] },
            twMapTribeGraph: { tribe: [true, true], p_tribe: [false, false], oda_tribe: [true, false], odd_tribe: [true, false] },

            popup: { 
				show: true, 
				width: 900, 
				height: 865,
				left: 50,
				top: 50
			}
        },
        smithy:
            [
                ['offense', { spear: [3, 3], sword: [1, 1], axe: [3, 3], spy: [0, 0], light: [3, 3], heavy: [3, 3], ram: [2, 2], catapult: [0, 0]}],
                ['defense', { spear: [3, 3], sword: [1, 1], axe: [0, 3], spy: [0, 3], light: [0, 3], heavy: [3, 3], ram: [0, 1], catapult: [1, 3]}],
                ['catapult', { spear: [2, 3], sword: [1, 1], axe: [3, 3], spy: [0, 3], light: [2, 3], heavy: [3, 3], ram: [0, 0], catapult: [2, 3]}]
            ],
        buildings: {
            main: [20, 20],
            barracks: [25, 25],
            stable: [20, 20],
            garage: [1, 5],
            church: [0, 1],
            church_f: [0, 1],
            snob: [1, 3],
            smith: [20, 20],
            place: [1, 1],
            statue: [0, 1],
            market: [10, 20],
            wood: [30, 30],
            stone: [30, 30],
            iron: [30, 30],
            farm: [30, 30],
            storage: [30, 30],
            hide: [0, 10],
            wall: [20, 20]
        }
    };
//}

(function() {
    var saved_data = pers.get('sangusettings');
    if (saved_data !== '') {
        user_data = $.extend(true, user_data, JSON.parse(saved_data));
    }
}());