trans = {
	tw: {
		units: {
			names: { "spear": "Speer", "sword": "Zwaard", "archer": "Boog", "axe": "Bijl", "spy": "Verk", "light": "Lc", "marcher": "Bb", "heavy": "Zc", "ram": "Ram", "catapult": "Kata", "knight": "Ridder", "snob": "Edel" },
			shortNames: { "spear": "Sp", "sword": "Zw", "archer": "Boog", "axe": "Bijl", "spy": "Ver", "light": "Lc", "marcher": "Bb", "heavy": "Zc", "ram": "Ram", "catapult": "Kata", "knight": "Ridder", "snob": "Edel" },
			militia: "Militia"
		},
		all: {
			today: "vandaag om",
			tomorrow: "morgen om",
			dateOn: "op",
			timeOn: "om",
			farm: "Boerderij",
			wood: "Hout",
			iron: "IJzer",
			stone: "Leem",
			groups: "Groepen",
			continentPrefix: "C"
		},
		main: {
			toGraphicOverview: "naar het grafische dorpsoverzicht",
			loyaltyHeader: "Toestemming:"
		},
		command: {
			returnText: "Terugkeer",
			attack: "Aanval",
			support: "Ondersteuning",
			haul: "Buit:",
			abortedOperation: "Afgebroken commando",
			catapultTarget: "Katapultdoel:",
			buttonValue: "OK",
			attackOn: "Aanval op ",
			supportFor: "Ondersteuning voor ",
			walkingTimeTitle: "Duur:"
		},
		incoming: {
			defaultCommandName: "Bevel"
		},
		place: {
			troopMovements: "Troepenbewegingen"
		},
		market: {
			incomingTransports: "Binnenkomende transporten"
		},
		profile: {
			title: "Profiel",
			claimedBy: "Geclaimd door:",
			awardsWon: "Behaalde awards"
		},
		overview: {
			village: "Dorp",
			incomingTroops: "Aankomend"
		}
	},
	sp: {
		sp: {
            settings: {
                reset: "De standaard Sangu Package settings herstellen",
                resetAll: "Sangu Package 'fabrieksinstellingen' herstellen",
                configuration: "Configuratie",
                configurationFormTogglerTooltip: "Klik op de knoppen om de verschillende editeerschermen te openen",
                activate: "Activeer",
                deleteTooltip: "Verwijderen",
                addRecord: "&raquo; Toevoegen",
                exportSettings: "Instellingen exporteren",
                importSettings: "Instellingen importeren",
                importSettingsDesc: "Door de sangu instellingen te exporteren en elders opnieuw te importeren kan je de huidige sangu configuratie hergebruiken op een andere wereld of computer.",
                importSettingsSuccess: "Settings zijn geïmporteerd!",
                importError: "Het ziet er naar uit dat de geplakte tekst foutief is.",
                importErrorContinueAnyway: "Toch importeren?"
            },
            donate: {
                title: "Donatie",
                whyWouldI: "Als je op regelmatige basis functionaliteit van het Sangu Package gebruikt, dan is dat een goede reden om een donatie te doen."
                            + "<br><br>"
                            + "Jouw dankbaarheid en financiële steun helpen me motiveren verder te blijven werken aan het Sangu Package.",
                books: "Er staan ook een aantal zeer interessante JavaScript boeken op mijn {abegin}Amazon wishlist{aend}. Daarmee kan je me ook altijd een plezier doen :)",
                notable: "Een aantal personen hebben reeds een notabele donatie gedaan:",
                buttonAmount: "Doneer €{amount}",
                beer: "Trakteer me een biertje",
                food: "Een spaghetti voor Wouter! (of pizza!)",
                yaye: "Een nieuw IT boek voor mijn verzameling!"
            },
			configuration: "Sangu Package configureren (v{version})",
			activatePackage: "Sangu Package activeren",
			deactivatePackage: "Sangu Package deactiveren",
            packageCrashTitle: "Het Sangu Package is gecrasht :)",
            packageCrash:
                "<b>Foutmelding</b>: <i>{error}</i><br>"
                + "<b>Details</b>:<br>"
                + "<textarea cols='75' rows='20'>"
                + "Foutmelding: {error}\n"
                + "Pagina: {page}\n"
                + "Versie: {version}\n"
                + "{stacktrace}\n"
                + "</textarea>"
                + "<br><br>Je kan de bug <a href='{url}' target='_blank'>hier</a> melden."
                + "<br>Of je kan de bug <a href='mailto:{email}'>mailen</a>."
                + "<br><br><center><i>Een bug waarvan we niet weten dat ie bestaat zal ook niet gefixed worden!</i></center>"
                + "<br><center><b>Geef zoveel mogelijk informatie mee bij het sturen van een bugrapport!!!</b></center>",

			activatePackageWithCompatibility: "Sangu Package (v{version}) mogelijk incompatibel met huidige TW versie",
			firstTimeRun: "<b>Welkom!</b> Het Sangu Package is momenteel inactief. Klik op de nieuwe {img} naast de opslagplaats hierboven om het package aan en uit te schakelen.",
			removeScriptWarning: "Niet meer tonen"
		},
		all: {
			populationShort: "Pop",
			population: "Populatie",
			total: "Totaal",
			last: "Laatste",
			target: "Doel",
			targetEx: "Doelwit",
			more: "meer",
			less: "minder",
			all: "Alle",
			withText: "met",
			merchants: "Handelaren",
			tooMuch: "Teveel:",
			tooLittle: "Te weinig:",
			further: "verder",
			closer: "dichter",
			fieldsSuffix: "(F{0})"
		},
		main: {
			unitsReplacement: "Eigen",
			unitsOther: "Ondersteunende Eenheden",
			rallyPointTroops: "troepen",
			ownStackTitle: "Totale populatie van de eigen troepen",
			supportingStackTitle: "Totale populatie van de ondersteunende troepen"
		},
		map: {
			dodgeLastTagged: "Dodgetijd van de laatst getagde aanval"
		},
		tagger: {
			openButton: "Open Tagger",
			rename: "Herbenoemen",
			renameTooltip: "Alle bevelen waarvan de checkbox aangevinkt is hernoemen",
			incomingTroops: "Binnenkomende troepen",
			arrival: "Aankomst",
			arrivalIn: "Aankomst in",
			sentNow: "Zojuist",
			sentSeconds: "seconde(n)",
			sent1Minute: "1 minuut",
			sentMinutes: "minuten",
			sent1Hour: "1 uur",
			sentHours: "uren",
			sentOn: "Verstuurtijd",
			ago: "Geleden",
			arrivesInNightBonus: " (NACHT!)",
			tagIt: "Aanval Taggen",
			checkAllSupport: "Aanvinken van alle zichtbare ondersteuning",
			uncheckAllSupport: "Uitvinken van alle zichtbare ondersteuning",
			tagged: "Tagged!",
			dodgeTime: "Dodgetijd",
			slowest: "Traagst",
			slowestTip: "Traagste eenheid in het dorp",
			allAbove: "Alle vroegere aanvallen aanvinken",
			allBelow: "Alle latere aanvallen aanvinken",
			prefix: "Prefix? ",
			renameTo: "Hernoemen naar: ",
			switchModus: "&raquo; Alle aanvallen openen/sluiten",
			checkAllAttacks: "Aanvinken van alle zichtbare aanvallen",
			uncheckAllAttacks: "Uitvinken van alle zichtbare aanvallen",
			activeDodgeTime: "Actieve dodgetijd (wordt op de kaart getoond)",
			totalAttacksOnVillage: "Aantal aanvallen"
		},
		place: {
			distance: "Afstand",
			backOn: "Terug op",
			onlyAttack: "1 aanval op {arrivalDateFirst} ({timeLeftFirst})",
			multipleAttack: "{amount} aanvallen tussen {arrivalDateFirst} ({timeLeftFirst}) en {arrivalDateLast} ({timeLeftLast})",
			changeSpeedImageTooltips: "{originalTitle} - Klik om de traagste eenheid te wijzigen"
		},
		jumper: {
			goToMap: "Ga naar de kaart"
		},
		command: {
			returnOn: "Terug op:",
			arrival: "Aankomst",
			dodgeNotFarEnough: "De dodge is niet ver genoeg!",
			dodgeMinuteReturn: "(Terugkeer na {minutes})",
			catapultImageTitle: "Klik om gebouw te vernietigen",
			nextAttack: "volgend bevel",
			nextIncoming: "volgend incoming", /* Currently not in use */
			precedingAttack: "vorig bevel",
			precedingIncoming: "vorige incoming"
		},
		overviews: {
			totalVillages: "Aantal dorpen:",
			loadNextPage: "[volgende pagina laden]"
		},
		troopOverview: {
			removeVillage: "Dorp verwijderen",
			toThePlace: "Verzamelplaats",
			setTargetVillageButton: "OK",
			commandTitle: "Opdracht",
			selectUnitSpeed: "Selecteer {0} als traagste eenheid. (Klik op deze pagina, Dubbel klik op alle pagina's.)",
			nightBonus: "Nacht?",
			village: "Dorp",
			filterTroops: "Filter",
			filterPopulation: "Filter populatie",
			calcStack: "Bereken stack",
			filterNoble: "Filter edels",
			filterUnderAttack: "Filter onder aanval",
			sort: "Sorteren",
			restack: "Stack BB Codes",
			cheapNobles: "Goedkope edelmannen beschikbaar"
		},
		prodOverview: {
			filter: "Filter",
			filterFullGS: "Volle opslag",
			merchantTooltip: "Vink aan om handelaren te highlighten",
			merchantAmountTooltip: "Als de checkbox aangevinkt is worden dorpen met minder dan x handelaren in het rood gehighlight",
			bbCodes: "BB Codes",
			bbCodesInfo: "Gebruik IMG",
			filterTooltip: "Dorpen die niet aan de filtercriteria voldoen verbergen",
			filterTooltipReverse: "Dorpen die voldoen aan de filtercriteria highlighten",
			filterFullGSTooltip: "Dorpen waarbij niet minstens 1 van de grondstoffen vol is verbergen",
			filterFullGSTooltipReverse: "Dorpen waarbij minstens 1 van de grondstoffen vol is highlighten",
			filterAllTooltip: "Dorpen waarbij niet minstens 1 van de grondstoffen meer/minder dan x is verbergen",
			filterAllTooltipReverse: "Dorpen waarbij minstens 1 van de grondstoffen meer/minder dan x is highlighten",
			filter1Tooltip: "Dorpen waarbij er nier meer/minder dan x {0} is verbergen",
			filter1TooltipReverse: "Dorpen waarbij er meer/minder dan x {0} is highlighten"
		},
		buildOverview: {
			optimistic: "Optimistisch",
			mark: "Duiden",
			filter: "Filteren"
		},
		smithOverview: {
			optimistic: "Optimistisch",
			mark: "Duiden",
			filter: "Filteren"
		},
		defOverview: {
			stackButton: "Totalen berekenen",
			stackTooltip: "Totale stack en afstanden berekenen",
			stackFilter: "Filter op stack",
			stackFilterTooltip: "Filter dorpen met meer/minder dan x totale stack vanbuiten het dorp",
			village: "Dorp:",
			distFilter: "Filter op afstand",
			distFilterTooltip: "Filter alle dorpen die verder/dichter dan x velden liggen van dorp y",
			stackBBCodes: "Stack BBCodes",
			stackBBCodesTooltip: "Bepaal BB codes en aantal troepen voor een stack tot x populatie voor alle zichtbare dorpen",
			filterNoSupport: "Zonder OS wegfilteren",
			filterNoSupportTooltip: "Wegfilteren van alle dorpen waar geen ondersteuning meer zichtbaar is",
			extraFiltersSupport: "Ondersteunende dorpen filters:",
			extraFiltersDefense: "Ondersteuning filters:",
			extraFiltersReverse: "De filtering omdraaien",
			extraFiltersInfo: "Filters omdraaien",
			distFilter2: "Afstand filter",
			freeTextFilter: "Tekst filter",
			barbarianFilter: "Barbarendorpen",
			barbarianFilterTooltip: "Toon alle ondersteuningen naar barbarendorpen",
			nobleFilter: "Alle edel-ondersteuning tonen",
			nobleFilterRev: "Alle edel-ondersteuning wegfilteren",
			spyFilter: "Alle verkenner-ondersteuning tonen",
			spyFilterRev: "Alle verkenner-ondersteuning wegfilteren",
			attackFilter: "Alle aanval-ondersteuning tonen",
			attackFilterRev: "Alle aanval-ondersteuning wegfilteren",
			supportFilter: "Alle verdediging-ondersteuning tonen",
			supportFilterRev: "Alle verdediging-ondersteuning wegfilteren",
			otherPlayerFilterShow: "tonen",
			otherPlayerFilterHide: "wegfilteren",
			otherPlayerFilterTo: "Alle ondersteuningen naar andere spelers {action}",
			otherPlayerFilterFrom: "Alle ondersteuningen van andere spelers {action}",

			filterTooltipVillageTypeSupporting: "Ondersteunende dorpen",
			filterTooltipVillageTypeSupported: "Ondersteunde dorpen",
			freeTextFilterTooltip: "{villageType} {filterType} de tekst wegfilteren",
			freeTextFilterTooltipFilterTypeWith: "met",
			freeTextFilterTooltipFilterTypeWithout: "zonder",
			distanceFilterTooltip: "{villageType} die {filterType} dan het aangegeven aantal velden liggen wegfilteren",
			distanceFilterTooltipFilterTypeCloser: "dichter",
			distanceFilterTooltipFilterTypeFurther: "verder",

			totalFromOtherVillages: "totaal uit andere dorpen",
			totalInOtherVillages: "totaal in andere dorpen",
			freeText: "Vrij tekstveld (wordt niet opgeslagen!):",
			fieldsPrefix: "F{0}",
			thousandSuffix: "k",
			totalVillages: "Dorpen ({0})",
			distanceToVillageNoneEntered: "Geef een coördinaat! (eerste tekstveld)",
			distanceToVillage: "Afstand tot {0}",
			filterUnderAttack: "Filter onder aanval"
		},
		commands: {
			filterReturn: "Filter terugkeer",
			totalRows: "Somlijn",
			group: "Groeperen",
			totalRowsText: "{0}x OS = {1} pop",
			totalVillagesSupport: "Ondersteunde dorpen:",
			totalVillagesAttack: "Aangevallen dorpen:",
			totalSupport: "Ondersteuningen",
			totalAttack: "Aanvallen",
			bbCodeExport: "BBCode Export",
			bbCodeExportTooltip: "Overblijvende aanvallen exporteren",
			filtersReverse: "De filtering omdraaien",
			filtersReverseInfo: "Filters omdraaien",
			freeTextFilter: "Tekst filter",
			freeTextFilterTooltip: "Aanvallen {filterType} de tekst wegfilteren",
			freeTextFilterTooltipFilterTypeWith: "met",
			freeTextFilterTooltipFilterTypeWithout: "zonder",
			nobleFilter: "Alle edelaanvallen tonen",
			nobleFilterRev: "Alle edelaanvallen wegfilteren",
			spyFilter: "Alle verkenneraanvallen tonen",
			spyFilterRev: "Alle verkenneraanvallen wegfilteren",
			tableTotal: "Bevel ({0})",
			fakeFilter: "Alle fake aanvallen wegfilteren",
			fakeFilterRev: "Alle fake aanvallen tonen",
			continentFilter: "Continent",
			continentFilterTooltip: "Alle dorpen in continent wegfilteren",
			continentFilterTooltipReverse: "Alle dorpen in continent tonen",
			exportAttackHeader: "{village} {#} aanvallen, laatste [b]{lastAttack}[/b]",
			exportDefenseHeader: "{village} {support#} ondersteuningen voor [b]{totalStack} pop[/b]",
			exportCompleteHeader: "{village} {#} aanvallen, laatste [b]{lastAttack}[/b]\n+ {support#} ondersteuningen voor [b]{totalStack} pop[/b]"
		},
		groups: {
			villageFilter: "Dorpsnaam",
			villageFilterTitle: "Alle dorpen met de tekst in de dorpsnaam wegfilteren",
			villageFilterTitleRev: "Alle dorpen met de tekst in de dorpsnaam tonen",
			pointsFilter: "Punten",
			amountFilter: "Aantal",
			groupNameFilter: "Groepsnaam",
			amountFilterTitle: "Alle dorpen met minder groepen wegfilteren",
			amountFilterTitleRev: "Alle dorpen met meer groepen wegfilteren",
			pointsFilterTitle: "Alle dorpen met minder punten wegfilteren",
			pointsFilterTitleRev: "Alle dorpen met meer punten wegfilteren",
			farmFilterTitle: "Alle dorpen met minder populatie wegfilteren",
			farmFilterTitleRev: "Alle dorpen met meer populatie wegfilteren",
			groupNameFilterTitle: "Alle dorpen met de tekst in een groepsnaam wegfilteren",
			groupNameFilterTitleRev: "Alle dorpen met de tekst in een groepsnaam tonen"
		},
		snob: {
			canProduce: "Je kan meteen produceren:"
		},
		profile: {
			twStatsMap: "TWStats Kaart",
			externalPage: "(Extern)",
			internalPage: "(Intern)",
			conquers: "Overnames",
			villages: "Dorpen:",
			graphPoints: "Punten",
			graphVillages: "Dorpen",
			graphOD: "OD Totaal",
			graphODD: "OD Verdediging",
			graphODA: "OD Aanval",
			graphRank: "Rang",
			graphMembers: "Leden",
			graphTWMap: "TribalWarsMap.com"
		},
		incomings: {
			dynamicGrouping: "Dynamisch Groeperen",
			summation: "Somlijn",
			fastGrouping: "Snel Groeperen",
			showNewIncomings: "Toon Nieuwe Aanvallen",
			amount: "Aanvallen:",
			indicator: {
				lastTimeCheckHintBoxTooltip: "Klik op {img} om de laatste tijdcheck met de huidige tijd te vervangen.",
				lastTimeCheckNotYetSet: "(nog niet)"
			}
		},
		rest: {
			sittingAttackTill: "Aanvallen en verdedigen van dorpen niet in eigen beheer tot:",
			friendsOnline: "{friends} ({onlineimg} {online#} | {offlineimg} {offline#})",
			friendsOnlineTitle: "Online: {playerNames}"
		}
	}
};